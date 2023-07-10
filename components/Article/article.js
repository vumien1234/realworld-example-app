import classNames from "classnames/bind";
import styles from './article.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FormatDate from '../../Heppers/formatDate';
const cx = classNames.bind(styles)
function Article({article}) {
    return (
        <>
        <div className={cx('articles')}>
            <div  className={cx('account-article')}>
                <img height={'30'} width={'30'} src={article.author.image} alt=""/>
                <div key={article.id}>
                    <Link className={cx('Link')} to="/myArticle" style={{color:'green'}}>{article.author.username}</Link>
                    <span style={{color:'gray',display:'block',fontSize:'14px'}}>{FormatDate(article.updatedAt)}</span>
                </div>
            {article.favoritesCount && (
                    <div  className={cx('hearts')} >
                        <FontAwesomeIcon className={cx('favorite')} icon={faHeart}/>
                        <span >{article.favoritesCount}</span>
                    </div>
                )
                }
            
            </div>
            <div style={{marginTop:'20px'}} className={cx('content ')}>
                <Link to={`/articlepage/${article.slug}`}>
                    <h2>{article.title}</h2>
                    <span style={{color:'gray',fontSize:'16px',lineHeight:'30px'}}>{article.description}</span>
                </Link>
                <div className={cx('tags')}>
                    <span>read more...</span>
                    <div style={{position:'absolute',right:'0'}}>
                        {article.tagList.map((tag,index)=>(
                            <span className={cx('title-tags')} key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     </>        
    );
}

export default Article;