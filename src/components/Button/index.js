import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            primary = false,
            disabled = false,
            login = false,
            signin = false,
            medium = false,
            btnCart = false,
            children,
            className,
            onClick,
            leftIcon,
            rightIcon,
            ...passProps
        },
        ref,
    ) => {
        let Comp = 'button';
        const props = {
            onClick,
            href,
            ...passProps,
        };

        if (disabled) {
            delete props.href;
            delete props.to;
            props.onClick = (e) => e.preventDefault();
        }

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            login,
            disabled,
            signin,
            medium,
            btnCart,
        });

        return (
            <Comp ref={ref} className={classes} {...props}>
                {leftIcon && <span className={cx('btn-icon')}>{leftIcon}</span>}
                {children}
                {rightIcon && <span className={cx('btn-icon')}>{rightIcon}</span>}
            </Comp>
        );
    },
);

export default Button;
