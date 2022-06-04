const fs = require('fs/promises');
const path = require('path');
const Accessory = require('../models/Accessory');

const Cube = require('../models/Cube');


exports.getAll = async (search = '', from, to) => {
 //   const fromInput = Number(from) || 1;
 //   const toInput = Number(to) || 6;
//
 //   const result = cubes
 //       .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
 //       .filter(x => x.difficultyLevel >= fromInput && x.difficultyLevel <= toInput)
//
    let cubes = await Cube.find().lean();

    return cubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (cube) => Cube.create(cube);

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}
