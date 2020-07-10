import React, { useState, createContext, FC } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
// type SelectCallBack = (selectIndex: number) => void
type SelectCallBack = (selectIndex: string) => void


/**
 * 父组件的props
 */
export interface MenuProps {
    /** 默认的选中item的下标从0开始 */
    defaultIndex?: string;
    /* 最外层div的css */
    className?: string;
    /** 模式，可选垂直和水平 */
    mode?: MenuMode;
    /** 自定义属性 */
    style?: React.CSSProperties;
    /** 选择事件 */
    onSelect?: SelectCallBack;
    /** 默认打开的SubMenu下标 */
    defaultOpenSubMenus?: string[];
}

/**
 * context
 */
interface IMenuContext {
    // index: number;
    index: string;
    onSelect?: SelectCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
    index: '0'
})

/**
 * 以hover触发的多级菜单展示
 * ```js
 * import { Menu, SubMenu, MenuItem } from 'mjolnir';
 * ```
 */
export const Menu: FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus,
    } = props;
    const classes = classNames('mjolnir-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    const [currentActive, setActive] = useState(defaultIndex);

    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: i.toString()
                });
            } else {
                console.error('Warning: Menu has a child witch is not MenuItem component.')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );

}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};

export default Menu;

