import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { getAllBlogs } from "../../api/internal";
import styles from "./Blog.module.css";
import { useNavigate } from "react-router-dom";

function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const response = await getAllBlogs();
      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    })();

    setBlogs([]);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  if (blogs.length === 0) {
    return <Loader text="blogs" />;
  }

  return (
    <>
      <div className={styles.header}>All Gigs</div>
      <div className={styles.grid}>
        {blogs.map((blog) => (
          <div
            className={styles.card}
            key={blog._id}
            onClick={() => handleCardClick(blog._id)}
          >
            <img src={blog.photoPath} alt={blog.title} />
            <h3>{blog.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blog;
