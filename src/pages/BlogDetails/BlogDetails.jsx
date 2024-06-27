import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog, postComment, getCommentsById } from "../../api/internal";
import Loader from "../../components/Loader/Loader";
import styles from "./BlogDetails.module.css";
import CommentList from "../../components/CommentList/CommentList";

function BlogDetails() {
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    async function getBlogDetails() {
      const commentResponse = await getCommentsById(blogId);
      if (commentResponse.status === 200) {
        setComments(commentResponse.data.data);
      }

      const blogResponse = await getBlogById(blogId);
      if (blogResponse.status === 200) {
        setOwnsBlog(username === blogResponse.data.blog.author.username);
        setBlog(blogResponse.data.blog);
      }
    }
    getBlogDetails();
  }, [reload]);

  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    };

    const response = await postComment(data);

    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };

  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);

    if (response.status === 200) {
      navigate("/blogs");
    }
  };

  if (Object.keys(blog).length === 0) {
    return <Loader text="blog details" />;
  }

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.left}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.meta}>
          <img src={blog.authorPhotoPath} alt="Author's profile" className={styles.profileImage} />
          <p>
            @{blog.author.username} on {new Date(blog.createdAt).toDateString()}
          </p>
        </div>
        <div className={styles.photo}>
          <img src={blog.photoPath} alt={blog.title} />
        </div>
        <p className={styles.content}>{blog.content}</p>
        <p className={styles.price}>Price: ${blog.price}</p>
       
          <div className={styles.controls}>
           
            <button className={styles.deleteButton} onClick={deleteBlogHandler}>
              Delete
            </button>
          </div>
  
      </div>
    </div>
  );
}

export default BlogDetails;
