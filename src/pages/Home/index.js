import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import images from '~/assets/imgs';
import ProductItem from '~/components/ProductItem';
import Image from '~/components/Images';
import ProductDetailModal from '~/components/ProductDetailModal';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('https://6872aaf6c75558e27352747b.mockapi.io/api/products')
            .then((res) => res.json())
            .then((res) => {
                setProduct(res);
            });
    }, []);

    return (
        <div className={cx('app_container')}>
            <section className={cx('sectione__banner-wrapper')}></section>
            <div className={cx('app__content')}>
                {/* Section NEW ARRIVALS */}
                <section className={cx('section__home-1')}>
                    <div className={cx('grid', 'wide')}>
                        <div className={cx('row')}>
                            <div className={cx('l-12', 'm-12', 'c-12')}>
                                <div className={cx('title-1')}>
                                    <div className={cx('bg')}></div>
                                    <p href="./shop.html" className={cx('title-1-link')}>
                                        NEW ARRIVALS
                                    </p>
                                    <div className={cx('bg')}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('grid', 'wide')}>
                        <div className={cx('row')}>
                            <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                                <section className={cx('section-product')}>
                                    <div className={cx('row')}>
                                        {products.map((product, index) => (
                                            <div key={index} className={cx('col', 'l-2-4', 'm-3', 'c-6')}>
                                                <div
                                                    onClick={() => setSelectedProduct(product)}
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
                                                        <div className={cx('section-product-item__price')}>
                                                            <span className={cx('section-product-item__price-curent')}>
                                                                {product.price.toLocaleString('vi-VN')}₫
                                                            </span>
                                                            <span className={cx('section-product-item__price-old')}>
                                                                {product.price.toLocaleString('vi-VN')}₫
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Các Section còn lại */}
                {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <section key={num} className={cx(`section__home-${num}`)}>
                        <div className={cx('grid', 'wide')}>
                            <div className={cx('title-product')}>
                                <a href="./shop.html" className={cx('title-product-link')}>
                                    {getTitle(num)}
                                </a>
                                <ul className={cx('title-product-menu')}>
                                    {[
                                        'NIKE',
                                        'ADIDAS',
                                        'MLB',
                                        'GUCCI',
                                        'BALENCIAGA',
                                        'VANS',
                                        'BE YOURSELF',
                                        'KO',
                                        'MC QUEEN',
                                    ].map((brand, i) => (
                                        <li key={i} className={cx('title-product-menu-item')}>
                                            <a href="./shop.html" className={cx('title-product-menu-link')}>
                                                {brand}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={cx('row')}>
                                <div className={cx('col', 'l-9', 'm-12', 'c-12')}>
                                    <div className={cx('section__home-2-product')}>
                                        <div className={cx('row', 'product-list')}>
                                            {products.slice(0, 8).map((product) => (
                                                <ProductItem
                                                    key={product.id}
                                                    data={product}
                                                    onClick={() => setSelectedProduct(product)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('col', 'l-3', 'm-0', 'c-0')}>
                                    <div className={cx('section-product-banner')}>
                                        <div className={cx('section-product-banner-img')}>
                                            <Image src={images.banner_img} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {selectedProduct && <ProductDetailModal data={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </div>
    );
}

function getTitle(sectionNumber) {
    switch (sectionNumber) {
        case 2:
            return 'SẢN PHẨM HOT';
        case 3:
            return 'SẢN PHẨM BÁN CHẠY';
        case 4:
            return 'TOP GIẢM GIÁ';
        case 5:
            return 'GIÀY';
        case 6:
            return 'ÁO';
        case 7:
            return 'BEYOURSELF';
        case 8:
            return 'DÉP';
        default:
            return '';
    }
}

export default Home;
