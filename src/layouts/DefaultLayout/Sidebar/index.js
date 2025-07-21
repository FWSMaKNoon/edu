import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('container')} id="sidebar">
            <div className={cx('banner')}>
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-6 m-12 c-12">
                            <div className={cx('content-left')}>
                                <h2 className={cx('heading')}>
                                    <a href="/">Thành Quả của Học Viên</a>
                                </h2>
                                <p className={cx('desc')}>
                                    Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó.
                                    Học lập trình cũng không là ngoại lệ.
                                </p>
                                <div>
                                    <Link to="/" className={cx('btn')}>
                                        XEM THÀNH QUẢ
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col l-6 m-0 c-0">
                            <div className={cx('content-right')}>
                                <a href="/">
                                    <img
                                        src="https://files.fullstack.edu.vn/f8-prod/banners/Banner_01_2.png"
                                        className={cx('img')}
                                        alt="banner"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
