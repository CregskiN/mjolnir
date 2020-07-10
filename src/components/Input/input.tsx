import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react';
import classNames from 'classnames';

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    /** input框的大小 */
    size?: InputSize;
    /** 在右侧添加悬浮图标，用于提示 */
    icon?: IconProp;
    /** 输入框内前缀，用于配置一些固定的组合 */
    prepand?: string | ReactElement;
    /** 输入框后缀，用于配制一些固定的组合 */
    append?: string | ReactElement;
    /** 输入事件 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Input 常见且有特殊功能的输入框，是最基础表单域的包装
 * ```js
 * import { Input } from 'mjolnir';
 * ```
 * 支持 HTMLInputElement 所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepand,
        append,
        style,
        ...restProps
    } = props;


    const inputWrapperClasses = classNames('mjolnir-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepand || append,
        'input-group-append': !!append,
        'input-group-prepand': !!prepand,
    })

    function fixControlledValue(value: any) {
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }

    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value)
    }

    return (
        <div className={inputWrapperClasses} style={style}>
            {prepand && <div className="mjolnir-input-group-prepend">{prepand}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
            <input
                className="mjolnir-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="mjolnir-input-group-append">{append}</div>}
        </div>
    )
}

Input.defaultProps = {
    size: 'sm',
    disabled: false,
}

export default Input;