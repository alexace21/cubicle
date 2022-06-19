const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    }
});

// Validation on Model level.

userSchema.virtual('repeatPassword').set(function(value) {
    if (this.password !== value) {
        throw new Error('Password does not match!');
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;