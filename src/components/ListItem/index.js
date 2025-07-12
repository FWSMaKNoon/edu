import classNames from 'classnames/bind';
import styles from './ListItem.module.scss';

import Image from '../Images';

const cx = classNames.bind(styles);

function ListItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('img')} src={data.image} alt={data.mainImage} />
            <p className={cx('name')}>{data.title}</p>
        </div>
    );
}

export default ListItem;
