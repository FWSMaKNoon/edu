import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import Image from '~/components/Images';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Menu({ children }) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        const scrollLayout = document.getElementById('sidebar');
        if (scrollLayout) {
            scrollLayout.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleLogout = () => {
        logout();
        setVisible(false);
        navigate('/');
    };

    return (
        <Tippy
            interactive
            visible={visible}
            onClickOutside={() => setVisible(false)}
            placement="bottom-end"
            render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-wrapper')}>
                        <Link to="/" onClick={handleScroll} className={cx('user')}>
                            <div className={cx('user-avatar')}>
                                <div className={cx('avatar-img')}>
                                    <Image
                                        src="https://i.pinimg.com/originals/c6/e9/ed/c6e9ed167165ca99c4d428426e256fae.png"
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                            <div className={cx('user-name')}>Tài khoản của tôi</div>
                        </Link>
                        <hr />
                        <div>
                            <Link to="/" onClick={handleScroll} className={cx('menu-item')}>
                                Trang cá nhân
                            </Link>
                        </div>
                        <hr />
                        <div>
                            <Link to="/cart" onClick={handleScroll} className={cx('menu-item')}>
                                Giỏ hàng
                            </Link>
                        </div>
                        <hr />
                        <div>
                            <Link to="/favorites" onClick={handleScroll} className={cx('menu-item')}>
                                Yêu thích
                            </Link>
                            <Link to="/view" onClick={handleScroll} className={cx('menu-item')}>
                                Đã xem
                            </Link>
                        </div>
                        <hr />
                        <div>
                            <Button
                                onClick={() => {
                                    handleLogout();
                                    handleScroll();
                                }}
                                className={cx('menu-item')}
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            <div onClick={() => setVisible(!visible)}>{children}</div>
        </Tippy>
    );
}

export default Menu;
