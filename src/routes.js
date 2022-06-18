const express = require('express');
const homeController = require('./controllers/home');
const router = express.Router(); // create custom router
const cubeController = require('./controllers/cube');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

router.use('/', homeController);
//router.get('/', homeController.index); // give action for specific path URL
//router.get('/about', homeController.about); // 1st Way to do Router
router.use('/accessory', accessoryController);
router.use('/cube', cubeController); // 2nd Way to do Router give Controller/router to take action for this specific path URL
router.use('/auth', authController);
router.use ('*', (req, res) => {
    res.render('404');
})

module.exports = router;
