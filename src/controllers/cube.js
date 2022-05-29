const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res) => {
    const cube = req.body;

    // Validate TODO:
    if (cube.name.length < 3) {
        return res.status(400).send('Bad Request');
    }
    // Save data
    cubeService.save(cube)
        .then(() => {
            //Redirect to Page
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send('Bad Request');
        })
})

router.get('/details/:id', (req, res) => {
    const cube = cubeService.getOne(req.params.id)

    res.render('details', { cube });
})

module.exports = router;