import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

/**
 * 按钮类型：主要、默认、危险、链接
 */
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

export interface BaseButtonProps {
    className?: string;
    /** 设置Button的禁用 */
    disabled?: boolean;
    /** 设置Button尺寸 */
    size?: ButtonSize;
    /** 设置Button类型 */
    btnType?: ButtonType;
    children?: React.ReactNode;
    href?: string;
}

// 此写法 类型为 A 或 B
// type NativeButtonProps = BaseButtonProps | React.ButtonHTMLAttributes<HTMLElement>;
// 此写法 交叉类型，类型为A B的集合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// Utility Types 之 Partial<TYPE> 将TYPE的所有属性变为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 这是我们第一个button组件
 * ```js
 * import { Button } from 'mjolnir';
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        disabled,
        size,
        btnType,
        children,
        href,
        ...restProps
    } = props;

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled,
    })

    if (btnType === 'link' && href) {
        // 超链接按钮
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        // 其他按钮
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }

}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;