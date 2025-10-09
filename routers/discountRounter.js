const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

router.get("/", discountController.indexDiscounts);

module.exports = router;