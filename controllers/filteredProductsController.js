const connection = require('../data/db');



// Filtra i prodotti in base a name ,team e size

const indexFilter = (req, res) => {

  const { name, team_name, size } = req.query;
  let sql = `SELECT p.*, t.team_name, s.size
FROM products p
LEFT JOIN teams t ON t.products_id = p.id
LEFT JOIN sizes s ON s.products_id = p.id
WHERE 1=1`;
  const params = [];
  if (name) {
    sql += " AND p.name LIKE ?";
    params.push(`%${name}%`);
  }
  if (team_name) {
    sql += " AND t.team_name = ?";
    params.push(team_name);
  }
  if (size) {
    sql += " AND s.size = ?";
    params.push(size);
  }
  connection.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: `Errore nella query: ${err}` });
    }
    console.log(results);
    res.status(200).json(results);
  }
  );
}


const indexSizes = (req, res) => {
  let sql = `SELECT * FROM sizes;`
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: `Errore nella query: ${err}` });
    }
    console.log(results);
    res.status(200).json(results);
  });
}


const indexTeamName = (req, res) => {
  let sql = `SELECT * FROM teams;`
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: `Errore nella query: ${err}` });
    }
    console.log(results);
    res.status(200).json(results);
  });
}














module.exports = {

  indexFilter
  indexFilter,
  indexSizes,
  indexTeamName


};