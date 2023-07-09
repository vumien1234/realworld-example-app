import classNames from "classnames/bind";
import styles from './commentArticle.module.scss';
import { Button } from '@mantine/core';
import image from '../../assets/image/avata.png';
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function CommentArticle() {
    const auth = useContext(AuthContext)
  return (
    <>
        {auth.logined ? (
            <div>
                <div className={cx("comment-input")}>
                    <textarea
                    className={cx("text-comment")}
                    placeholder="write a comment"
                    />
                    <div className={cx("post-comment")}>
                    <img width={"35px"} height={"35px"} src={image} alt="" />
                    <div className={cx("button-postComment")}>
                        <Button w={100} h={30} color="green">
                        Post Comment
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        ):(
            <p style={{textAlign:'center'}}>
                <Link className={cx('Link')} to={'/signIn'}>sign In</Link> or <Link className={cx('Link')} to={'/signUp'}>signUp</Link> to add comments on this article.
            </p>
        )}
    </>
    );
}

export default CommentArticle;
