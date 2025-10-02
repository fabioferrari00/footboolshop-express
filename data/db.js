//importo mysql2
const mysql = require("mysql2");

//creo la connessione
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "boolshop_database",
  port: 3306
});

//stabilisco la connessione al db
connection.connect((err) => {
  if (err) {
    console.log(`Errore nella connessione al db ${err}`)
  } else {
    console.log(`Connessione al db avvenuta con successo`)
  }
})

module.exports = connection;