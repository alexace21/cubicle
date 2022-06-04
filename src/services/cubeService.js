const fs = require('fs/promises');
const path = require('path');

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
