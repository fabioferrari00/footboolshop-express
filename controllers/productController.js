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

// show singolo prodotto con il nome squadra
const show = (req, res) => {
    const id = req.params.id;
    const sql = `
         SELECT p.*, t.team_name, s.size
        FROM products p
        LEFT JOIN teams t ON t.products_id = p.id
		LEFT JOIN sizes s ON s.products_id = p.id
        WHERE p.id = ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Errore nella query: ${err}` });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Prodotto non trovato" });
        }
        res.send(results[0]);
    })
}

//store ordini
const storeOrder = (req, res) => {




    //recupero i dati della form
    const { status,
        total_price,
        user_name,
        user_mail,
        user_phone,
        user_surname,
        user_city,
        user_address, } = req.body;

    //controllo che i dati vengano inseriti
    if (user_name == "" || user_mail == "" || user_phone == "" || user_surname == "" || user_city == "" || user_address == "" || total_price == 0) return res.status(500).json({ error: "Riempi tutti i campi" });


    //query
    const sql = "INSERT INTO orders (status, total_price, user_name, user_mail, user_phone, user_surname, user_city, user_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    //eseguo la query
    connection.query(sql, [status, total_price, user_name, user_mail, user_phone, user_surname, user_city, user_address,], (err, result) => {
        if (err) return res.status(500).json({ error: `Errore nella query di inserimento ordine: ${err}` });

        res.status(201).json({ result: true, message: `Inserimento avvenuto con successo` });
    })

}

module.exports = {
    index,
    show,
    storeOrder
}