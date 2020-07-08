import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'kkk'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

describe('test button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>hello</Button>);
        // 根据text查找HTMLElement
        const element = wrapper.getByText('hello') as HTMLButtonElement;
        // 判断是否在组件中
        expect(element).toBeInTheDocument();
        // 查询element种类
        expect(element.tagName).toEqual('BUTTON');
        // 确定className
        expect(element).toHaveClass('btn btn-default')
        // 测试disabled默认是否为false
        expect(element.disabled).toBeFalsy();
        // 触发点击事件，测试点击事件触发情况
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>hello</Button>);
        // 根据text查找HTMLElement
        const element = wrapper.getByText('hello');
        // 判断是否在组件中
        expect(element).toBeInTheDocument();
        // 确定className
        expect(element).toHaveClass('btn btn-primary btn-lg kkk');
    });
    it('should render a link whern btnType equal link and hred is provided', () => {
        const wrapper = render(<Button btnType={'link'} href="http://www.baidu.com">Link</Button>);
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Disabled Button</Button>);
        const element = wrapper.getByText('Disabled Button') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        // 测试disabled为true，onClick是否生效
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toBeCalled();
    });

})