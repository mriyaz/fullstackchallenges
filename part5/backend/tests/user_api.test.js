
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

const initialUsers = [
  {
    username: 'MChan',
    name: 'Michael Chan',
    password: 'welcome1'

  },
  {
    username: 'EWDijkstra',
    name: 'Edsger W. Dijkstra',
    password: 'welcome12'
  },
  {
    username: 'JPascal',
    name: 'Johan Pascal',
    password: 'welcome123'
  }]

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

describe('when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    //create a new user post to add
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(usr => usr.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Bad request if password is missing or its length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rmluukkaier',
      name: 'Matti Luukkainen',
      password: 'er'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required and its length should be atleast 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })


  test('Bad request if username is missing or its length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {

      name: 'Matti Luukkainen',
      password: 'eres'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username is required and its length should be atleast 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})



describe('deletion of a user', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    //const userToDelete = initialUsers[0]

    const startusers = await User.find({})
    const userToDelete = startusers[0].toJSON()

    await api.delete(`/api/users/${userToDelete.id}`).expect(204)

    const endusers = await User.find({})
    expect(endusers).toHaveLength(startusers.length - 1)

    const usernames = endusers.map(r => r.username)

    expect(usernames).not.toContain(userToDelete.username)

  })

})

afterAll(() => {
  mongoose.connection.close()
})

