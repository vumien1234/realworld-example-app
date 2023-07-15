import classNames from "classnames/bind";
import styles from "./article-page.module.scss";
import Header from "../../Layout/Header/header";
import { GetArticleSlug } from "../../apis/articles";
import { GET_ARTICLE_SLUG } from "../../models/user";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Account from "../../components/account/account";
import CommentArticle from "../../components/CommentAricle/commentArticle";
import { Prism } from "@mantine/prism";
const cx = classNames.bind(styles);
function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(GET_ARTICLE_SLUG);
  const [follow, setFollow] = useState("loading");
  const [favorite, setFavorite] = useState("loadding");
  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await GetArticleSlug(slug);
        setArticle(response.article);
        setFollow(response.article.author.following);
        setFavorite(response.article.favorited);
      } catch (error) {
        console.log(error);
      }
    };
    fectData();
  }, [slug]);
//   const demoCode = `
// import { Button } from '@mantine/core';

// function Demo() {
//     return <Button>Hello</Button>
// }`;

  return (
    <>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("banner")}>
          <h1>{article.title}</h1>
          <Account
            article={article}
            stateFollow={{
              follow,
              setFollow,
            }}
            stateFavorite={{
              favorite,
              setFavorite,
            }}
          />
        </div>
        <div className={cx("content-article")}>
          <div className={cx("article")}>
            <p>{article.body}</p>
            <div className={cx("hastgas")}>
              {article.tagList.map((tag, index) => (
                <span key={index} style={{ display: "inline-block" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={cx("box-comment")}>
            <Account
              stateFollow={{
                follow,
                setFollow,
              }}
              stateFavorite={{
                favorite,
                setFavorite,
              }}
              article={article}
              style_box={{
                display: "flex",
                justifyContent: "center",
                padding: "1.5rem 0",
                maxWidth: "60%",
                margin: "auto",
              }}
            />
            {/* <Prism withLineNumbers language="tsx">
              {demoCode}
            </Prism> */}
            <CommentArticle />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticlePage;
