import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Input, InputProps } from './input';

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'default Input',
};

const disabledProps: InputProps = {
    disabled: true,
    placeholder: 'disabled Input',
}

const largeProps: InputProps = {
    size: 'lg',
    placeholder: 'lg Input',
}

const prepand_appendProps: InputProps = {
    prepand: 'https://',
    append: '.com',
    placeholder: 'prepand/append Input'
}

// const 

function generateInput(props: InputProps) {
    return <Input {...props} />
}

describe('test Input component', () => {
    it('should render the corrent style about default Input Component, and response to input', () => {
        const wrapper = render(generateInput(defaultProps));
        const inputNode = wrapper.getByPlaceholderText('default Input') as HTMLInputElement;
        expect(inputNode).toBeInTheDocument();
        expect(inputNode).toHaveClass('mjolnir-input-inner');
        fireEvent.change(inputNode, { target: { value: '哈哈哈' } });
        expect(defaultProps.onChange).toHaveBeenCalled();
        expect(inputNode.value).toEqual('哈哈哈');
    })

    it('should render the disabled Input when it receive disabled property', () => {
        const wrapper = render(generateInput(disabledProps));
        const inputNode = wrapper.getByPlaceholderText('disabled Input') as HTMLInputElement;
        expect(inputNode.disabled).toBeTruthy();
    })

    it('should render different input sizes when it receive lg property', () => {
        const wrapper = render(generateInput(largeProps));
        const inputContainer = wrapper.container.querySelector('.mjolnir-input-wrapper') as HTMLElement;
        expect(inputContainer).toHaveClass('input-size-lg');
    })

    it('should render prepand and append element when it receive prepand/append property', () => {
        const wrapper = render(generateInput(prepand_appendProps));
        const inputContainer = wrapper.container.querySelector('.mjolnir-input-wrapper') as HTMLElement;
        expect(inputContainer).toHaveClass('input-group input-group-prepand input-group-append');
        const prepandNode = wrapper.queryByText('https://');
        expect(prepandNode).toBeInTheDocument();
        const appendNode = wrapper.queryByText('.com');
        expect(appendNode).toBeInTheDocument();
    })
})