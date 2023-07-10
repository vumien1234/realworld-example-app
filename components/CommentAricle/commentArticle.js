import classNames from "classnames/bind";
import styles from "./commentArticle.module.scss";
import { Button } from "@mantine/core";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { POST_ARTICLE_COMMENT } from "../../models/user";
import { GetArticleComment, PostArticleComment } from "../../APIs/post-comment";
import { notifications } from "@mantine/notifications";
import AccountComment from "./AccountComment/account-comment";
const cx = classNames.bind(styles);
function CommentArticle() {
  const { slug } = useParams();
  const auth = useContext(AuthContext);
  const [postComment, setPostComent] = useState(POST_ARTICLE_COMMENT);
  const [listComment,setListComment] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response =  await PostArticleComment(slug, postComment);
        setListComment([response.comment, ...listComment])
      notifications.show({
        title: "Bình luận thành công",
        message: " 🤥",
      });
      setPostComent(POST_ARTICLE_COMMENT);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Bình luận thất bại",
        message: " 🤥",
        color: "red",
      });
    }
  };
  useEffect(()=>{
    const fechData = async ()=>{
        // lifeCycle : vòng đời của 1 biến tồn tại trong try
        try {
            const response = await GetArticleComment(slug)
            setListComment(response.comments)
        } catch (error) {
            console.log(error)
        }
    }
    fechData()
  },[])

  return (
    <>
      {auth.logined ? (
        <div>
            <div className={cx("box-comment")}>
              <form
                className={cx("content-comment")}
                onSubmit={(e) => handleSubmit(e)}
              >
                <textarea
                  value={postComment.comment.body}
                  onChange={(e) =>
                    setPostComent({ comment: { body: e.target.value } })
                  }
                  placeholder="Write a comment"
                />
                <div className={cx("post-comment")}>
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={auth.user.image}
                    alt=""
                  />
                  <Button type="submit" w={140} h={30} color="green">
                    Post Comment
                  </Button>
                </div>
              </form>
            </div>
              {listComment.map((comment)=>(
                <AccountComment key={comment.id} comment = {comment}/>
              ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <Link className={cx("Link")} to={"/signIn"}>
            sign In
          </Link>{" "}
          or{" "}
          <Link className={cx("Link")} to={"/signUp"}>
            signUp
          </Link>{" "}
          to add comments on this article.
        </p>
      )}
    </>
  );
}

export default CommentArticle;
