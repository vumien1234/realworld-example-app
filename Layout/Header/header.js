import classNames from "classnames/bind";
import styles from "./header.module.scss";
import MenuHeader from "./menu-header/menuHeader";
import { AuthContext } from '../../contexts/authContext';
import { useContext ,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Heslesstippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { faGear, faLanguage, faMoon, faRightFromBracket, faSun } from "@fortawesome/free-solid-svg-icons";
import { DarkLightContext } from '../../contexts/darkLightContext';
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import {GET_ARTICLE_SLUG} from '../../models/user';
const cx = classNames.bind(styles);

function Header() {
    const [article,setArticle] = useState(GET_ARTICLE_SLUG)
    const auth = useContext(AuthContext);
    const darklight = useContext(DarkLightContext);
    const location = useLocation();

    const pageTitle = "Conduit";
    const getCurrentTitle = () => {
        const { pathname } = location;

        switch (pathname) {
        case "/":
            return "Home";
        case "/signIn":
            return "Sign in";
        case "/signUp":
            return "Sign Up";
        case "/newActive":
            return "New Active";
        case "/setting":
            return "Setting";
        default:
            return pageTitle
        }
    };

    const handleClick = () => {
        darklight.setDarkLight(darklight.darkLight === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={cx('container')}>
        <Helmet>
            <title>
            {getCurrentTitle()} - {pageTitle}
            </title>
        </Helmet>
        <div className={cx('wrapper')}>
            <Link style={{ fontSize: '25px', fontWeight: 'bold' }} to='/' className={cx('title')}>conduit</Link>
            <div className={cx('navigation')}>
            {auth.logined ? (
                <>
                <MenuHeader to={'/'} title='Home' />
                <div style={{ padding: '0 10px' }}>
                    <MenuHeader icon={<FontAwesomeIcon icon={faGear} />} />
                    <MenuHeader to={'/setting'} title='Setting' />
                </div>
                <div style={{ padding: '0 10px' }}>
                    <MenuHeader icon={<FontAwesomeIcon icon={faPenToSquare} />} />
                    <MenuHeader to={'/newActive'} title='New Active' />
                </div>
                <Heslesstippy
                    interactive
                    offset={[-20, 10]}
                    render={attrs => (
                    <div className={cx("account-menu")} tabIndex="-1" {...attrs}>
                        <ul className={cx('account-menu-item')}>
                        <li onClick={handleClick}>
                            {darklight.darkLight === 'dark' ? (
                            <>
                                <FontAwesomeIcon className={cx('account-menu-icon')} icon={faMoon} />
                                <span>Giao diện: tối</span>
                            </>
                            ) : (
                            <>
                                <FontAwesomeIcon className={cx('account-menu-icon')} icon={faSun} />
                                <span>Giao diện: sáng</span>
                            </>
                            )}
                        </li>
                        <li>
                            <FontAwesomeIcon className={cx('account-menu-icon')} icon={faLanguage} />
                            <span>Ngôn ngữ</span>
                        </li>
                        <li onClick={auth.action.logout}>
                            <FontAwesomeIcon className={cx('account-menu-icon')} icon={faRightFromBracket} />
                            <span>Đăng xuất</span>
                        </li>
                        </ul>
                    </div>
                    )}
                >
                    <Link to={'/myArticle'}>
                    <div className={cx('account')}>
                        <img className={cx('avata')} width={30} height={30} src={auth.user.image} alt="" />
                        <span>{auth.user.username}</span>
                    </div>
                    </Link>
                </Heslesstippy>
                </>
            ) : (
                <>
                <MenuHeader to={'/'} title='Home' />
                <MenuHeader to={'/signIn'} title='Sign in' />
                <MenuHeader to={'/signUp'} title='Sign up' />
                </>
            )}
            </div>
        </div>
        </div>
    );
}

export default Header;
