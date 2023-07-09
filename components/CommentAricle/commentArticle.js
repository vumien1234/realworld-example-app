import classNames from "classnames/bind";
import styles from './commentArticle.module.scss';
import { Button } from '@mantine/core';
import image from '../../assets/image/avata.png';
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GET_ARTICLE_COMMENT,POST_ARTICLE_COMMENT } from "../../models/user";
import {GetArticleComment,PostArticleComment} from '../../APIs/post-comment';
const cx = classNames.bind(styles);
function CommentArticle() {
    const auth = useContext(AuthContext)
  return (
        <>
            {auth.logined ? (
                <div className={cx('box-comment')}>
                <div className={cx('content-comment')}>
                    <textarea placeholder="Write a comment"/>
                    <div className={cx('post-comment')}>
                        <img src={image} alt=""/>
                        <Button w={140} h={30} color="green">
                            Post Comment
                        </Button>
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
