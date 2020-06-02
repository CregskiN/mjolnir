import React, { useState, useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {
        index,
        title,
        className,
        children,
    } = props;
    const [menuOpen, setOpen] = useState(false);
    const context = useContext(MenuContext);

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    });

    let timer: any;
    const handleMouse = (e: React.MouseEvent, toogle: boolean) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setOpen(toogle);
        }, 300);
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};

    const mouseEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {};

    const renderChildren = () => {
        const subMenuClasses = classNames('mjolnir-submenu', {
            'menu-opened': menuOpen === true
        })
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error('Warning: SubMenu has a child whitch is not MenuItem');
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }


    return (
        <li className={classes} key={index} {...mouseEvents}>
            <div className="mjolnir-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;
