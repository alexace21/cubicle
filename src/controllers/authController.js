const router = require('express').Router();

const authService = require('../services/authService');
const { sessionName } = require('../config/jsonConfig');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    let createdUser = await authService.register(req.body);

    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        // TODO: Add notification.
        console.log(createdUser);
        res.redirect('404');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    let token = await authService.login(req.body);

    if (!token) {
        res.redirect('/404');
        return;
    }
    res.cookie(sessionName, token, { httpOnly: true });

    res.redirect('/');
});

module.exports = router;