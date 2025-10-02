//importo express
const express = require("express");

//importo router
const router = express.Router();

const productController = require("../controllers/productController.js");

//definiamo le rotte

//index
router.get("/", productController.index);

module.exports = router;