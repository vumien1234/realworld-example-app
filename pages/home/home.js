import classNames from "classnames/bind";
import styles from './home.module.scss';
import { Tabs } from '@mantine/core';
import { useContext, useEffect, useState } from "react";
import image from '../../assets/image/avata.png';
import Tags from "../../components/tagsList/tags";
import { getArticle } from "../../APIs/articles";
import { AuthContext } from "../../contexts/authContext";
import { Pagination } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Banner from "../../components/Banner/banner";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function Home() {   
    const [activePage, setPage] = useState(1);
    const auth = useContext(AuthContext);
    const [articles,setArticles] = useState([])
    const formatDate= (createdAt)=> {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const fechData = async ()=>{
            setLoading(true)
            try {
                const response = await getArticle({
                    limit:10,
                    offset:activePage * 10 - 10,
                })
                setArticles([...response.articles])
            } catch (error) {
                
            }finally{
                setLoading(false)
            }
        }
        fechData();
    },[activePage])
    const [activeTab, setActiveTab] = useState('first');
    return (
        <div className={cx('container')}>
            {auth.logined ? (
                <div hidden>
                    <Banner/>
                </div>
            ):(
                <Banner/>
            )}
           
            <div className={cx('global')}>
                <div className={cx('content-global')}>
                    <Tabs color="teal" defaultValue="first">
                        <Tabs.List >
                           {auth.logined ?(
                                <>
                                    <Tabs.Tab
                                        value="first"
                                        className={cx('title-tabs', { 'active-tab': activeTab === 'first' })}
                                        onClick={() => setActiveTab('first')}
                                        >
                                        Your Feed
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="second"
                                        className={cx('title-tabs', { 'active-tab': activeTab === 'second' })}
                                        onClick={() => setActiveTab('second')}
                                    >
                                        Global Feed
                                    </Tabs.Tab>
                                </>
                           ):(
                           <>
                                <Tabs.Tab
                                    value="second"
                                    className={cx('title-tabs', { 'active-tab': activeTab === 'second' })}
                                    onClick={() => setActiveTab('second')}
                                >
                                    Global Feed
                                </Tabs.Tab>
                           </>
                           )}
                        </Tabs.List>

                        <Tabs.Panel value="first" pt="xs">
                            No articles are here... yet.
                        </Tabs.Panel>

                        <Tabs.Panel value="second" pt="xs">
                            {loading ? (
                                <span>Loading...</span>
                            ):(
                                <>
                                    {articles.map((article,index)=>(
                                        <Link to={`/articlepage/${article.slug}`}>
                                            <div key={index} className={cx('articles')}>
                                                <div  className={cx('account-article')}>
                                                    <img height={'30'} width={'30'} src={image} alt=""/>
                                                    <div key={article.id}>
                                                        <Link className={cx('Link')} to="/myArticle" style={{color:'green'}}>{article.author.username}</Link>
                                                        <span style={{color:'gray',display:'block',fontSize:'14px'}}>{formatDate(article.updatedAt)}</span>
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
                                                    <h2>{article.title}</h2>
                                                    <span style={{color:'gray',fontSize:'16px',lineHeight:'30px'}}>{article.description}</span>
                                                    <div className={cx('tags')}>
                                                        <span>read more...</span>
                                                    {article.tagList && (
                                                            <ul >
                                                                <li>{article.tagList}</li>
                                                            </ul>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination style={{marginTop:'20px'}} value={activePage} onChange={setPage} total={10} />
                                </>
                            )}
                        </Tabs.Panel>
                    </Tabs>
                </div>
               <Tags/>
            </div>
        </div>
    );
}

export default Home;