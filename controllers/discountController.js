const connection = require('../data/db');

const indexDiscounts = (req, res) => {
  const sql = 'SELECT * FROM discount';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: `Errore nella query: ${err}` });
    }
    console.log(results);
    res.status(200).json(results);
  });
}

module.exports = {
  indexDiscounts,
}