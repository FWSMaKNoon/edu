import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Favorites.module.scss';
import { getFavorites, toggleFavorite } from '~/ultis/favoriteUtils';
import axios from 'axios';
import { HeartIcon } from '~/layouts/components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function FavoritesPage() {
    const [courses, setCourses] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch danh sách khoá học
        axios
            .get('https://687557bc814c0dfa65384fe2.mockapi.io/api/Courses')
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            });

        // Load favorites từ localStorage
        setFavorites(getFavorites());
    }, []);

    const handleToggleFavorite = (id) => {
        const isNowFav = toggleFavorite(id);
        if (isNowFav) {
            toast.success('Đã thêm vào yêu thích ❤️', { autoClose: 2000 });
        } else {
            toast.info('Đã xoá khỏi yêu thích ❤️', { autoClose: 2000 });
        }
        setFavorites(getFavorites());
    };

    const favoriteCourses = courses.filter((course) => favorites.includes(course.id));

    return (
        <div className={cx('favorites_container')}>
            <h2 className={cx('title')}>Khoá học yêu thích</h2>

            <div className={cx('grid wide')}>
                <div className={cx('row')}>
                    {favoriteCourses.length > 0 ? (
                        favoriteCourses.map((course) => (
                            <div key={course.id} className={cx('col', 'l-2-4', 'm-6', 'c-6')}>
                                <div className={cx('course-card')}>
                                    <img className={cx('course-img')} src={course.image} alt={course.title} />
                                    <div className={cx('course-info')}>
                                        <h4 className={cx('course-title')}>{course.title}</h4>
                                        <p
                                            className={cx('course-price', {
                                                free: course.price === 0,
                                            })}
                                        >
                                            <span>
                                                {course.price === 0 ? 'Miễn phí' : course.price.toLocaleString() + 'đ'}
                                            </span>
                                        </p>
                                        <button
                                            className={cx('btn-favorite', {
                                                active: favorites.includes(course.id),
                                            })}
                                            onClick={() => handleToggleFavorite(course.id)}
                                        >
                                            <HeartIcon />
                                            {favorites.includes(course.id) ? ' Bỏ yêu thích' : ' Yêu thích'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={cx('col l-12')}>
                            <p style={{ textAlign: 'center', fontSize: '1.6rem', padding: '40px 0' }}>
                                Bạn chưa thêm khoá học nào vào yêu thích.
                            </p>
                        </div>
                    )}
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

export default FavoritesPage;
