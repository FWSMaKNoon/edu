import classNames from 'classnames/bind';

import styles from './MenuNavBar.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItemsNavBar({ data, onClick, onIconClick }) {
    return (
        <div className={cx('parent-item')}>
            <div className={cx('menu-mobile-tablet__item-link')}>
                {data.to ? (
                    <Button to={data.to} onClick={onClick} className={cx('menu-mobile-tablet__item-title')}>
                        {data.title}
                    </Button>
                ) : (
                    <span className={cx('menu-mobile-tablet__item-title')}>{data.title}</span>
                )}

                {data.icon && (
                    <span className={cx('menu-mobile-tablet__item-icon')} onClick={onIconClick}>
                        {data.icon}
                    </span>
                )}
            </div>
        </div>
    );
}

export default MenuItemsNavBar;
