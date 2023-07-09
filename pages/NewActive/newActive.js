import classNames from "classnames/bind";
import styles from "./newActive.module.scss";
import { ARTICLE } from "../../models/user";
import { PostArticle } from "../../APIs/articles";
import { useState } from "react";
import { MultiSelect ,Button} from "@mantine/core";

const cx = classNames.bind(styles);
function NewActive() {
    const [publishArticle, setPublishArticle] = useState(ARTICLE);
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState([
        { value: "react", label: "React" },
        { value: "ng", label: "Angular" },
    ]);
    const onchangeInput = (value, type) => {
        setPublishArticle({
        article: {
            ...publishArticle.article,
            [type]: value,
        },
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await PostArticle(publishArticle);
            setPublishArticle(ARTICLE);
            alert("publish articel thành công");
        } catch (error) {
            console.log(error);
            alert("publish articel thất bại");
        }finally{
            setLoading(false)
        }
    };
    return (
        <form onSubmit={handleSubmit} className={cx("wrapper")}>
            <input
                className={cx('input')}
                style={{ height: "50px", resize: "vertical" }}
                value={publishArticle.article.title}
                onChange={(e) => onchangeInput(e.target.value, "title")}
                placeholder="Article title"
                disabled={loading}
            />
            <input
                className={cx('input')}
                style={{ height: "50px", resize: "vertical" }}
                value={publishArticle.article.description}
                onChange={(e) => onchangeInput(e.target.value, "description")}
                placeholder="what is this article about ?"
                disabled={loading}
            />
            <textarea
                style={{ height: "200px", resize: "vertical" }}
                value={publishArticle.article.body}
                onChange={(e) => onchangeInput(e.target.value, "body")}
                placeholder="Write your article "
                disabled={loading}
            />
            <MultiSelect
                disabled={loading}
                data={data}
                value={publishArticle.article.tagList}
                onChange={(e) => onchangeInput(e, "tagList")}
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
