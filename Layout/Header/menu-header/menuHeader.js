import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './menuHeader.module.scss';
const cx = classNames.bind(styles)
function MenuHeader({title,to,icon}) {
    return (
        <NavLink  className={(nav)=> cx('item-menu',{active:nav.isActive})}  to={to} >
            <span className={cx('title')}>{title}</span>
            <span className={cx('icon')}>{icon}</span>
        </NavLink>
    );
}

export default MenuHeader;