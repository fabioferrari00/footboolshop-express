const connection = require("../data/db.js");

//index
const index = (req, res) => {
    const sql = "SELECT * FROM products";

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: `Errore nella query: ${err}` })
        }

        res.send(results);
    })
}

//show per id 
const show = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM products WHERE id = ?";

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