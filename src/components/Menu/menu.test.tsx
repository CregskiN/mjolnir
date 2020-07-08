import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'sada',
};

/**
 * 创建css
 */
const createStyleFile = () => {
  const cssFile: string = `
			.mjolnir-submenu {
				display: none;
			}
			.mjolnir-submenu.menu-opened {
				display: block;
			}
		`;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

/**
 * 生成临时JSX
 * @param props
 */
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="open">
        <MenuItem>open1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;

describe('test Menu and MenuItem compotent', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('shound correct Menu and MenuItem based on default porps', () => {
    // parent component
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('mjolnir-menu sada');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
    // active child component
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('menu-item is-active');
    // disabled child component
    expect(disabledElement).toBeInTheDocument();
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    // click the normal MenuItem
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    // click disabled MenuItem
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toBeCalledWith('1');
  });

  it('should show dropdown items when hover on subMenu', async () => {
    const drop1Element = wrapper.queryByText('drop1');
    expect(drop1Element).not.toBeVisible();
    const dropdownTitleElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownTitleElement);
    // 因handle mouse 后有300秒异步计时，然后再显示。这种写法需要修改
    // expect(wrapper.queryByText('drop1')).toBeVisible();
    await wait(() => {
      expect(drop1Element).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toBeCalledWith('3-0');
    fireEvent.mouseLeave(dropdownTitleElement);
    await wait(() => {
      expect(drop1Element).not.toBeVisible();
    });
  });
});

/**
 * 测试vertical模式下的Menu
 */
let wrapperVer: RenderResult;

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn(),
  defaultOpenSubMenus: ['4'],
};

describe('test Menu and MenuItems component in vertical mode', () => {
  beforeEach(() => {
    wrapperVer = render(generateMenu(testVerProps));
    wrapperVer.container.append(createStyleFile());
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup(); // clean the DOM
    const wrapperVer = render(generateMenu(testVerProps));
    const menuElement = wrapperVer.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  // react-test-library execute 'cleanup' every time 'it' completed !

  it('should show dropdown items when click on vertical subMenu', () => {
    const drop1Element = wrapperVer.getByText('drop1');
    expect(drop1Element).not.toBeVisible();
    const openTitleElement = wrapperVer.getByText('dropdown');
    fireEvent.click(openTitleElement);
    expect(drop1Element).toBeVisible();
    fireEvent.click(drop1Element);
    expect(testVerProps.onSelect).toBeCalledWith('3-0');
  });

  it('should show subMenu dropdown when defaultOpenSubMenus contain subMenu index', () => {
    const open1Element = wrapperVer.getByText('open1');
    expect(open1Element).toBeVisible();
  });
});
