// importo express
const express = require("express");
const router = express.Router();

// importo il controller ordini
const ordersController = require("../controllers/ordersController.js");

// rotta per creare un nuovo ordine
router.post("/add-order", ordersController.storeOrder);

module.exports = router;