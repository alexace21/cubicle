const fs = require('fs/promises');
const path = require('path');

const cubes = require('../db.json');

exports.getAll = (search = '', from, to) => {
    const fromInput = Number(from) || 1;
    const toInput = Number(to) || 6;

    const result = cubes
    .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    .filter(x => x.difficultyLevel >= fromInput && x.difficultyLevel <= toInput)

    return result;
};

exports.getOne = (cubeId) => cubes[cubeId];

exports.save = (cube) => {
    cubes.push({id: cubes[cubes.length - 1].id + 1, ...cube});

    let textData = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'db.json'), textData, { encoding: 'utf-8' })
}