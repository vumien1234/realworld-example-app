import classNames from "classnames/bind";
import styles from './account-comment.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { DeleteComment } from "../../../APIs/post-comment";
import { useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
const cx = classNames.bind(styles);
function AccountComment({comment}) {
    const { slug } = useParams();
    const [deleteComment,setDeleteComment] = useState(false)
    const handleDelete = async ()=>{
        try {
            await DeleteComment(slug,comment.id)
            notifications.show({
                title: "Xóa Bình luận Thành công",
                message: " 🤥",
            });  
            setDeleteComment(true)
        } catch (error) {
            notifications.show({
                title: "Xóa Bình luận thất bại",
                message: " 🤥",
                color: "red",
            });   
        }
    }
    return (
        <div className={cx('box-comment')} style={{
            display: deleteComment ? 'none' : 'flex'
        }}>
            <div className={cx('content-comment')}>
                <textarea value={comment.body} readOnly/>
                <div className={cx('post-comment')}>
                    <img style={{ width: "40px", height: "40px" }} src={comment.author.image} alt=""/>
                    <span onClick={()=>handleDelete()}><FontAwesomeIcon icon={faTrashCan} /></span>
                </div>
            </div>
        </div>
    );
}

export default AccountComment;