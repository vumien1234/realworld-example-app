import classNames from "classnames/bind";
import styles from './myArticle.module.scss';
import Header from "../../Layout/Header/header";
import { useContext ,useEffect,useState} from "react";
import { AuthContext } from "../../contexts/authContext";
import { Button } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Tabs } from '@mantine/core';
import Article from "../../components/Article/article";

const cx = classNames.bind(styles)
function MyArticle() {
    const auth = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('first');
 
    return (
        <div>
          <div className={cx('header')}> <Header/></div>
            <div className={cx('wrapper')}>
                <div className={cx('banner-profile')}>
                    <div className={cx('background-account')}>
                        <img src={auth.user.image} alt=""/>
                        <h2 style={{marginTop:'10px'}}>{auth.user.username}</h2>
                        <p >{auth.user.bio}</p>
                    </div>
                    <Link to="/setting" >
                        <Button compact>
                            <FontAwesomeIcon style={{paddingRight:'5px'}} icon={faGear}/>
                            My compact button
                        </Button>;
                    </Link>
                </div>
           </div>
            <div className={cx('content-tabs')}>
                <Tabs color="teal" defaultValue="first">
                    <Tabs.List>
                        <Tabs.Tab
                            className={cx('title-tabs', { 'active-tab': activeTab === 'first' })}
                            onClick={() => setActiveTab('first')}
                            value="first">Teal tab</Tabs.Tab>
                        <Tabs.Tab 
                            className={cx('title-tabs', { 'active-tab': activeTab === 'second' })}
                            onClick={() => setActiveTab('second')}
                            value="second" color="blue">
                            Blue tab
                        </Tabs.Tab>
                    </Tabs.List>
                 
                        <Tabs.Panel value="first" pt="xs">
                        {/* No articles are here... yet. */}
                            {/* <Article/> */}
                        </Tabs.Panel>
              
    
                    <Tabs.Panel value="second" pt="xs">
                        No articles are here... yet.
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}
export default MyArticle;