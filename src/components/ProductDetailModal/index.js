import classNames from 'classnames/bind';
import styles from './ProductDetailModal.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { addFavorite, removeFavorite, isFavorite } from '~/ultis/favoriteUtils';

import { HeartIcon } from '~/components/Layout/components/Icons';

const cx = classNames.bind(styles);

function ProductDetailModal({ data, onClose }) {
    const [reload, setReload] = useState(false); // trigger re-render fav icon
    useEffect(() => {
        //Open Overlay
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <div className={cx('modal')}>
            <div className={cx('modal__overlay')} onClick={onClose}></div>
            <div className={cx('modal__content')}>
                <button className={cx('modal__close', 'tx')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className={cx('modal__body')}>
                    <div style={{ backgroundImage: `url(${data.image})` }} className={cx('modal__img')} />
                    <h2 className={cx('modal__title')}>{data.title}</h2>
                    <p className={cx('modal__desc')}>{data.longDesc}</p>
                    <div className={cx('modal__price')}>
                        Giá: <strong>{data.price.toLocaleString('vi-VN')}đ</strong>
                    </div>
                    <div className={cx('inline')}>
                        <div className={cx('modal__rating')}>
                            Đánh giá: <span>⭐ {data.rating || 'Chưa có'}</span>
                        </div>
                        {/* Nút yêu thích */}
                        <button
                            className={cx('fav-btn', { active: isFavorite(data.id) })}
                            onClick={() => {
                                if (isFavorite(data.id)) {
                                    removeFavorite(data.id);
                                    toast.success('Đã bỏ khỏi yêu thích!');
                                } else {
                                    addFavorite(data.id);
                                    toast.success('Đã thêm vào yêu thích!');
                                }
                                setReload(!reload);
                            }}
                        >
                            <HeartIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
