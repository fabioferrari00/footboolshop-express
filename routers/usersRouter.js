const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");

// POST /users
router.post("/", usersController.store);

module.exports = router;