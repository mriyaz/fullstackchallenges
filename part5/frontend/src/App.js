import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [classname, setClassname] = useState('')
  const [msg, setMsg] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const blogFormRef = useRef()

  const getBlogPosts = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  useEffect(() => {
    getBlogPosts()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON && loggedUserJSON !== null) {
      const usr = JSON.parse(loggedUserJSON)
      setUser(usr)
      blogService.setToken(usr.token)
    }
  }, [])



  const Notification = ({ message, classname }) => {
    if (message === null)
      return null
    return (
      <div className={classname}>
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const usr = await loginService.login({ username, password })
      blogService.setToken(usr.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr)
      )
      setUser(usr)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMsg('wrong username or password')
      setClassname('error')
      setTimeout(() => {
        setMsg(null)
      }, 5000)

    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const blg = await blogService.create({ title, author, url })

      setBlogs(current => [...current, blg])
      setTitle('')
      setAuthor('')
      setUrl('')

      setMsg(`a new blog ${blg.title} by ${blg.author} added`)
      setClassname('msg')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
    catch (exception) {
      setMsg('Incorrect blog data...')
      setClassname('error')
      setTimeout(() => {
        setMsg(null)
      }, 5000)

    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username: <input type='text' name="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div><br />
      <div>password: <input type='password' name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div><br />
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm handleBlogSubmit={handleBlogSubmit}
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl} /><br />
    </Togglable>
  )



  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={msg} classname={classname} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in &nbsp;
            <button onClick={handleLogout}>Logout</button>
          </p>

          {blogForm()}


          <br /><hr />
          <br />
          <div>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} loggedUserId={user.id} reloadBlogs={getBlogPosts} />
            )}
          </div>
        </div>
      }
    </div>

  )
}

export default App
