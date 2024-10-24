import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import { CreateNote } from './components/CreateForm'
import { LoginForm } from './components/LoginForm'
import Tagglable from './components/Tagglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [messageCreateNote, setMessageCreateNote] = useState('')
  const [messageLogin, setMessageLogin] = useState('')
  const [activeBlogId, setActiveBlogId] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogAppUsser', JSON.stringify(user))
      if (!user) {
        setMessageLogin('Invalid username or password')
      }
      setTimeout(() => {
        setMessageLogin('')
      }, 400)

      console.log('user', user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
  }

  const handleCreateNote = async ({ title, autor, url }) => {
    const blogObject = {
      title,
      author: autor,
      url,
      id: user.id
    }

    try {
      const response = await blogService.create(blogObject)
      if (response) {
        setMessageCreateNote(`A new blog "${response.title}" by ${user.name}`)
        setBlogs(prevBlogs => [...prevBlogs, response])
      }
      setTimeout(() => {
        setMessageCreateNote('')
      }, 4000)
    } catch (error) {
      console.error('Error creando el blog:', error)
    }
  }

  const handleBlogDetails = id => {
    setActiveBlogId(prevId => (prevId === id ? null : id))
  }

  useEffect(() => {
    const getBlogsUser = async () => {
      try {
        if (user && !user.id) {
          const users = await userService.getAll()
          console.log('🚀 ~ getBlogsUser ~ users:', users)
          const userLogin = users.find(u => u.username === user.username)
          const listBlog = users.map(user => user.blogs).flat()
          console.log('🚀 ~ getBlogsUser ~ listBlog:', listBlog)
          if (userLogin) {
            setBlogs(listBlog)
            setUser(prevUser => ({ ...prevUser, id: userLogin.id }))
          }
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    getBlogsUser()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUsser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async blog => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    if (!blog.id) {
      console.error('Id invalid blog:', blog)
      return
    }
    try {
      const response = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => (b.id === blog.id ? response : b)))
    } catch (error) {
      console.error('error incremental likes:', error)
    }
  }

  const handleDeleteBlog = async blogId => {
    // Asegurarse de que el usuario confirma la eliminación
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.remove(blogId) // Llama al servicio para eliminar el blog
        setBlogs(blogs.filter(blog => blog.id !== blogId)) // Filtra el blog eliminado de la lista
        console.log('Blog deleted successfully')
      } catch (error) {
        console.error('Error deleting the blog:', error)
      }
    }
  }
  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setPassword={setPassword}
          password={password}
          setUsername={setUsername}
        />
      ) : (
        <div>
          <h2>Blogs</h2>

          {messageCreateNote && (
            <div style={{ background: 'green', border: '1px', padding: '5px' }}>
              {messageCreateNote}
            </div>
          )}
          {messageLogin && (
            <div style={{ background: 'red', border: '1px', padding: '5px' }}>
              {messageLogin}
            </div>
          )}
          <p>
            {user.name} is logged in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogAppUsser')
                setUser(null)
              }}
            >
              Logout
            </button>{' '}
          </p>

          <Tagglable buttonLabel="new note">
            <CreateNote handleCreateNote={handleCreateNote} />
          </Tagglable>
          <div style={{ display: 'flex', gap: '3px', flexDirection: 'column' }}>
            {blogs
              .sort((a, b) => b.likes - a.likes) // Ordenar por "likes"
              .map(blog => (
                <div
                  key={blog.id}
                  style={{
                    display: 'flex',
                    gap: '4px',
                    padding: '3px',
                    border: '1px solid'
                  }}
                >
                  <Blog
                    blog={blog}
                    handleBlogDetails={() => handleBlogDetails(blog.id)}
                    viewBlogDetails={activeBlogId === blog.id}
                    handleLike={handleLike}
                    user={user}
                    setBlogs={setBlogs}
                    handleDeleteBlog={handleDeleteBlog}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default App
