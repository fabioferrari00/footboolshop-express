const connection = require("../data/db.js");

// Crea un nuovo utente
const store = (req, res) => {
    let { name, mail } = req.body;

    // Q U I D E V I: rimuovere spazi esterni
    name = name ? name.trim() : "";
    mail = mail ? mail.trim() : "";

    // Q U I D E V I: controllare che non siano vuoti o solo spazi
    if (!name || !mail) {
        return res.status(400).json({ error: "Nome e mail sono obbligatori" });
    }

    const sql = "INSERT INTO users (name, mail) VALUES (?, ?)";
    const values = [name, mail];

    connection.query(sql, values, (err, result) => {
        if (err) {
            // Q U I D E V I: controllare errori del database
            return res
                .status(500)
                .json({ error: "Errore durante il salvataggio", details: err });
        }

        // Tutto ok, restituisco l'utente creato con l'id assegnato
        res.status(201).json({
            id: result.insertId,
            name,
            mail,
        });
    });
};

module.exports = { store };