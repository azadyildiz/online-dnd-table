const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (password.length < 6) {
      return res
        .status(422)
        .json({ message: 'Password length must be at least 6.' })
    }

    var hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ username, email, password: hashedPassword })

    res.status(201).json({ message: 'User created.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser
}
