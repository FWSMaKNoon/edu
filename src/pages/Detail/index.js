import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addFavorite, removeFavorite, isFavorite } from '~/ultis/favoriteUtils';

import styles from './Detail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import { HeartIcon } from '~/components/Layout/components/Icons';

const cx = classNames.bind(styles);

function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [reload, setReload] = useState(false); // trigger re-render fav icon

    const handleAddFavorite = () => {
        const favIds = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favIds.includes(product.id)) {
            toast.info('Sản phẩm đã có trong yêu thích!');
            return;
        }

        favIds.push(product.id);
        localStorage.setItem('favorites', JSON.stringify(favIds));

        toast.success('Đã thêm vào yêu thích!');
    };

    const handleSuggestionClick = () => {
        // Giả lập gọi API gợi ý
        const id = '1';
        fetch(`https://6872aaf6c75558e27352747b.mockapi.io/api/suggestions/${id}`)
            .then((res) => res.json())
            .then((data) => setSuggestions([data]))
            .catch((err) => console.error('Lỗi khi lấy gợi ý:', err));
    };

    useEffect(() => {
        fetch(`https://6872aaf6c75558e27352747b.mockapi.io/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
                if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
            });
    }, [id]);

    if (!product) return <p>Loading...</p>;
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
                                        Detail
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Detail */}
            <div className={cx('product__detail')}>
                <div className="grid wide">
                    <div className="row">
                        <div className={cx('col', 'info-detail')}>
                            <div className={cx('product-img')}>
                                <div
                                    className={cx('main-img')}
                                    style={{ backgroundImage: `url(${product?.image})` }}
                                ></div>
                            </div>

                            <div className={cx('product-info')}>
                                <h2 className={cx('title')}>{product?.title}</h2>
                                <span className={cx('price')}>{product?.price.toLocaleString('vi-VN')}đ</span>
                                <div className={cx('product-long-desc')}>
                                    <h3>Mô tả chi tiết</h3>
                                    <p>{product?.shortDesc}</p>
                                </div>
                                {product?.sizes?.length > 0 && (
                                    <div className={cx('size-selection')}>
                                        <p>Size</p>
                                        <div className={cx('size-options')}>
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    className={cx('size-item', {
                                                        selected: selectedSize === size,
                                                    })}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color selection */}
                                {product.colors?.length > 0 && (
                                    <div className={cx('color-selection')}>
                                        <p>Chọn màu</p>
                                        <div className={cx('color-options')}>
                                            {product.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    className={cx('color-item', {
                                                        selected: selectedColor === color,
                                                    })}
                                                    onClick={() => setSelectedColor(color)}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className={cx('btn')}>
                                    <button className={cx('btn-buy')}>Thêm vào giỏ</button>

                                    {/* Nút yêu thích */}
                                    <button
                                        className={cx('fav-btn', { active: isFavorite(product.id) })}
                                        onClick={() => {
                                            if (isFavorite(product.id)) {
                                                removeFavorite(product.id);
                                                toast.success('Đã bỏ khỏi yêu thích!');
                                            } else {
                                                addFavorite(product.id);
                                                toast.success('Đã thêm vào yêu thích!');
                                            }
                                            setReload(!reload);
                                        }}
                                    >
                                        <HeartIcon />
                                    </button>
                                </div>
                                <Link to={`/shop`} className={cx('btn-buy')}>
                                    Qua về cửa hàng
                                </Link>

                                <div className={cx('product-policy')}>
                                    <p>Nhận hàng trong 24-72h</p>
                                    <p>Cam kết hình ảnh sản phẩm 100% Shop tự chụp</p>
                                </div>

                                <Button onClick={handleSuggestionClick} className={cx('btn-suggestion')}>
                                    💡 Gợi ý sản phẩm phù hợp
                                </Button>
                                {suggestions.length > 0 && (
                                    <div className={cx('suggestion-section')}>
                                        <h3>🎯 Gợi ý dành cho bạn</h3>
                                        <div className={cx('suggestion-list')}>
                                            {suggestions.map((item) => (
                                                <div key={item.id} className={cx('suggestion-item')}>
                                                    <img src={item.image} alt={item.title} />
                                                    <p className={cx('title')}>{item.title}</p>
                                                    <p className={cx('price')}>{item.price.toLocaleString('vi-VN')}đ</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
