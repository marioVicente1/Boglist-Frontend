import React from 'react' // Agrega esta línea

const Blog = ({
  blog,
  handleBlogDetails,
  viewBlogDetails,
  handleLike,
  user,
  setBlogs,
  handleDeleteBlog
}) => {
  const isOwner = blog.user && blog.user === user.id

  return (
    <div className="blog" data-testid="blog">
      <div style={{ display: 'flex', gap: '5px' }}>
        <div className="blog-title" data-testid="blog-title">
          {blog.title}
        </div>
        <button onClick={handleBlogDetails} data-testid="toggle-details">
          {viewBlogDetails ? 'hide details' : 'view details'}
        </button>
      </div>
      <div className="blog-author" data-testid="blog-author">
        Author: {blog.author}
      </div>

      {viewBlogDetails && (
        <div className="blog-details" data-testid="blog-details">
          <p data-testid="blog-url">URL: {blog.url}</p>
          <p data-testid="blog-likes">Likes: {blog.likes || 0}</p>
          <button onClick={() => handleLike(blog)} data-testid="like-button">
            like
          </button>
          {isOwner && (
            <button
              onClick={() => handleDeleteBlog(blog.id)}
              data-testid="remove-button"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
