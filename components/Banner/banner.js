import classNames from "classnames/bind";
import styles from './banner.module.scss';
const cx = classNames.bind(styles)
function Banner() {
    return (  
        <div className={cx('container ')}>
            <div className={cx('conduit')}>
                <div className={'banner'}>
                    <h1 className={cx('title')}>conduit</h1>
                    <span>A place to share your knowledge</span>
                </div>
            </div>
        </div>
    );
}

export default Banner;