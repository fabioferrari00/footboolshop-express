const connection = require("../data/db.js");

// index tutti i prodotti con il nome squadra
const index = (req, res) => {
    const sql = `
        SELECT p.*, t.team_name, s.size
        FROM products p
        JOIN teams t ON t.products_id = p.id
        JOIN sizes s ON s.products_id = p.id
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Errore nella query: ${err}` })
        }
        res.send(results);
    })
}

// show singolo prodotto by slug
const show = (req, res) => {
    const slug = req.params.slug;
    const sql = `
        SELECT p.*, t.team_name, s.size
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

    // Validazioni base
    if (!name || !image_url || sex == null || price == null || !slug || !arrival_date) {
        return res.status(400).json({ error: "Compila i campi obbligatori: name, image_url, sex, price, slug, arrival_date" });
    }

    // Inserimento
    const sql = `
      INSERT INTO products (name, image_url, sex, price, slug, arrival_date, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [name.trim(), image_url.trim(), sex, price, slug.trim(), arrival_date, description || null], (err, result) => {
        if (err) return res.status(500).json({ error: `Errore inserimento prodotto: ${err}` });
        res.status(201).json({ result: true, id: result.insertId, message: "Prodotto creato con successo" });
    });
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


module.exports = {
    index,
    show,
    store,
    destroy
}