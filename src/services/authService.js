const bcrypt = require('bcrypt');

const User = require('../models/User');

const saltRounds = 10;

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

    if (comparison) {
        return user;
    } else {
        return;
    }
};