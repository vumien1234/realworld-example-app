import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer')}>
                <FontAwesomeIcon className={cx('icon-github')} icon={faGithub}/>
                <a target="_blank" href={'https://github.com/gothinkster/angularjs-realworld-example-app'}>Fork on GitHub</a>
            </div>
        </div>
       
    );
}

export default Footer;