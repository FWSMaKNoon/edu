import { AuthContext } from '~/contexts/AuthContext';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetailModal from '~/components/ProductDetailModal';
import { addFavorite, removeFavorite, getFavorites } from '~/ultis/favoriteUtils';
import SuggestionMenu from '~/components/SuggestionMenu';
import CourseCard from '~/components/CourseCard';

const cx = classNames.bind(styles);

function Home() {
    const { currentUser } = useContext(AuthContext);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceFilter, setPriceFilter] = useState('all');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios
            .get('https://687557bc814c0dfa65384fe2.mockapi.io/api/Courses')
            .then((res) => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
    }, []);

    const handlePriceFilterChange = (e) => {
        setPriceFilter(e.target.value);
    };

    const handleToggleFavorite = (id) => {
        const currentFavs = getFavorites();
        const isFav = currentFavs.includes(id);

        if (isFav) {
            removeFavorite(id);
            toast.info('Đã xóa khỏi yêu thích ❤️', { autoClose: 2000 });
        } else {
            addFavorite(id);
            toast.success('Đã thêm vào yêu thích ❤️', { autoClose: 2000 });
        }

        // Update state từ localStorage mới nhất
        setFavorites(getFavorites());
    };

    useEffect(() => {
        // Lấy favorites từ localStorage khi load trang
        setFavorites(getFavorites());
    }, []);

    const handleOpenDetail = (course) => {
        // Thêm vào danh sách đã xem
        const viewed = JSON.parse(localStorage.getItem('viewedCourses')) || [];
        if (!viewed.includes(course.id)) {
            viewed.push(course.id);
            localStorage.setItem('viewedCourses', JSON.stringify(viewed));
        }

        setSelectedCourse(course);
    };

    const handleCloseDetail = () => {
        setSelectedCourse(null);
    };

    const filteredCourses = courses.filter((course) => {
        const price = course.price;
        switch (priceFilter) {
            case 'free':
                return price === 0;
            case 'under200':
                return price > 0 && price < 200000;
            case '200to500':
                return price >= 200000 && price <= 500000;
            case 'above500':
                return price > 500000;
            default:
                return true;
        }
    });

    if (loading) return <p>Đang tải...</p>;

    return (
        <div className={cx('app_container')}>
            <div className={cx('grid wide')}>
                {/* Bộ lọc */}
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('filter')}>
                            <span className={cx('filter-label')}>Lọc giá:</span>
                            <select
                                className={cx('select-input')}
                                value={priceFilter}
                                onChange={handlePriceFilterChange}
                            >
                                <option value="all">Tất cả</option>
                                <option value="free">Miễn phí</option>
                                <option value="under200">Dưới 200.000đ</option>
                                <option value="200to500">200.000đ - 500.000đ</option>
                                <option value="above500">Trên 500.000đ</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Danh sách khóa học */}
                <div className={cx('row')}>
                    {filteredCourses.map((course) => (
                        <div key={course.id} className={cx('col', 'l-2-4', 'm-6', 'c-6')}>
                            <CourseCard
                                course={course}
                                onOpenDetail={handleOpenDetail}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={favorites.includes(course.id)}
                            />
                        </div>
                    ))}

                    {filteredCourses.length === 0 && (
                        <div className={cx('col l-12')}>
                            <p style={{ textAlign: 'center', fontSize: '1.6rem', padding: '40px 0' }}>
                                Không tìm thấy khoá học phù hợp.
                            </p>
                        </div>
                    )}
                </div>

                {selectedCourse && (
                    <ProductDetailModal
                        data={selectedCourse}
                        onClose={handleCloseDetail}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
            </div>

            {/* Toast hiển thị */}
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
            {currentUser ? (
                <SuggestionMenu />
            ) : (
                <div className={cx('login-prompt')}>
                    <p>Đăng nhập để xem gợi ý</p>
                </div>
            )}
        </div>
    );
}
export default Home;
