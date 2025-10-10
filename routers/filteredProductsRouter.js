const express = require("express");
const router = express.Router();
const filteredProductsController = require("../controllers/filteredProductsController");

// Definiamo la rotta per filtrare i prodotti
router.get("/", filteredProductsController.indexFilter);
module.exports = router;