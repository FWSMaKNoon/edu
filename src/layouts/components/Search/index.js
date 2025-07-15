import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListItem from '~/components/ListItem';
import Tippy from '@tippyjs/react/headless';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ClearIcon } from '../Icons';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const location = useLocation();
    const [searchResult, setSearchResult] = useState([]);

    //Loading delay
    useEffect(() => {
        if (searchValue.trim() === '') {
            setSearchResult([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        //Filter product
        const timer = setTimeout(() => {
            fetch('https://687557bc814c0dfa65384fe2.mockapi.io/api/Courses')
                .then((res) => res.json())
                .then((res) => {
                    const filtered = res.filter((product) =>
                        product.title.toLowerCase().includes(searchValue.toLowerCase()),
                    );
                    setSearchResult(filtered);
                    setLoading(false);
                });
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue]);

    //Update
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q') || '';
        setSearchValue(query);
    }, [location.search]);

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <Tippy
            interactive
            placement="bottom-start"
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
            <div className={cx('search')}>
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    ref={inputRef}
                    value={searchValue}
                    className={cx('search-input')}
                    spellCheck={false}
                    placeholder="Bạn muốn tìm gì?"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={() => {
                            inputRef.current.focus();
                            setSearchValue('');
                        }}
                    >
                        <ClearIcon />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            </div>
        </Tippy>
    );
}

export default Search;
