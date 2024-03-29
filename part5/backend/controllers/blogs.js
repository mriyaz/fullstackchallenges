const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await blogsRouter.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  if (body.title !== undefined && body.url !== undefined) {
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  }
  else
    response.status(400).end()

})

/**Change the delete blog operation so that a blog can be deleted
 * only by the user who added the blog. */
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  //Get the requestor
  const user = request.user

  //Get token of the blog creator
  const creatorBlog = await Blog.findById(request.params.id)
  if (!creatorBlog) {
    return response.status(401).json({ error: 'Blog not found' })
  }
  //Compare tokens
  if (creatorBlog.user && creatorBlog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'Not authorized.' })
  }
})



blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)

})

module.exports = blogsRouter