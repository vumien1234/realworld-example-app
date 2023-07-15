import classNames from "classnames/bind";
import styles from "./edit.module.scss";
import {GET_ARTICLE_SLUG } from "../../models/user";
import { PutArticle } from "../../apis/articles";
import { useEffect, useState } from "react";
import { MultiSelect ,Button} from "@mantine/core";
import { useParams } from 'react-router-dom';
import {GetArticleSlug} from '../../apis/articles';
import { getTag } from "../../apis/default";
import { notifications } from '@mantine/notifications';
const cx = classNames.bind(styles);
function EditArticle() {
    const {slug}= useParams()
    const [article,setArticle] = useState(GET_ARTICLE_SLUG)
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fechData = async ()=>{
            try {
                const res = await GetArticleSlug(slug)
                setArticle(res.article)
            } catch (error) {
                console.log(error)
            }
        }
        fechData()
    },[slug])
    useEffect(()=>{
        const data = async ()=>{
            try {
                const res = await getTag()
                setData(res.tags)
                onchangeInput(article.tagList)
            } catch (error) {
                console.log(error)
            }
        }
        data()
    },[])
    const onchangeInput = (value, type) => {
        setArticle({
        'article': {
            ...article.article,
            [type]: value,
        },
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await PutArticle(slug,article);
            notifications.show({
                title: 'Edit Thành công',
                message: '🥰',
                color: 'green',
            })
        } catch (error) {
            console.log(error);
            notifications.show({
                title: 'Edit thất bại',
                message: 'Vui lòng edit lại! 🤥',
                color: 'red',
            })
        }finally{
            setLoading(false)
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className={cx("wrapper")}>
            <input
                className={cx('input')}
                style={{ height: "50px", resize: "vertical" }}
                value={article.title}
                onChange={(e) => onchangeInput(e.target.value, "title")}
                placeholder="Article title"
                disabled={loading}
            />
            <input
                className={cx('input')}
                style={{ height: "50px", resize: "vertical" }}
                value={article.description}
                onChange={(e) => onchangeInput(e.target.value, "description")}
                placeholder="what is this article about ?"
                disabled={loading}
            />
            <textarea
                style={{ height: "200px", resize: "vertical" }}
                value={article.body}
                onChange={(e) => onchangeInput(e.target.value, "body")}
                placeholder="Write your article "
                disabled={loading}
            />
            <MultiSelect
                disabled={loading}
                data={data}
                value={article.tagList}
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

export default EditArticle;
