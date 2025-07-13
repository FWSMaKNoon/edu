import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

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
    {
        id: 3,
        image: 'https://th.bing.com/th/id/R.d84e8415f5de30d73a74ce7676edbac0?rik=OB1ANZb7nyWmsg&pid=ImgRaw&r=0',
        name: 'Nike Air Force 1',
        price: 2590000,
        quantity: 1,
    },
    {
        id: 4,
        image: 'https://th.bing.com/th/id/R.d84e8415f5de30d73a74ce7676edbac0?rik=OB1ANZb7nyWmsg&pid=ImgRaw&r=0',
        name: 'Nike Air Force 1',
        price: 2590000,
        quantity: 1,
    },
];

function Header() {
    const currentUser = true;
    return (
        <>
            <header className={cx('wrapper', 'header')}>
                <div className={cx('header__top')}>
                    <div className="grid wide">
                        <div className={cx('header__navbar')}>
                            <ul className={cx('header__navbar-list', 'c-0')}>
                                <li className={cx('header__navbar-item')}>
                                    Mở cửa: 8:30 - 22h00, thứ 2 - CN hàng tuần
                                </li>
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
                                        <a
                                            href="https://google.com"
                                            className={cx(
                                                'header__navbar-item-link',
                                                'header__navbar-item-link-disable',
                                            )}
                                        >
                                            Tài khoản
                                        </a>
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
                                                <Button href="https://google.com" login medium>
                                                    Đăng nhập
                                                </Button>
                                                <Button href="https://google.com" signin medium>
                                                    Đăng ký
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li className={cx('header__navbar-item', 'header__navbar--has-hover')}>
                                    <a href="/shop" className={cx('header__navbar-item-link')}>
                                        <FontAwesomeIcon className={cx('header__navbar-icon')} icon={faLocationDot} />
                                        Hệ thống cửa hàng
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={cx('header_main')}>
                    <div className="grid wide">
                        <div className={cx('header-with-search')}>
                            {/* Logo */}
                            <div className={cx('header__logo')}>
                                <a href="/">
                                    <Image className={cx('header__logo-img')} src={images.logo} alt="logo" />
                                </a>
                            </div>

                            {/* Search */}
                            <Search />

                            {/* Hotline */}
                            <div className={cx('header__hotline')}>
                                <div className={cx('header__hotline-contact-start')}>
                                    {/* Hotline contact */}
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

                                    {/* Hotline cart */}
                                    <CartItem items={CART_ITEMS}>
                                        <div className={cx('header__hotline-contact', 'header__hotline-contact-cart')}>
                                            <a className={cx('icon-link')} href="./cart.html">
                                                <div className={cx('icon')}>
                                                    <FontAwesomeIcon
                                                        className={cx('header__hotline-icon')}
                                                        icon={faCartShopping}
                                                    />

                                                    <span className={cx('header__hotline-quantity')}></span>
                                                </div>
                                            </a>

                                            <div className={cx('text', 'c-0', 'quantity_cart')}>
                                                <a
                                                    href="https://google.com"
                                                    className={cx(
                                                        'header__hotline-quantity-desk',
                                                        'header__hotline-title',
                                                    )}
                                                >
                                                    (0) Sản phẩm
                                                </a>
                                                <div className={cx('header__hotline-text')}>Giỏ hàng</div>
                                            </div>
                                        </div>
                                    </CartItem>

                                    {/* Menu button */}
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
                                <a href="/shop" className={cx('header__footer-item-link')}>
                                    <FontAwesomeIcon className={cx('header__footer-item-icon')} icon={faBars} />
                                    Danh mục sản phẩm
                                </a>
                                <ul className={cx('header__footer-sub')} style={{ width: '100%' }}>
                                    <li className={cx('header__footer-sub-item')}>
                                        <a href="shop" className={cx('header__footer-sub-item-link')}>
                                            KO
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className={cx('header__footer-item')}>
                                <a href="/" className={cx('header__footer-item-link')}>
                                    HOME
                                </a>
                            </li>

                            <li className={cx('header__footer-item', 'header__footer-item-has-hover')}>
                                <a href="/shop" className={cx('header__footer-item-link')}>
                                    GIÀY
                                </a>
                                <ul className={cx('header__footer-sub')}>
                                    {[
                                        'NIKE',
                                        'ADIDAS',
                                        'VANS & CONVERSE',
                                        'GUUCI & LV',
                                        'MLB',
                                        'BALEN',
                                        'MC QUEEN',
                                        'NEW BALANCE',
                                        'ASICS & ONITSUKA TIGER',
                                    ].map((item, index) => (
                                        <li key={index} className={cx('header__footer-sub-item')}>
                                            <a href="./profile" className={cx('header__footer-sub-item-link')}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className={cx('header__footer-item', 'header__footer-item-has-hover')}>
                                <a href="./shop" className={cx('header__footer-item-link')}>
                                    ÁO
                                </a>
                                <ul className={cx('header__footer-sub')}>
                                    {['T-SHIRT', 'SƠ MI', 'ÁO KHOÁC', 'POLO', 'SWEATER', 'HOODIE', 'JACKET'].map(
                                        (item, index) => (
                                            <li key={index} className={cx('header__footer-sub-item')}>
                                                <a href="/shop" className={cx('header__footer-sub-item-link')}>
                                                    {item}
                                                </a>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </li>

                            <li className={cx('header__footer-item', 'header__footer-item-has-hover')}>
                                <a href="/shop" className={cx('header__footer-item-link')}>
                                    BEYOURSELF
                                </a>
                                <ul className={cx('header__footer-sub')}>
                                    {['T-SHIRT', 'POLO', 'QUẦN', 'HOODIE', 'VARSITY'].map((item, index) => (
                                        <li key={index} className={cx('header__footer-sub-item')}>
                                            <a href="/shop" className={cx('header__footer-sub-item-link')}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className={cx('header__footer-item', 'header__footer-item-has-hover')}>
                                <a href="/shop" className={cx('header__footer-item-link')}>
                                    DÉP
                                </a>
                                <ul className={cx('header__footer-sub')}>
                                    {['ADIDAS', 'NIKE', 'NEW BALANCE', 'MLB'].map((item, index) => (
                                        <li key={index} className={cx('header__footer-sub-item')}>
                                            <a href="/shop" className={cx('header__footer-sub-item-link')}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className={cx('header__footer-item')}>
                                <a href="/shop" className={cx('header__footer-item-link')}>
                                    TIN TỨC
                                </a>
                            </li>

                            <li className={cx('header__footer-item')}>
                                <a href="/shop" className={cx('header__footer-item-link')}>
                                    GIỚI THIỆU
                                </a>
                            </li>

                            <li className={cx('header__footer-item')}>
                                <a href="/favorites" className={cx('header__footer-item-link')}>
                                    YÊU THÍCH
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
