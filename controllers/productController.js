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

//show

module.exports = {
  index
}