import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/imgs';
import Button from '~/components/Button';
import CartItem from '~/components/Popper/CartItem';
import MenuNavBar from '~/components/Popper/MenuNavBar';
import Image from '~/components/Images';
import Search from '~/components/Layout/components/Search';

const cx = classNames.bind(styles);

const CART_ITEMS = [
    {
        id: 1,
        image: 'https://tse2.mm.bing.net/th/id/OIP.0M5QnpXRymTxabOb3pb2ngHaI4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        name: 'Men Casual Long Sleeve Polo',
        price: 690000,
        quantity: 2,
    },
    {
        id: 2,
        image: 'https://th.bing.com/th/id/R.d84e8415f5de30d73a74ce7676edbac0?rik=OB1ANZb7nyWmsg&pid=ImgRaw&r=0',
        name: 'Nike Air Force 1',
        price: 2590000,
        quantity: 1,
    },
];

function Header() {
    const currentUser = true;

    return (
        <header className={cx('wrapper', 'header')}>
            <div className={cx('header__top')}>
                <div className="grid wide">
                    <div className={cx('header__navbar')}>
                        <ul className={cx('header__navbar-list', 'c-0')}>
                            <li className={cx('header__navbar-item')}>Mở cửa: 8:30 - 22h00, thứ 2 - CN hàng tuần</li>
                        </ul>
                        <ul className={cx('header__navbar-list', 'header__navbar-list-info')}>
                            <li
                                className={cx(
                                    'header__navbar-item',
                                    'header__navbar-user',
                                    'header__navbar--has-hover',
                                )}
                            >
                                <div className={cx('header__navbar-item-link')}>
                                    <FontAwesomeIcon className={cx('header__navbar-icon')} icon={faUser} />
                                    <Link
                                        to="/user"
                                        className={cx('header__navbar-item-link', 'header__navbar-item-link-disable')}
                                    >
                                        Tài khoản
                                    </Link>
                                </div>

                                <div className={cx('header__navbar-user-menu')}>
                                    {currentUser ? (
                                        <>
                                            <Button href="/user" login medium>
                                                Tài khoản
                                            </Button>
                                            <Button href="/" signin medium>
                                                Đăng xuất
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button href="/login" login medium>
                                                Đăng nhập
                                            </Button>
                                            <Button href="/register" signin medium>
                                                Đăng ký
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </li>

                            <li className={cx('header__navbar-item', 'header__navbar--has-hover')}>
                                <Link to="/shop" className={cx('header__navbar-item-link')}>
                                    <FontAwesomeIcon className={cx('header__navbar-icon')} icon={faLocationDot} />
                                    Hệ thống cửa hàng
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={cx('header_main')}>
                <div className="grid wide">
                    <div className={cx('header-with-search')}>
                        <div className={cx('header__logo')}>
                            <Link to="/">
                                <Image className={cx('header__logo-img')} src={images.logo} alt="logo" />
                            </Link>
                        </div>

                        <Search />

                        <div className={cx('header__hotline')}>
                            <div className={cx('header__hotline-contact-start')}>
                                <div className={cx('header__hotline-contact', 'hide-on-mobile-tablet')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon className={cx('header__hotline-icon')} icon={faPhone} />
                                    </div>
                                    <div className={cx('text')}>
                                        <a
                                            href="tel:0868457656"
                                            className={cx('header__hotline-number', 'header__hotline-title')}
                                        >
                                            0868.457.656
                                        </a>
                                        <div className={cx('header__hotline-text')}>Hotline</div>
                                    </div>
                                </div>

                                <CartItem items={CART_ITEMS}>
                                    <div className={cx('header__hotline-contact', 'header__hotline-contact-cart')}>
                                        <Link className={cx('icon-link')} to="/cart">
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon
                                                    className={cx('header__hotline-icon')}
                                                    icon={faCartShopping}
                                                />
                                                <span className={cx('header__hotline-quantity')}></span>
                                            </div>
                                        </Link>
                                        <div className={cx('text', 'c-0', 'quantity_cart')}>
                                            <span className={cx('header__hotline-title')}>Giỏ hàng</span>
                                        </div>
                                    </div>
                                </CartItem>

                                <MenuNavBar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('header__footer', 'hide-on-mobile-tablet')}>
                <div className="grid wide">
                    <ul className={cx('header__footer-list')}>
                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                <FontAwesomeIcon className={cx('header__footer-item-icon')} icon={faBars} />
                                Danh mục sản phẩm
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/" className={cx('header__footer-item-link')}>
                                HOME
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                GIÀY
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                ÁO
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                BEYOURSELF
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                DÉP
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                TIN TỨC
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/shop" className={cx('header__footer-item-link')}>
                                GIỚI THIỆU
                            </Link>
                        </li>

                        <li className={cx('header__footer-item')}>
                            <Link to="/favorites" className={cx('header__footer-item-link')}>
                                YÊU THÍCH
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
