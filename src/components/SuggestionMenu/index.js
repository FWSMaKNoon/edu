import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { getSuggestions } from '~/services/suggestionService';
import Button from '~/components/Button';
import styles from './SuggestionMenu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SuggestionMenu() {
    const [visible, setVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const data = await getSuggestions();
        setSuggestions(data);
        setVisible(true);
        setLoading(false);
    };

    return (
        <Tippy
            visible={visible}
            interactive
            onClickOutside={() => setVisible(false)}
            placement="bottom-end"
            popperOptions={{
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: [], // Cấm không được flip sang chỗ khác
                        },
                    },
                ],
            }}
            render={(attrs) => (
                <div className={cx('suggestion-wrapper')} {...attrs}>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => <div key={index} className={cx('skeleton')} />)
                    ) : suggestions.length > 0 ? (
                        suggestions.map((item) => (
                            <div key={item.id} className={cx('suggestion-item')}>
                                <img src={item.image} alt={item.name} />
                                <span>{item.title}</span>
                            </div>
                        ))
                    ) : (
                        <span>Không có gợi ý nào.</span>
                    )}
                </div>
            )}
        >
            <div className={cx('suggestion-btn-wrapper')}>
                <Button className={cx('btn')} onClick={handleClick}>
                    {loading ? 'Đang tải...' : 'Gợi ý sản phẩm phù hợp'}
                </Button>
            </div>
        </Tippy>
    );
}

export default SuggestionMenu;
