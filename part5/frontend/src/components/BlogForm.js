
import { useState } from 'react'
import PropTypes from 'prop-types'

//const BlogForm = ({ handleBlogSubmit, title, setTitle, author, setAuthor, url, setUrl }) => {
const BlogForm = ({ handleBlogSubmit }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    handleBlogSubmit(event)
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:<input type='text' name='title' id='title' value={title} onChange={e => setTitle(e.target.value)} />
        </div><br />
        <div>
          author:<input type='text' name='author' id='author' value={author} onChange={e => setAuthor(e.target.value)} />
        </div><br />
        <div>url: <input type='text' name="url" id='url' value={url} onChange={(e) => setUrl(e.target.value)} />
        </div><br />
        <div>
          <button type="submit" id='submit'>create</button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired
}

export default BlogForm