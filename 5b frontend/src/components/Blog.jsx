import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Service from '../services/api'
import PropTypes from 'prop-types';
const Blog = ({ blog, user, FetchGetblog }) => {
  const [showDetail, setShowDetail] = useState(false)

  //5.9
  const addlikesBtn = () => {
    blog.likes += 1
    Service.addlikes(blog, user.token).then(e => {
      setShowDetail(e)
    })
  }

  //5.11
  const removeBtn = () => {
    blog.likes += 1
    Service.removeBlog(blog.id, user.token).then(e => {
      toast.success('Delete Success!', { autoClose: 1000 })
      FetchGetblog()
    }).catch(err=>{
      toast.error(err.response.data.error,{autoClose:1000})
      console.log(err);
    })
  }

  return (
    <>
      <ToastContainer />
      <div>
        Title: {blog.title}  By：{blog.author} <button onClick={() => setShowDetail(!showDetail)}>showDetail</button>
      </div>
      {
        //5.7  
        showDetail ? (
          <>
            <div>content: {blog.content} ;id: {blog.id}</div>
            <div>likes:{blog.likes} <button onClick={addlikesBtn}>likes</button></div>
            <div >import: {blog.import} ;url: <a href={blog.url}>{blog.url}</a></div>
            <button style={{ marginBottom: '15px' }} onClick={removeBtn}>Delelte</button>
          </>
        ) : (
          <></>
        )
      }

    </>

  )
}
//5.12
Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string,
    id: PropTypes.string.isRequired,
    likes: PropTypes.number,
    import: PropTypes.bool,
    url: PropTypes.string
  }).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }).isRequired,
  FetchGetblog: PropTypes.func.isRequired
};

export default Blog