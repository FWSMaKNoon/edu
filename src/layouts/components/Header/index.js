import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';

import styles from './Header.module.scss';
import Search from '~/layouts/components/Search';
import { NotiftIcon } from '../Icons';
import Button from '~/components/Button';
import Image from '~/components/Images';
import images from '~/assets/imgs';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'Yêu thích',
        to: '/favorites',
    },
];

function Header() {
    const { currentUser, login } = useContext(AuthContext);

    return (
        <div className={cx('header')}>
            <div className={cx('header__logo', 'hide-on-mobile')}>
                <Link to="/">
                    <Image className={cx('img')} src={images.logo} />
                </Link>
                <Link className={cx('hide-on-mobile-tablet')} to="/">
                    Học lập trình để đi làm
                </Link>
            </div>

            <div className={cx('search-wrapper')}>
                <Search />
            </div>

            {currentUser ? (
                <div className={cx('action', 'ml-10', 'ml-0')}>
                    <div className={cx('my_course')}>
                        <Button className={cx('my_course-btn', 'hide-on-mobile-tablet')}>Khoa học của tôi</Button>
                    </div>
                    <div className={cx('notify', 'ml-10', 'ml-0')}>
                        <NotiftIcon />
                    </div>
                    <div className={cx('user', 'ml-10', 'ml-0')}>
                        <Menu items={MENU_ITEMS}>
                            <Image
                                className={cx('user-avatar')}
                                src="https://i.pinimg.com/originals/c6/e9/ed/c6e9ed167165ca99c4d428426e256fae.png"
                                alt="User Avatar"
                            />
                        </Menu>
                    </div>
                </div>
            ) : (
                <div className={cx('user-regis')}>
                    <Button className={cx('user-signin', 'hide-on-mobile')}>Đăng ký</Button>
                    <Button onClick={login} primary className={cx('user-login')}>
                        Đăng nhập
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Header;
