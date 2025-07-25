import { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailModal.module.scss';
import { AuthContext } from '~/contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { HeartIcon, ClearIcon } from '~/layouts/components/Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function ProductDetailModal({
    data,
    onClose,
    favorites = [], // gán mặc định []
    onToggleFavorite,
}) {
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        // Khi mở modal -> chặn scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!data) return null;

    const isFav = favorites.includes(data.id);

    const handleAddToCart = () => {
        if (!currentUser) {
            toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng.');
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const itemIndex = cartItems.findIndex((item) => item.id === data.id);

            if (itemIndex > -1) {
                // Nếu đã có trong giỏ hàng, tăng số lượng
                toast.info('Đã có trong giỏ hàng', { autoClose: 2000 });
            } else {
                // Nếu chưa có, thêm mới
                cartItems.push({ ...data, quantity: 1 });
                toast.success('Đã thêm vào giỏ hàng', { autoClose: 2000 });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    };

    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                <button className={cx('close-btn')} onClick={onClose}>
                    <ClearIcon />
                </button>

                <div className={cx('image-wrapper')}>
                    <img src={data.image} alt={data.title} className={cx('modal-image')} />
                </div>

                <h2 className={cx('modal-title')}>{data.title}</h2>
                <p className={cx('modal-price')}>{data.price === 0 ? 'Miễn phí' : data.price.toLocaleString() + 'đ'}</p>
                <p className={cx('modal-desc')}>{data.fullDesc || 'Không có mô tả.'}</p>

                <div className={cx('modal-actions')}>
                    {/* Nếu có onToggleFavorite thì mới hiện nút */}
                    {onToggleFavorite && (
                        <button
                            className={cx('btn-favorite', { active: isFav })}
                            onClick={() => onToggleFavorite(data.id)}
                        >
                            <HeartIcon />
                            {isFav ? ' Bỏ yêu thích' : ' Yêu thích'}
                        </button>
                    )}

                    <Button onClick={handleAddToCart} className={cx('btn-buy')}>
                        Đăng ký ngay
                    </Button>
                </div>
            </div>
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

export default ProductDetailModal;
