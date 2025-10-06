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

module.exports = {
    index,
    show
}