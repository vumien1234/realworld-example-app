import classNames from "classnames/bind";
import styles from "./newActive.module.scss";
import { ARTICLE } from "../../models/user";
import { PostArticle } from "../../apis/articles";
import { useState } from "react";
import { MultiSelect ,Button} from "@mantine/core";
import { notifications } from '@mantine/notifications';

const cx = classNames.bind(styles);
function NewActive() {
    const [newArticle,setNewArticle] = useState(ARTICLE)
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState([
        { value: "react", label: "React" },
        { value: "ng", label: "Angular" },
    ]);
    
    const onchangeinput = (value,type)=>{
        setNewArticle({
            article:{
                ...newArticle.article,
                [type]:value
            }
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            await PostArticle(newArticle)
            setNewArticle(ARTICLE)
            notifications.show({
                title: 'PushArticle Thành công',
                message: '🥰',
                color: 'green',
            })
        } catch (error) {
            notifications.show({
                title: 'PushArticle  thất bại',
                message: 'Vui lòng push lại! 🤥',
                color: 'red',
            })
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cx("wrapper")}>
            <input
                className={cx('input')}
                value={newArticle.article.title}
                onChange={(e)=>onchangeinput(e.target.value,'title')}
                style={{ height: "50px", resize: "vertical" }}
                placeholder="Article title"
                disabled={loading}
            />
            <input
                className={cx('input')}
                value={newArticle.article.description}
                onChange={(e)=>onchangeinput(e.target.value,'description')}
                style={{ height: "50px", resize: "vertical" }}
                placeholder="what is this article about ?"
                disabled={loading}
            />
            <textarea
                 value={newArticle.article.body}
                onChange={(e)=>onchangeinput(e.target.value,'body')}
                style={{ height: "200px", resize: "vertical" }}
                placeholder="Write your article "
                disabled={loading}
            />
            <MultiSelect
                disabled={loading}
                data={data}
                value={newArticle.article.tagList}
                onChange={(e)=>onchangeinput(e,'tagList')}
                placeholder="enter tags"
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                const item = { value: query, label: query };
                setData((current) => [...current, item]);
                return item;
                }}
            />
            <Button className={cx("button")} size="md" type="submit" loading={loading}>
                publish Article
            </Button>
        </form>
    );
}

export default NewActive;
