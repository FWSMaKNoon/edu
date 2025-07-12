import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { setSuggestions } from '~/api/suggestions';
import ListItem from '~/components/ListItem';
import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Search() {
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();
    const location = useLocation();

    const [searchResult, setSearchResult] = useState([]);

    //Fetch List Item
    useEffect(() => {
        fetch('https://6872aaf6c75558e27352747b.mockapi.io/api/products')
            .then((res) => res.json())
            .then((res) => {
                setProducts(res);
            });
    }, []);

    //Filter product
    useEffect(() => {
        const filtered = products.filter(
            (product) =>
                product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.category.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setSearchResult(filtered);
    }, [searchValue, products]);

    //Update
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q') || '';
        setSearchValue(query);
    }, [location.search]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const getSuggestions = () => {
        const userId = 1;
        setSuggestions(userId).then((data) => {
            setSuggestions(data);
        });
    };
    return (
        <Tippy
            interactive
            placement="bottom"
            visible={showResult && searchValue.trim() !== '' && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Kết quả tìm kiếm</h4>
                        {searchResult.map((result) => (
                            <ListItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('header__search', 'hide-on-mobile-tablet')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    className={cx('header__search-input')}
                    spellCheck={false}
                    placeholder="Bạn muốn tìm gì?"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && (
                    <button
                        className={cx('header-search-clear')}
                        onClick={() => {
                            inputRef.current.focus();
                            setSearchValue('');
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <button className={cx('header-search-loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button> */}

                <Button onClick={getSuggestions} primary className={cx('header__search-btn')}>
                    <FontAwesomeIcon className={cx('header__search-btn-icon')} icon={faMagnifyingGlass} />
                </Button>
            </div>
        </Tippy>
    );
}

export default Search;
