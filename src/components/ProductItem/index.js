import classNames from 'classnames/bind';
import styles from '~/pages/Home/Home.module.scss';

const cx = classNames.bind(styles);
function ProductItem({ data, onClick }) {
    return (
        <div className={cx('col', 'l-3', 'm-3', 'c-6')}>
            <div onClick={onClick} className={cx('section-product-item')}>
                <div
                    className={cx('section-product-item__img')}
                    style={{ backgroundImage: `url(${data.image})` }}
                ></div>
                <div className={cx('section-product-item__info')}>
                    <div className={cx('section-product-item__name')}>{data.title}</div>
                    <div className={cx('section__short-desc')}>{data.longDesc}</div>
                    <div className={cx('section-product-item__price')}>
                        <span className={cx('section-product-item__price-curent')}>
                            {data.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className={cx('section-product-item__price-old')}>
                            {data.price.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
