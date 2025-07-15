import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailModal.module.scss';
import { Link } from 'react-router-dom';
import { HeartIcon, ClearIcon } from '~/layouts/components/Icons';

const cx = classNames.bind(styles);

function ProductDetailModal({
    data,
    onClose,
    favorites = [], // gán mặc định []
    onToggleFavorite,
}) {
    useEffect(() => {
        // Khi mở modal -> chặn scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!data) return null;

    const isFav = favorites.includes(data.id);

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

                    <Link to="/cart" className={cx('btn-buy')}>
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
