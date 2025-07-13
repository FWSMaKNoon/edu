import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './MenuNavBar.module.scss';
import images from '~/assets/imgs';
import Header from './Header';
import MenuItemsNavBar from './MenuItemsNavBar';
import Search from '~/components/Layout/components/Search';

const cx = classNames.bind(styles);

const MENU_NAVBAR = [
    {
        title: 'HOME',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faAngleRight} />,
        title: 'GIÀY',
        to: '/shop',
        subItems: {
            title: 'GIÀY',
            data: [
                { title: 'NIKE', to: '/giay/nike' },
                { title: 'ADIDAS', to: '/giay/adidas' },
                { title: 'VANS & CONVERSE', to: '/giay/vans-converse' },
                { title: 'GUCCI & LV', to: '/giay/gucci-lv' },
                { title: 'MLB', to: '/giay/mlb' },
                { title: 'BALEN', to: '/giay/balen' },
                { title: 'MC QUEEN', to: '/giay/mc-queen' },
                { title: 'NEW BALANCE', to: '/giay/new-balance' },
                { title: 'ASICS', to: '/giay/asics-onitsuka' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faAngleRight} />,
        title: 'ÁO',
        to: '/shop',
        subItems: {
            title: 'ÁO',
            data: [
                { title: 'T-SHIRT' },
                { title: 'SƠ MI' },
                { title: 'ÁO KHOÁC' },
                { title: 'POLO' },
                { title: 'SWEATER' },
                { title: 'HOODIE' },
                { title: 'JACKET    ' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faAngleRight} />,
        title: 'BEYOURSELF',
        to: '/shop',
        subItems: {
            title: 'BEYOURSELF',
            data: [
                { title: 'T-SHIRT' },
                { title: 'POLO' },
                { title: 'QUẦN' },
                { title: 'HOODIE' },
                { title: 'VARSITY' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faAngleRight} />,
        title: 'DÉP',
        subItems: {
            title: 'DÉP',
            data: [{ title: 'ADIDAS' }, { title: 'NIKE' }, { title: 'NEW BALANCE' }, { title: 'MLB' }],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faAngleRight} />,
        title: 'YÊU THÍCH',
        to: '/favorites',
    },
];

function MenuNavBar() {
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([{ data: MENU_NAVBAR }]);
    const currentMenu = history[history.length - 1];

    useEffect(() => {
        //Open Overlay
        if (showMenuMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showMenuMobile]);

    const toggleMenuMobile = () => {
        if (!showMenuMobile) {
            setShowMenuMobile(!showMenuMobile);
            setHistory((prev) => prev.slice(0, 1));
            setTimeout(() => setIsOpen(true), 0);
        } else {
            setIsOpen(false);
            setTimeout(() => setShowMenuMobile(false), 300);
        }
    };

    const handleCloseMenu = () => {
        setShowMenuMobile(false);
    };

    const handleOpenSubMenu = (title) => {
        const foundItem = currentMenu.data.find((item) => item.title === title);

        if (foundItem && foundItem.subItems) {
            // Nếu muốn mở sub menu thì push vào history
            setHistory((prev) => [...prev, foundItem.subItems]);
        } else {
            console.log('Không có subItems cho menu này.');
        }
    };

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            return (
                <MenuItemsNavBar
                    key={index}
                    data={item}
                    onClick={handleCloseMenu}
                    onIconClick={() => handleOpenSubMenu(item.title)}
                />
            );
        });
    };
    return (
        <>
            <button onClick={toggleMenuMobile} className={cx('header__menu-mobile-tablet')}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {showMenuMobile && (
                <div className={cx('menu-mobile-tablet', { 'open-menu': isOpen })} onClick={toggleMenuMobile}>
                    <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                        {/* Logo */}
                        <div className={cx('menu-mobile-tablet__header')}>
                            <div className={cx('menu-mobile-tablet__header-logo')}>
                                <img
                                    className={cx('menu-mobile-tablet__header-logo-img')}
                                    src={images.logo}
                                    alt="logo"
                                />
                            </div>
                        </div>

                        {/* Search */}
                        <Search inline />

                        {/*OnBack*/}
                        {history.length > 1 && (
                            <Header
                                title={currentMenu.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}

                        {/* Menu list */}
                        <div className={cx('main')}>{renderItems()}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuNavBar;
