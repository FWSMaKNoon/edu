import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemove = (id) => {
        const updated = cartItems.filter((item) => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cartItems', JSON.stringify(updated));
        toast.success('Đã xoá khỏi giỏ hàng', { autoClose: 2000 });
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={cx('cart-wrapper')}>
            <h2 className={cx('cart-title')}>Giỏ hàng</h2>

            {cartItems.length === 0 ? (
                <p className={cx('empty')}>Giỏ hàng đang trống.</p>
            ) : (
                <div className={cx('cart-list')}>
                    {cartItems.map((item) => (
                        <div key={item.id} className={cx('cart-item')}>
                            <img src={item.image} alt={item.title} className={cx('item-img')} />
                            <div className={cx('item-info')}>
                                <h4>{item.title}</h4>
                                <p>Giá: {item.price === 0 ? 'Miễn phí' : item.price.toLocaleString() + 'đ'}</p>
                                <button className={cx('remove-btn')} onClick={() => handleRemove(item.id)}>
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className={cx('cart-total')}>
                        <strong>Tổng cộng: </strong>
                        {total === 0 ? 'Miễn phí' : total.toLocaleString() + 'đ'}
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default Cart;
