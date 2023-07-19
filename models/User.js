const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                return emailRegex.test(value);
            },
            message: 'Invalid e-mail address.'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    adventures: [{
        adventure: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Adventure',
          required: true
        },
        character: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Character',
          required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;