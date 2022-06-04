const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;

    // Validate TODO:
    if (cube.name.length < 3) {
        return res.status(400).send('Bad Request');
    }
    // Save data
    cubeService.create(cube)
        .then(() => {
            //Redirect to Page
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send('Bad Request');
        })
});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    console.log(cube);

    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render('accessory/attach', {cube, accessories});
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;

    console.log(accessoryId);

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);

    res.redirect(`/cube/details/${req.params.cubeId}`)
});

module.exports = router;