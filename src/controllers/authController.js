const router = require('express').Router();

const { isEmail } = require('../utils/validators');
const authService = require('../services/authService');
const { sessionName } = require('../config/jsonConfig');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {

    if (!isEmail(req.body.username)) {
        //return res.status(401).send('Invalid email address!'); Express validation
        let error = { message: 'Invalid email.' };
        next(error);
    }
    try {
        await authService.register(req.body);

        res.redirect('/auth/login');
    } catch (error) {
        res.status(401).render('auth/login', {error: error.message});
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    try {
        let token = await authService.login(req.body);

        if (!token) {
            res.redirect('/404');
            return;
        }
        res.cookie(sessionName, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/login', { error: error.message });
    }



});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);

    res.redirect('/');
});

module.exports = router;