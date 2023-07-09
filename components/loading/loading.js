import { Loader } from '@mantine/core';
import classNames from "classnames/bind";
import styles from './loading.module.scss';
const cx = classNames.bind(styles)
function Loading() {
    return (
        <div className={cx('loading')}>
            <Loader size="xl" />
        </div>
    );
}

export default Loading;