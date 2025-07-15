import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
const cx = classNames.bind(styles);

function Detail() {
    return <div className={cx('app_container')}></div>;
}

export default Detail;
