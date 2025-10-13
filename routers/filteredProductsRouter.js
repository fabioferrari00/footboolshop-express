const express = require("express");
const router = express.Router();
const filteredProductsController = require("../controllers/filteredProductsController");

// Definiamo la rotta per filtrare i prodotti
router.get("/", filteredProductsController.indexFilter);
router.get("/sizes", filteredProductsController.indexSizes);
router.get("/teamName", filteredProductsController.indexTeamName);

module.exports = router;