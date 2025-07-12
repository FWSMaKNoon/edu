import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import images from '~/assets/imgs';

const cx = classNames.bind(styles);

function Sidebar() {
    return <section style={{ backgroundImage: `url(${images.banner})` }} className={cx('banner')}></section>;
}

export default Sidebar;
