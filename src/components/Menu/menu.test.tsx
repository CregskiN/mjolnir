import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testMenuProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'sada',
}

const testVerticalMenuProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
            {/* <li>hello</li> */}
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem compotent', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testMenuProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })

    it('shound correct Menu and MenuItem based on default porps', () => {
        // parent component
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('mjolnir-menu sada');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        // active child component
        expect(activeElement).toBeInTheDocument();
        expect(activeElement).toHaveClass('menu-item is-active');
        // disabled child component
        expect(disabledElement).toBeInTheDocument();
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz');
        // click the normal MenuItem
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testMenuProps.onSelect).toHaveBeenCalledWith(2);
        // click disabled MenuItem
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testMenuProps.onSelect).not.toBeCalledWith(1);
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup(); // clean the DOM 
        const wrapper = render(generateMenu(testVerticalMenuProps));
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })
    // react-test-library execute 'cleanup' every time 'it' completed !
})