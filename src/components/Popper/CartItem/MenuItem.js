import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './CartItem.module.scss';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const navigate = useNavigate();
    return (
        <li key={data.id} className={cx('header__cart-item')} onClick={() => navigate('/cart')}>
            <div className={cx('header__cart-detail')}>
                <Button href="/cart" className={cx('header__cart-img-link')}>
                    <img className={cx('header__cart-img')} src={data.image} alt={data.name} />
                </Button>

                <div className={cx('header__cart-info')}>
                    <Button href="/cart" className={cx('header__cart-info-link')}>
                        {data.name}
                    </Button>
                    <div className={cx('header__cart-info-price')}>{data.price.toLocaleString()}đ</div>
                    <div className={cx('header__cart-info-quantity')}>
                        <p>SL: </p>
                        <input defaultValue={data.quantity} type="number" className={cx('input__quantity')} />
                    </div>
                </div>

                <div className={cx('header__cart-close')}>
                    <Button className={cx('header__cart-close-link')}>
                        <FontAwesomeIcon className={cx('header__cart-close-icon')} icon={faXmark} />
                    </Button>
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
