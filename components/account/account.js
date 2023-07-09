import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FollowAuth, UnFollowAuth } from "../../APIs/user";
import { Favorite, UnFavorite } from "../../APIs/user";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
const cx = classNames.bind(styles);
function Account({ article, style_box, stateFollow, stateFavorite }) {
  const auth = useContext(AuthContext);
  const nav = useNavigate()
  const changeFollow = async () => {
    const response = !stateFollow.follow;
    stateFollow.setFollow("loading");
    try {
      if (response === true) {
        await FollowAuth(article.author.username);
      } else {
        await UnFollowAuth(article.author.username);
      }
      stateFollow.setFollow(response);
    } catch (error) {
      console.log(error);
      stateFollow.setFollow(!response);
    }
  };
  const changeFavorite = async () => {
    const responses = !stateFavorite.favorite;
    stateFavorite.setFavorite("loadding");
    try {
      if (responses === true) {
        await Favorite(article.slug);
      } else {
        await UnFavorite(article.slug);
      }
      stateFavorite.setFavorite(responses);
    } catch (error) {
      console.log(error);
      stateFavorite.setFavorite(!responses);
    }
  };
  return (
    <div className={cx("account")} style={style_box}>
      <img width={"40px"} height={"40px"} src={article.author.image} alt="" />
      <div className={cx("infor-account")}>
        <p>{article.author.username}</p>
        <span style={{ color: "gray", fontSize: "14px" }}>
          {article.updatedAt}
        </span>
      </div>
      <Button
        onClick={auth.logined ? changeFollow : () => nav("/signIn")}
        className={cx("follow")}
        compact
        loading={stateFollow.follow === "loading"}
      >
        <FontAwesomeIcon style={{ paddingRight: "0.3rem" }} icon={faPlus} />
        {stateFollow.follow === true ? "UnFollow " : "Follow "}
        {article.author.username}
      </Button>
      <Button
       
        onClick={auth.logined ? changeFavorite : () => nav("/signIn")}
        className={cx("hearth")}
        compact
        loading={stateFavorite.favorite === "loadding"}
      >
        <FontAwesomeIcon style={{ paddingRight: "0.3rem" }} icon={faHeart} />
        {stateFavorite.favorite === true ? "UnFavorite" : "Favorite "}
        {article.favoritesCount}
      </Button>
    </div>
  );
}

export default Account;
