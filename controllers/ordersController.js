const connection = require("../data/db.js");

//store ordini
const storeOrder = (req, res) => {




    //recupero i dati della form
    let {
        status,
        total_price,
        user_name,
        user_mail,
        user_phone,
        user_surname,
        user_city,
        user_address,
    } = req.body;

    //  rimuovo spazi laterali dai campi stringa
    function clean(value) {
        return typeof value === "string" ? value.trim() : "";
    }

    user_name = clean(user_name);
    user_mail = clean(user_mail);
    user_phone = clean(user_phone);
    user_surname = clean(user_surname);
    user_city = clean(user_city);
    user_address = clean(user_address);

    //controllo che i dati vengano inseriti
    if (user_name == "" || user_mail == "" || user_phone == "" || user_surname == "" || user_city == "" || user_address == "" || total_price == 0) return res.status(500).json({ error: "Riempi tutti i campi" });


    //query
    const sql = "INSERT INTO orders (status, total_price, user_name, user_mail, user_phone, user_surname, user_city, user_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    //eseguo la query
    connection.query(sql, [status, total_price, user_name, user_mail, user_phone, user_surname, user_city, user_address, ], (err, result) => {
        if (err) return res.status(500).json({ error: `Errore nella query di inserimento ordine: ${err}` });

        res.status(201).json({ result: true, message: `Inserimento avvenuto con successo` });
    })

}


module.exports = {
    storeOrder,
}