import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import Image from '~/components/Images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Menu({ children }) {
    const { logout } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

    return (
        <Tippy
            interactive
            visible={visible}
            onClickOutside={() => setVisible(false)}
            placement="bottom-end"
            render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-wrapper')}>
                        <Button href="/" className={cx('user')}>
                            <div className={cx('user-avatar')}>
                                <div className={cx('avatar-img')}>
                                    <Image
                                        src="https://i.pinimg.com/originals/c6/e9/ed/c6e9ed167165ca99c4d428426e256fae.png"
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                            <div className={cx('user-name')}>Tài khoản của tôi</div>
                        </Button>
                        <hr />
                        <div>
                            <Button href="/" className={cx('menu-item')}>
                                Trang cá nhân
                            </Button>
                        </div>
                        <hr />
                        <div>
                            <Button href="/favorites" className={cx('menu-item')}>
                                Yêu thích
                            </Button>
                            <Button href="/view" className={cx('menu-item')}>
                                Đã xem
                            </Button>
                        </div>
                        <hr />
                        <div>
                            <Button onClick={logout} className={cx('menu-item')}>
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
