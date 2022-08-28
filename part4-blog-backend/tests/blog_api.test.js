/**Use the supertest package for writing a test that makes an HTTP GET request to the
 * /api/blogs url. Verify that the blog list application returns the correct
 * amount of blog posts in the JSON format. Once the test is finished, refactor the
 * route handler to use the async/await syntax instead of promises.*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {

    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {

    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
]

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  const user = { username: 'Yazbaz', name: 'Shahbaz Khan', password: 'yazzie123' }
  await api.post('/api/users').send(user)
  const res = await api.post('/api/login').send(user)
  token = JSON.parse(res.text).token

  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
})


describe('when there is initially some blogs saved', () => {


  test('returns blog posts in the JSON format', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('returns 3 blog posts', async () => {
    const resp = await api.get('/api/blogs')
    expect(resp.body).toHaveLength(initialBlogs.length + 1)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})


describe('addition of a new blog', () => {

  /**Write a test that verifies that making an HTTP POST request to the /api/blogs url
 * successfully creates a new blog post. At the very least, verify that the total number
 * of blogs in the system is increased by one. You can also verify that the content of the
 * blog post is saved correctly to the database.

Once the test is finished, refactor the operation to use async/await instead of promises. */

  test('succeeds for valid data', async () => {
    //create a new blog post to add
    const blog = {
      title: 'String reduction & verification',
      author: 'Desgar ijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/',
      likes: 2
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    const response = blogs.map(bl => bl.toJSON())

    const titles = response.map(r => r.title)

    expect(response).toHaveLength(initialBlogs.length + 2)
    expect(titles).toContain(
      'String reduction & verification'
    )


  })

  /**Write a test that verifies that if the likes property is missing from the request,
 * it will default to the value 0. Do not test the other properties of the created blogs yet.

Make the required changes to the code so that it passes the test. */

  test('Missing likes property defaults to 0', async () => {
    //create a new blog post to add
    let blog = {
      title: 'Metaverse hardware',
      author: 'Michael Slang',
      url: 'http://www.michaelsland.com/'

    }

    const res = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blo = JSON.parse(res.text)
    expect(blo.likes).toBe(0)

  })


  /**Write a test related to creating new blogs via the /api/blogs endpoint,
 * that verifies that if the title and url properties are missing from the request data,
 * the backend responds to the request with the status code 400 Bad Request.

Make the required changes to the code so that it passes the test. */

  test('Bad request if the title and url properties are missing', async () => {
    const blog = {
      author: 'Michael Slang',
      likes: 2
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog).expect(400)
  })

})



describe('Updating a blog', () => {
  test('succeeds in updating the likes for a specific blog', async () => {
    const startblogs = await Blog.find({})
    const blogToUpdate = startblogs[0].toJSON()

    //update the likes in the blog
    blogToUpdate.likes = 20

    //Send the update to the server
    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    expect(JSON.parse(updatedBlog.text).likes).toBe(blogToUpdate.likes)

  })
})

describe('deletion of a blog', () => {

  test('succeeds if blog id is valid', async () => {
    const startblogs = await Blog.find({ title: 'Canonical string reduction' })
    const blogToDelete = startblogs[0].toJSON()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const endblogs = await Blog.find({ title: 'String reduction & verification' })
    // expect(endblogs).toHaveLength(initialBlogs.length - 1)

    const titles = endblogs.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)


  })

})

afterAll(() => {
  mongoose.connection.close()
})

