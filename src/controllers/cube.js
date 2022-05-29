const router = require('express').Router();
const fs = require('fs/promises');
const path = require('path');

const cubes = require('../db.json');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res) => {
    const cube = req.body;

    // Validate TODO:
    if(cube.name.length < 3) {
        return res.status(400).send('Bad Request');
    }
    // Save data
    cubes.push(cube);
    fs.writeFile(path.resolve('src', 'db.json'), JSON.stringify(cubes, '', 4), {encoding: 'utf-8'})
        .then(() => {
            //Redirect to Page
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send('Bad Request');
        })

})

module.exports = router;