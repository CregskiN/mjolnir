import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

/**
 * 按钮类型：主要、默认、危险、链接
 */
export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode;
    href?: string;
}

// 此写法 类型为 A 或 B
// type NativeButtonProps = BaseButtonProps | React.ButtonHTMLAttributes<HTMLElement>;
// 此写法 交叉类型，类型为A B的集合
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
// Utility Types 之 Partial<TYPE> 将TYPE的所有属性变为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;


const Button: React.FC<ButtonProps> = (props) => {
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
        'disabled': (btnType === ButtonType.Link) && disabled,

    })

    // 超链接按钮
    if (btnType === ButtonType.Link && href) {
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
    btnType: ButtonType.Default
}

export default Button;