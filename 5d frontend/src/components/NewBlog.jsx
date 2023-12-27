import React, { useState, useEffect } from 'react'
import Service from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//5.6
const NewBlog = (props) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        content: ''
    })

    const handleCreateBlog = (event) => {
        event.preventDefault()
        Service.addBlog(newBlog.url, newBlog.title, newBlog.content, newBlog.author,props.user.token).then(e => {
            toast.success('add success', { autoClose: 1000 })

            //5.8
            props.FetchGetblog()
            ClearnNewBlogFrom()

        }).catch(err => {
            toast.error(err.error, { autoClose: 1000 })
        })
    }

    const ClearnNewBlogFrom = () => {
        setNewBlog(prevNewBlog => ({
            ...prevNewBlog,
            title: '',
            author: '',
            url: '',
            content: ''
        }));
        props.setShowForm(false);
    }


    return (
        <div>
            <ToastContainer />
            <h2>Create new Blog</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title：
                    <input
                        type="text"
                        id="title"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    />
                </div>
                <div>
                    author：
                    <input
                        type="text"
                        id="author"
                        value={newBlog.author}
                        onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                    />
                </div>
                <div>
                    url：
                    <input
                        type="text"
                        id="url"
                        value={newBlog.url}
                        onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
                    />
                </div>
                <div>
                    content：
                    <input
                        type="text"
                        id="content"
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    />
                </div>
                <button id="create-blog-button" type="submit">CreateBlog</button>
                <button type="button" onClick={ClearnNewBlogFrom}>Cancel</button>
            </form>
        </div>
    )
}
export default NewBlog
