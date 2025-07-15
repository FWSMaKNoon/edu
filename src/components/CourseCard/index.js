import classNames from 'classnames/bind';
import styles from './CourseCard.module.scss';
import { HeartIcon } from '~/layouts/components/Icons';

const cx = classNames.bind(styles);

function CourseCard({ course, onOpenDetail, onToggleFavorite, isFavorite, showFavorite = true }) {
    return (
        <div className={cx('course-card')}>
            <img className={cx('course-img')} src={course.image} alt={course.title} />
            <div className={cx('course-info')}>
                <h4 className={cx('course-title')}>{course.title}</h4>
                {course.price !== undefined && (
                    <p className={cx('course-price', { free: course.price === 0 })}>
                        <span>{course.price === 0 ? 'Miễn phí' : course.price.toLocaleString() + 'đ'}</span>
                    </p>
                )}
                <div className={cx('course-btn')}>
                    <span>
                        <button onClick={() => onOpenDetail?.(course)} className={cx('btn')}>
                            Xem chi tiết
                        </button>
                    </span>
                    {showFavorite && (
                        <span
                            onClick={() => onToggleFavorite?.(course.id)}
                            className={cx('favorite-icon', { active: isFavorite })}
                        >
                            <HeartIcon />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
