import classNames from 'classnames/bind';
import styles from './View.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '~/components/CourseCard';
import ProductDetailModal from '~/components/ProductDetailModal';

const cx = classNames.bind(styles);

function View() {
    const [viewedCourses, setViewedCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCloseDetail = () => {
        setSelectedCourse(null);
    };

    useEffect(() => {
        const viewedIds = JSON.parse(localStorage.getItem('viewedCourses')) || [];

        if (viewedIds.length > 0) {
            axios.get('https://687557bc814c0dfa65384fe2.mockapi.io/api/Courses').then((res) => {
                const courses = res.data;
                const historyCourses = courses.filter((course) => viewedIds.includes(course.id));
                setViewedCourses(historyCourses);
            });
        }
    }, []);

    if (viewedCourses.length === 0) {
        return <p>Bạn chưa xem khoá học nào.</p>;
    }

    return (
        <div className={cx('history-wrapper')}>
            <h3>Lịch sử xem</h3>
            <div className={cx('grid wide')}>
                <div className={cx('row')}>
                    {viewedCourses.map((course) => (
                        <div key={course.id} className={cx('col', 'l-2-4', 'm-6', 'c-6')}>
                            <CourseCard course={course} onOpenDetail={setSelectedCourse} showFavorite={false} />
                        </div>
                    ))}
                </div>
                {selectedCourse && <ProductDetailModal data={selectedCourse} onClose={handleCloseDetail} />}
            </div>
        </div>
    );
}

export default View;
