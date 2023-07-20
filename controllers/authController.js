const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = await User.create({username, email, password});

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({message: 'Invalid username or password.'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid username or password.'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser
};