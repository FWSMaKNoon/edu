import classNames from 'classnames/bind';
import styles from './ProductDetailModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProductDetailModal({ data, onClose }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal__overlay')} onClick={onClose}></div>
            <div className={cx('modal__content')}>
                <button className={cx('modal__close')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className={cx('modal__body')}>
                    <img src={data.image} alt={data.title} className={cx('modal__img')} />
                    <h2 className={cx('modal__title')}>{data.title}</h2>
                    <p className={cx('modal__desc')}>{data.description}</p>
                    <div className={cx('modal__price')}>
                        Giá: <strong>{data.price.toLocaleString('vi-VN')}₫</strong>
                    </div>
                    <div className={cx('modal__rating')}>
                        Đánh giá: <span>⭐ {data.rating || 'Chưa có'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;
