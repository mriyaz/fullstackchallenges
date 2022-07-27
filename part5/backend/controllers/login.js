const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    //verify username and password
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        return response.status(401).json({ error: 'Invalid username or password' })
    }

    //if verification passes,create jwt token and send it back to the user
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

    response.status(200).send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter