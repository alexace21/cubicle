const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            //validator: /^https?/g,
            validator: function() {
                return this.imageUrl.startsWith('http');
            },
            message: 'Image URL should be a valid link'
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: 120,
    },

});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;