//importo express
const express = require("express");

//importo router
const router = express.Router();

const productController = require("../controllers/productController.js");

//definiamo le rotte

//index
router.get("/", productController.index);

//show by id 
router.get("/:id", productController.show)



module.exports = router;