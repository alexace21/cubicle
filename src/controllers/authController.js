const router = require('express').Router();

const { isEmail } = require('../utils/validators');
const authService = require('../services/authService');
const { sessionName } = require('../config/jsonConfig');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    if (!isEmail(req.body.username)) {
        return res.status(401).send('Invalid email address!');
    }

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

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);

    res.redirect('/');
});

module.exports = router;