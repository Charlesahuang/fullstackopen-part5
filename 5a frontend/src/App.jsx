import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Service from "./services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    content: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    Service.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      alert("Username and password are required.");
      return;
    }
    Service.login(username, password)
      .then((e) => {
        setUser(e);
        // 登录成功后将用户数据存储到本地
        localStorage.setItem("user", JSON.stringify(e));
        toast.success("logout success", { autoClose: 1000 });
      })
      .catch((err) => {
        toast.error(err.error, { autoClose: 1000 });
      });
  };
  //5.2
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("logout success", { autoClose: 1000 });
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    Service.addBlog(newBlog.title, newBlog.url, newBlog.content, user.token)
      .then((e) => {
        toast.success("add success", { autoClose: 1000 });
        Service.getAll().then((blogs) => {
          setBlogs(blogs);
        });
        setNewBlog((prevNewBlog) => ({
          ...prevNewBlog,
          title: "",
          author: "",
          url: "",
          content: "",
        }));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.error, { autoClose: 1000 });
      });
  };

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "10px" }}>Logged in as {user.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div>
            <h2>Create new Blog</h2>
            <form onSubmit={handleCreateBlog}>
              <div>
                title：
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                />
              </div>
              <div>
                author：
                <input
                  type="text"
                  value={newBlog.author}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, author: e.target.value })
                  }
                />
              </div>
              <div>
                url：
                <input
                  type="text"
                  value={newBlog.url}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, url: e.target.value })
                  }
                />
              </div>
              <div>
                content：
                <input
                  type="text"
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                />
              </div>
              <button type="submit">CreateBlog</button>
            </form>
          </div>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
