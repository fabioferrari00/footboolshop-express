const connection = require("../data/db.js");

const storeOrder = (req, res) => {
    let {
        status,
        total_price,
        user_name,
        user_mail,
        user_phone,
        user_surname,
        user_city,
        user_address,
        items = []
    } = req.body;

    // pulizia spazi solo latterale
    const clean = v => (typeof v === "string" ? v.trim() : v);
    status = clean(status);
    user_name = clean(user_name);
    user_mail = clean(user_mail);
    user_phone = clean(user_phone);
    user_surname = clean(user_surname);
    user_city = clean(user_city);
    user_address = clean(user_address);

    // validazione niente capi vuoti 
    if (
        user_name == "" || user_mail == "" || user_phone == "" ||
        user_surname == "" || user_city == "" || user_address == "" ||
        total_price == 0
    ) {
        return res.status(500).json({ error: "Riempi tutti i campi" });
    }

    if (total_price == null || Number(total_price) <= 0) {
        return res.status(400).json({ error: "total_price deve essere maggiore di 0." });
    }

    // 1) inserisco ordine
    const sqlOrder = `
    INSERT INTO orders
      (status, total_price, user_name, user_mail, user_phone, user_surname, user_city, user_address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    connection.query(
        sqlOrder, [status, total_price, user_name, user_mail, user_phone, user_surname, user_city, user_address],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: `Errore nella query di inserimento ordine: ${err}` });
            }

            const orderId = result.insertId;


            // 2) inserisco righe nella tabella ponte (una INSERT per riga)
            const sqlItem = `
        INSERT INTO products_has_orders
          (products_id, orders_id, quantity, price, product_name)
        VALUES (?, ?, ?, ?, ?) `;

            let i = 0;
            const next = () => {
                if (i >= items.length) {
                    return res.status(201).json({
                        result: true,
                        message: "Ordine creato",
                        order_id: orderId
                    });
                }
                const it = items[i++];
                connection.query(
                    sqlItem, [it.products_id, orderId, it.quantity, it.price, clean(it.product_name)],
                    (err) => {
                        if (err) {
                            // segnalo l’errore
                            return res.status(500).json({ error: `Errore inserimento riga prodotto: ${err}` });
                        }
                        next();
                    }
                );
            };
            next();
        }
    );
};

module.exports = { storeOrder };