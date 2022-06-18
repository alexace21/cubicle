const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { saltRounds, secret } = require('../config/jsonConfig');

exports.register = async ({ username, password, repeatPassword }) => {
    // TODO: return form validation message.

    if (password !== repeatPassword) {
        return false;
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = User.create({
        username,
        password: hashedPassword,
    });

    return createdUser;
};

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });
    console.log(user);
    console.log(user.password);
    if (!user) {
        return false;
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison) {
        return;
    }

    // create new Promise to asynchronously resolve the callback jwt.sign
    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return;
                return reject(err);
            }

            resolve(token);
        });
    });

    return result;
};