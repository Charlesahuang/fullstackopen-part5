import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Service from './services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewBlog from './components/NewBlog';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    FetchGetblog()
  }, [])

  const FetchGetblog = () => {
    Service.getAll().then(blogs => {
      //5.10
      blogs.sort((b, a) => a.likes - b.likes);
      setBlogs(blogs)
    })
  }
  const handleLogin = (event) => {
    event.preventDefault()
    if (username === '' || password === '') {
      alert('Username and password are required.')
      return
    }
    Service.login(username, password).then(e => {
      setUser(e)
      // 登录成功后将用户数据存储到本地
      localStorage.setItem('user', JSON.stringify(e))
      toast.success('logout success', { autoClose: 1000 })
    }).catch(err => {
      toast.error(err.error, { autoClose: 1000 })
    })
  }
  //5.2
  const handleLogout = () => {
    // 清除本地存储中的用户数据
    localStorage.removeItem('user')
    // 重置用户状态
    setUser(null)
    toast.success('logout success', { autoClose: 1000 })
  }

  return (
    <div>
      <ToastContainer />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username：
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              password：
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>Logged in as {user.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* 5.5 */}
          {showForm ? (
            <NewBlog setShowForm={setShowForm} user={user} FetchGetblog={FetchGetblog} />
          ) : (
            // 显示按钮
            <button onClick={() => setShowForm(true)}>New Note</button>
          )}
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} FetchGetblog={FetchGetblog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
