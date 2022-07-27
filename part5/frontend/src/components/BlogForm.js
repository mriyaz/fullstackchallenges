import PropTypes from 'prop-types'
const BlogForm = ({ handleBlogSubmit, title, setTitle, author, setAuthor, url, setUrl }) => {

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:<input type='text' name='Title' value={title} onChange={e => setTitle(e.target.value)} />
        </div><br />
        <div>
          author:<input type='text' name='Author' value={author} onChange={e => setAuthor(e.target.value)} />
        </div><br />
        <div>url: <input type='text' name="Text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div><br />
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired
}

export default BlogForm