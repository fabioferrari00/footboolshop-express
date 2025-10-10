const connection = require("../data/db.js");

// index tutti i prodotti con il nome squadra
const index = (req, res) => {
    const sql = `
      SELECT 
        p.*, 
        t.id AS team_id, 
        t.team_name, 
        s.id AS size_id, 
        s.size
      FROM products p
      JOIN teams t ON t.products_id = p.id
      JOIN sizes s ON s.products_id = p.id
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Errore nella query: ${err}` });
        }
        res.send(results);
    });
};

// show singolo prodotto by slug
const show = (req, res) => {
    const slug = req.params.slug;
    const sql = `
      SELECT 
        p.*, 
        t.id AS team_id, 
        t.team_name, 
        s.id AS size_id, 
        s.size
      FROM products p
      LEFT JOIN teams t ON t.products_id = p.id
      LEFT JOIN sizes s ON s.products_id = p.id
      WHERE p.slug = ?
    `;

    connection.query(sql, [slug], (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Errore nella query: ${err}` });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }
        res.send(results[0]);
    });
};

// show singolo prodotto by id
const showById = (req, res) => {
    const productId = req.params.id;
    const sql = `
      SELECT 
        p.*, 
        t.id AS team_id, 
        t.team_name, 
        s.id AS size_id, 
        s.size
      FROM products p
      LEFT JOIN teams t ON t.products_id = p.id
      LEFT JOIN sizes s ON s.products_id = p.id
      WHERE p.id = ?
    `;

    connection.query(sql, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Errore nella query: ${err}` });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }
        res.send(results[0]);
    });
};


// Aggiungi un prodotto 
const store = (req, res) => {
    let {
        name,
        image_url,
        sex,
        price,
        slug,
        arrival_date,
        description
    } = req.body;

    // normalizzazione dati toglie gli spazi laterali 
    name = name ? name.trim() : "";
    image_url = image_url ? image_url.trim() : "";
    slug = slug ? slug.trim() : "";
    arrival_date = arrival_date ? arrival_date.trim() : "";
    description = description ? description.trim() : "";

    // controllo stringa name vuota o con soli spazi
    if (!name || !image_url || !slug || !arrival_date || !description) {
        return res.status(400).json({
            error: "I campi name, image_url, description, slug e arrival_date non possono essere vuoti o contenere solo spazi."
        });
    }

    // prezzo minore o uguale a 0 NO!
    if (price == null || Number(price) <= 0) {
        return res.status(400).json({ error: "Il prezzo deve essere maggiore di 0." });
    }

    // campi obbligatori
    if (!image_url || sex == null || !slug || !arrival_date) {
        return res.status(400).json({ error: "Compila i campi obbligatori: name, image_url, sex, price, slug, arrival_date" });
    }

    // D A    C R E A R E    S H O W    B Y     I D 


    // inserimento nel database
    const sql = `
      INSERT INTO products (name, image_url, sex, price, slug, arrival_date, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql, [name.trim(), image_url.trim(), sex, price, slug.trim(), arrival_date, description || null],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: `Errore inserimento prodotto: ${err}` });
            }
            res.status(201).json({ result: true, id: result.insertId, message: "Prodotto creato con successo" });
        }
    );
};

// Elimina per id 
const destroy = (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) return res.status(400).json({ error: "ID non valido" });

    const sql = "DELETE FROM products WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: `Errore eliminazione prodotto: ${err}` });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Prodotto non trovato" });
        res.json({ result: true, message: "Prodotto eliminato" });
    });
};

//Update per id
const update = (req, res) => {

    const { id } = req.params;

    let {
        name,
        image_url,
        sex,
        price,
        slug,
        arrival_date,
        description
    } = req.body;

    const sql = "UPDATE products SET name = ?, image_url = ?, sex = ?, price = ?, slug = ?, arrival_date = ?, description = ? WHERE id = ?";
    arrayParams = [name, image_url, sex, price, slug, arrival_date, description];
    arrayParams.push(id);

    connection.query(sql, arrayParams, (err, result) => {
        if (err) return res.status(500).json({ error: `Errore nella modifica del prodotto: ${err}` });

        res.status(200).json({ message: "modificato con successo" });
    })


}


module.exports = {
    index,
    show,
    showById,
    store,
    destroy,
    update
}