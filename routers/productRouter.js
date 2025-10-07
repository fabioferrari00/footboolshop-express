//importo express
const express = require("express");

//importo router
const router = express.Router();

const productController = require("../controllers/productController.js");


//definiamo le rotte

//index
router.get("/", productController.index);

//show by id 
router.get("/:slug", productController.show);

// Aggiuni un prodotto
router.post("/", productController.store);

//Elimina prodotto by id 
router.delete("/:id", productController.destroy);

module.exports = router;