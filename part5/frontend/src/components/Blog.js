import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, loggedUserId, reloadBlogs, handleLikeUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "#ddd",
  };

  const [reveal, setReveal] = useState(false);

  const hideWhenReveal = { display: reveal ? "none" : "" };
  const showWhenReveal = { display: reveal ? "" : "none" };
  console.log("loggedUserId==", loggedUserId);
  console.log("blog.user.id==", blog.user.id);
  const showForCreator = {
    display: blog.user && loggedUserId === blog.user.id ? "" : "none",
  };
  /** const showForCreator = () => {
    if (blog.user && loggedUserId === blog.user.id) {
      return { display: "" };
    } else {
      return { display: "none" };
    }
  }; */
  console.log("showForCreator==", showForCreator);

  const toggleReveal = () => {
    setReveal(!reveal);
  };

  const handleDeletion = async () => {
    console.log("handle deletion clicked  ");
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteEntry(blog.id);
      reloadBlogs();
    }
  };

  return (
    <div className="blog">
      <div style={{ ...blogStyle, ...hideWhenReveal }} className="shortBlog">
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleReveal} id="viewReveal">
          view
        </button>
      </div>

      <div style={{ ...blogStyle, ...showWhenReveal }} className="longBlog">
        <div id="blogTitle">{blog.title}&nbsp; </div>
        <button onClick={toggleReveal}>hide</button>
        <br />
        {blog.url}
        <br />
        likes &nbsp;{blog.likes}&nbsp;{" "}
        <button onClick={handleLikeUpdate} id="likeBlog">
          {" "}
          like
        </button>
        <br />
        {blog.author}
        <br />
        <button style={showForCreator} onClick={handleDeletion} id="removeBlog">
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
