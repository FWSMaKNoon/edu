import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './CartItem.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function CartItem({ children, items = [] }) {
    const renderItem = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <Tippy
                interactive={true}
                delay={[100, 500]}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('list-cart')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('custom-cart')}>
                            <ul className={cx('header__cart-list')}>{renderItem()}</ul>
                            <div className={cx('header__cart-foot')}>
                                <div className={cx('header__cart-foot-total')}>
                                    <span className={cx('header__cart-foot-total-text')}>Tổng thanh toán:</span>
                                    <p className={cx('header__cart-foot-total-sum')}>0đ</p>
                                </div>
                                <Button href="https://google.com" btnCart>
                                    Tiến hành thanh toán
                                </Button>
                                <Button href="https://google.com" btnCart>
                                    Đi đến giỏ hàng
                                </Button>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default CartItem;
