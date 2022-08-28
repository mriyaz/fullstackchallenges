const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await usersRouter.findById(request.params.id)

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const existingUser = await User.findOne({ username })

  if (existingUser){
    response.status(400).json({ error: 'username must be unique' })
  }
  if (!username || username.length < 3){
    response.status(400).json({ error: 'username is required and its length should be atleast 3 characters long' })
  }

  if (!password || password.length < 3){
    response.status(400).json({ error: 'password is required and its length should be atleast 3 characters long' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})


usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = {
    username: body.username,
    password: body.password,
    name: body.name
  }

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  response.json(updatedUser)

})

module.exports = usersRouter