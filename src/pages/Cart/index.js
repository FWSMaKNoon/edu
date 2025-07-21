import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Load cart items from localStorage
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);

        // Calculate total price
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    return (
        <div className={cx('cart-wrapper')}>
            <div className={cx('cart_container')}>
                <div className={cx('grid wide')}>
                    <h2 className={cx('cart-title')}>Giỏ hàng của bạn</h2>
                    <div className={cx('cart-list', 'row', 'header')}>
                        <div className={cx('col', 'l-4')}>
                            <h4 className={cx('cart-info')}>Khoá học</h4>
                        </div>
                        <div className={cx('col', 'l-4')}>
                            <h4 className={cx('cart-info')}>Tên khoá học</h4>
                        </div>
                        <div className={cx('col', 'l-4')}>
                            <h4 className={cx('cart-info')}>Giá</h4>
                        </div>
                    </div>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className={cx('cart-item', 'row')}>
                                <div className={cx('col', 'l-4')}>
                                    <img src={item.image} alt={item.title} className={cx('cart-image')} />
                                </div>
                                <div className={cx('col', 'l-4')}>
                                    <div className={cx('cart-info')}>{item.title}</div>
                                </div>
                                <div className={cx('col', 'l-4')}>
                                    <div className={cx('cart-info')}>{item.price.toLocaleString()}đ</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={cx('empty-cart')}>Giỏ hàng của bạn trống.</p>
                    )}
                    {cartItems.length > 0 && (
                        <div className={cx('total-price')}>
                            <p>Tổng giá trị giỏ hàng: {totalPrice.toLocaleString()}đ</p>
                        </div>
                    )}
                    <div className={cx('total-price')}>
                        <Button className={cx('btn-checkout')}>Thanh toán</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
