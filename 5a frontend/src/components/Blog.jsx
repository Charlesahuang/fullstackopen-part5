const Blog = ({ blog }) => (
  <>
    <div>
     Title: {blog.title}  By：{blog.user.username}

    </div>
    <div style={{marginBottom:'8px'}}>content: {blog.content}</div>
  </>

)

export default Blog