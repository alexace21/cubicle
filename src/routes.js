const express = require('express');
const homeController = require('./controllers/home');
const router = express.Router(); // create custom router

router.get('/', homeController.index); // give action for specific path URL

module.exports = router;
