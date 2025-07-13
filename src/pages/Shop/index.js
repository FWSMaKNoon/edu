import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Shop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState(['Tất cả']);

    const handleFilterPrices = (label) => {
        setSelectedPrices((prev) => {
            // Nếu chọn "Tất cả", clear các mục khác
            if (label === 'Tất cả') {
                return ['Tất cả'];
            }

            // Nếu đang có "Tất cả" và chọn mục khác, bỏ "Tất cả"
            let updated = prev.includes('Tất cả') ? prev.filter((item) => item !== 'Tất cả') : [...prev];

            // Thêm hoặc gỡ bỏ mục đang click
            if (updated.includes(label)) {
                updated = updated.filter((item) => item !== label);
            } else {
                updated.push(label);
            }

            // Nếu không chọn gì, mặc định về "Tất cả"
            return updated.length === 0 ? ['Tất cả'] : updated;
        });
    };

    const filterProductsByPrice = (products) => {
        if (selectedPrices.includes('Tất cả')) return products;

        return products.filter((product) => {
            return selectedPrices.some((label) => {
                const price = product.price;

                if (label === 'Giá dưới 500.000đ') return price < 500000;
                if (label === '500.000đ - 1.000.000đ') return price >= 500000 && price < 1000000;
                if (label === '1.000.000đ - 1.500.000đ') return price >= 1000000 && price < 1500000;
                if (label === '1.500.000đ - 2.000.000đ') return price >= 1500000 && price < 2000000;
                if (label === 'Trên 2.000.000đ') return price >= 2000000;

                return false;
            });
        });
    };
    useEffect(() => {
        fetch('https://6872aaf6c75558e27352747b.mockapi.io/api/products')
            .then((res) => res.json())
            .then((res) => setProducts(res));
    }, []);

    return (
        <div className={cx('app_container')}>
            {/* Breadcrumb */}
            <div className={cx('bread-crumb')}>
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12">
                            <ul className={cx('bread-crumb__list')}>
                                <li className={cx('bread-crumb__item')}>
                                    <a href="/" className={cx('bread-crumb__item-link')}>
                                        Home
                                    </a>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </li>
                                <li className={cx('bread-crumb__item')}>
                                    <a href="/shop" className={cx('bread-crumb__item-link')}>
                                        Danh mục sản phẩm
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <div className={cx('product__list')}>
                <div className="grid wide">
                    <div className="row app_content">
                        {/* Sidebar */}
                        <div className="col l-3 m-0 c-0">
                            {/* Danh mục sản phẩm */}
                            <nav className={cx('category')}>
                                <div className={cx('category__heading')}>
                                    <h3 className={cx('category__heading-text')}>DANH MỤC SẢN PHẨM</h3>
                                </div>
                                <ul className={cx('category__list')}>
                                    {['GIÀY', 'ÁO', 'BEYOURSELF', 'DÉP'].map((item, index) => (
                                        <li key={index} className={cx('category__item')}>
                                            <div className={cx('child__item')}>
                                                <a href="/" className={cx('category__item-link')}>
                                                    {item}
                                                </a>
                                            </div>
                                            <div className={cx('category__item-icon')}>
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Giá sản phẩm */}
                            <nav className={cx('category')}>
                                <div className={cx('category__heading')}>
                                    <h3 className={cx('category__heading-text')}>GIÁ SẢN PHẨM</h3>
                                </div>
                                <ul className={cx('category__list')}>
                                    {[
                                        'Tất cả',
                                        'Giá dưới 500.000đ',
                                        '500.000đ - 1.000.000đ',
                                        '1.000.000đ - 1.500.000đ',
                                        '1.500.000đ - 2.000.000đ',
                                        'Trên 2.000.000đ',
                                    ].map((label, index) => (
                                        <li key={index} className={cx('category__item')}>
                                            <div className={cx('categort__item-input')}>
                                                <input
                                                    type="checkbox"
                                                    className={cx('input-checkbox')}
                                                    checked={selectedPrices.includes(label)}
                                                    onChange={() => handleFilterPrices(label)}
                                                />
                                                <span className={cx('categort__item-text')}>{label}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Thương hiệu */}
                            <nav className={cx('category')}>
                                <div className={cx('category__heading')}>
                                    <h3 className={cx('category__heading-text')}>THƯƠNG HIỆU</h3>
                                </div>
                                <ul className={cx('category__list')}>
                                    {['Tất cả', 'KO'].map((brand, index) => (
                                        <li key={index} className={cx('category__item')}>
                                            <div className={cx('categort__item-input')}>
                                                <input
                                                    type="checkbox"
                                                    className={cx('input-checkbox')}
                                                    defaultChecked={index === 0}
                                                />
                                                <span className={cx('categort__item-text')}>{brand}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="col l-9 c-12">
                            {/* Bộ lọc */}
                            <div className={cx('home-filter')}>
                                <div className={cx('section-filter__label')}>Danh mục sản phẩm</div>
                                <div className={cx('section-input')}>
                                    <select className={cx('select-input')}>
                                        {[
                                            'Mặc định',
                                            'A -> Z',
                                            'Z -> A',
                                            'Giá tăng dần',
                                            'Giá giảm dần',
                                            'Hàng mới nhất',
                                            'Hàng cũ nhất',
                                        ].map((opt, index) => (
                                            <option key={index} value={index + 1}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Danh sách sản phẩm */}
                            <div className={cx('home-product')}>
                                <div className="row">
                                    {filterProductsByPrice(products).map((product) => (
                                        <div key={product.id} className="col l-3 c-6 m-4">
                                            <Link
                                                to={`/detail/products/${product.id}`}
                                                className={cx('section-product-item')}
                                            >
                                                <div
                                                    className={cx('section-product-item__img')}
                                                    style={{ backgroundImage: `url(${product.image})` }}
                                                ></div>
                                                <div className={cx('section-product-item__info')}>
                                                    <div className={cx('section-product-item__name')}>
                                                        {product.title}
                                                    </div>
                                                    <div className={cx('section__short-desc')}>{product.longDesc}</div>
                                                    <div className={cx('section-product-item__price')}>
                                                        <span className={cx('section-product-item__price-curent')}>
                                                            {product.price.toLocaleString('vi-VN')}đ
                                                        </span>
                                                        <span className={cx('section-product-item__price-old')}>
                                                            {product.price.toLocaleString('vi-VN')}đ
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phân trang */}
                            <div className={cx('pagination')}>
                                <ul className={cx('mypagination')}>
                                    {[1, 2, 3, 4, 5].map((page) => (
                                        <li
                                            key={page}
                                            className={cx('mypagination__item', {
                                                'mypagination__item-active': page === 1,
                                            })}
                                        >
                                            <a href="/" className={cx('mypagination-link')}>
                                                {page}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Footer content */}
                            <div className={cx('content-footer')}>Nội dung của loại sản phẩm</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
