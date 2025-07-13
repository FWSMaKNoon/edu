import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Favorites.module.scss';

const cx = classNames.bind(styles);

function Favorites() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const favIds = JSON.parse(localStorage.getItem('favorites')) || [];

        fetch(`https://6872aaf6c75558e27352747b.mockapi.io/api/products`)
            .then((res) => res.json())
            .then((data) => {
                const favProducts = data.filter((item) => favIds.includes(item.id));
                setProducts(favProducts);
            });
    }, []);

    const handleRemoveFavorite = (id) => {
        const favIds = JSON.parse(localStorage.getItem('favorites')) || [];
        const newFavs = favIds.filter((fid) => fid !== id);
        localStorage.setItem('favorites', JSON.stringify(newFavs));

        setProducts(products.filter((item) => item.id !== id));
        toast.success('Đã xóa khỏi yêu thích!');
    };

    return (
        <div className={cx('app_container')}>
            <div className="grid wide">
                <h2>🖤 Sản phẩm bạn yêu thích</h2>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col l-3 m-4 c-6">
                            <div className={cx('section-product-item')}>
                                <Link to={`/detail/${product.id}`}>
                                    <div
                                        className={cx('section-product-item__img')}
                                        style={{ backgroundImage: `url(${product.image})` }}
                                    ></div>
                                    <div className={cx('section-product-item__info')}>
                                        <div className={cx('section-product-item__name')}>{product.title}</div>
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
                                <button
                                    className={cx('remove-fav-btn')}
                                    onClick={() => handleRemoveFavorite(product.id)}
                                >
                                    ❌ Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && <p>Hiện chưa có sản phẩm yêu thích nào.</p>}
                </div>
            </div>
        </div>
    );
}

export default Favorites;
