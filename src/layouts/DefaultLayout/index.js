import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);
function DefaultLayout({ children, currentUser, setCurrentUser }) {
    return (
        <div className={cx('wrapper')}>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <Sidebar />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
