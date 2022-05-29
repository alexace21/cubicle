const express = require('express');
const homeController = require('./controllers/home');
const router = express.Router(); // create custom router
const cubeController = require('./controllers/cube');

router.get('/', homeController.index); // give action for specific path URL
router.get('/about', homeController.about);

router.use('/cube', cubeController);

module.exports = router;
