import classNames from "classnames/bind";
import styles from './home.module.scss';
import { Tabs } from '@mantine/core';
import { useContext, useEffect, useState } from "react";
import Tags from "../../components/tagsList/tags";
import { getArticle } from "../../APIs/articles";
import { AuthContext } from "../../contexts/authContext";
import { Pagination } from '@mantine/core';
import Banner from "../../components/Banner/banner";
import Article from "../../components/Article/article";

const cx = classNames.bind(styles)
function Home() {   
    const [activePage, setPage] = useState(1);
    const auth = useContext(AuthContext);
    const [articles,setArticles] = useState([])
    
    
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
                                    {articles.map((article)=>(
                                        <Article key={article.slug} article={article}/>
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