import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#ddd'
  }

  const [reveal, setReveal] = useState(false)
  const [blog, setBlog] = useState(props.blog)
console.log('blog===',blog);
console.log('props.loggedUserId===',props.loggedUserId);
console.log()
  const hideWhenReveal = { display: reveal ? 'none' : '' }
  const showWhenReveal = { display: reveal ? '' : 'none' }
  const showForCreator = { display: (blog.user && props.loggedUserId === blog.user.id) ? '' : 'none' }

  const toggleReveal = () => {
    setReveal(!reveal)
  }

  const handleLikeUpdate = async () => {
    //prepare the blog update object
    if (blog.user) {
      const blogToUpdate = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      //call the update of the blogService
      const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      setBlog(updatedBlog)
      props.reloadBlogs()
    }
    else {
      //error that the blogs creator is null
      console.log('No creator for blog!!')
    }
  }

  const handleDeletion = async () => {
    console.log('handle deletion clicked  ')
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteEntry(blog.id)
      props.reloadBlogs()
    }
  }

  return (
    <>
      < div style={{ ...blogStyle, ...hideWhenReveal }} className='shortBlog'>
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleReveal}>view</button>
      </div >

      < div style={{ ...blogStyle, ...showWhenReveal }} className='longBlog'>
        {blog.title}&nbsp; <button onClick={toggleReveal}>hide</button><br />
        {blog.url}<br />
        likes &nbsp;{blog.likes}&nbsp;   <button onClick={handleLikeUpdate}>like</button><br />
        {blog.author}<br />
        <button style={showForCreator} onClick={handleDeletion}>remove</button>
      </div >
    </>
  )
}

export default Blog