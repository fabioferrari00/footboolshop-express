//importo express
const express = require("express");

//importo router
const router = express.Router();

const productController = require("../controllers/productController.js");


//definiamo le rotte

//index
router.get("/", productController.index);

//show by slug
router.get("/:slug", productController.show);
//show by id


// Aggiuni un prodotto
router.post("/", productController.store);

//Elimina prodotto by id 
router.delete("/:id", productController.destroy);

//modifica prodotto per id
router.put('/:id', productController.update)

module.exports = router;