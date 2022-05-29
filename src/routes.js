const express = require('express');
const homeController = require('./controllers/home');
const router = express.Router(); // create custom router
const cubeController = require('./controllers/cube');

router.use('/', homeController);
//router.get('/', homeController.index); // give action for specific path URL
//router.get('/about', homeController.about); // 1st Way to do Router

router.use('/cube', cubeController); // 2nd Way to do Router give Controller/router to take action for this specific path URL

module.exports = router;
