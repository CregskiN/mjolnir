import React, { useState, useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';

import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  // index?: number;
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;

  const context = useContext(MenuContext);
  const opendSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? opendSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toogle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toogle);
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
        onClick: handleClick,
      }
      : {};

  const mouseEvents =
    context.mode !== 'vertical'
      ? {
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouse(e, true);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouse(e, false);
        },
      }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('mjolnir-submenu', {
      'menu-opened': menuOpen === true,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error('Warning: SubMenu has a child whitch is not MenuItem');
      }
    });
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
      >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li className={classes} key={index} {...mouseEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="arrow-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
