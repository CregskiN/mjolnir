import React from 'react';
import { config } from 'react-transition-group';
import { render, RenderResult, fireEvent, wait, cleanup } from '@testing-library/react';

import { AutoComplete, AutoCompleteProps, DataSourceType, DataSourceObject } from './autoComplete';

import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(fas);

config.disabled = true; // 去除Transition的异步性



const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
];

const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
    onSelect: jest.fn(),
    placeholder: 'auto-complete',
};

function generateAutoComplete(props: AutoCompleteProps) {
    return (
        <AutoComplete {...props} />
    )
}

let wrapper: RenderResult;
let inputNode: HTMLInputElement;

describe('test sync AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render(generateAutoComplete(testProps));
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
        expect(inputNode).toBeInTheDocument();
    });

    it('should basic AutoComplete behavior', async () => {
        // input change (debounce)
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });
        // should have two suggestion items
        const suggentionItems = wrapper.container.querySelectorAll('.suggestion-item');
        expect(suggentionItems.length).toEqual(2);
        // click the first item
        fireEvent.click(wrapper.getByText('ab'));
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
        // fill the input
        expect(inputNode.value).toBe('ab');
    })

    it('should provide keyboard support', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        })
        const firstResult = wrapper.queryByText('ab');
        const secondResult = wrapper.queryByText('abc');
        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(firstResult).toHaveClass('is-active');
        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(secondResult).toHaveClass('is-active');
        // arrow up
        fireEvent.keyDown(inputNode, { keyCode: 38 });
        expect(firstResult).toHaveClass('is-active');
        // press enter
        fireEvent.keyDown(inputNode, { keyCode: 13 });
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
        expect(firstResult).not.toBeInTheDocument();
    })

    it('click outside should hide the dropdown', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        })
        fireEvent.click(document);
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    })
})

interface templateProps {
    value: string;
    number: number;
}


const renderOption = (item: DataSourceType) => {
    const template = item as DataSourceType<templateProps>;
    return (
        <>
            <div className="template-title">value: {template.value}</div>
            <div className="template-containt">number: {template.number}</div>
        </>
    )
}

const testRenderOptionProps: AutoCompleteProps = {
    fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)).map(item => ({ value: item.value, number: item.number })) },
    renderOption: renderOption,
    placeholder: 'template-autoComplete',
    onSelect: jest.fn(),
}

interface GithubUserProps {
    login: string;
    url: string;
    [propName: string]: any;
}

const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({ items }) => {
            return (items as GithubUserProps[]).slice(0, 10).map((item) => ({ value: item.login, ...item }))
        })
}

const testAsyncProps: AutoCompleteProps = {
    fetchSuggestions: handleFetch,
    placeholder: 'async-autoComplete',
    onSelect: jest.fn(),
}

describe('test async AutoComplete Component', () => {
    it('renderOption should generate the right template', async () => {
        const wrapper = render(generateAutoComplete(testRenderOptionProps));
        const inputNode = wrapper.getByPlaceholderText('template-autoComplete') as HTMLInputElement;
        expect(inputNode).toBeInTheDocument();
        // input change (debounce)
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            expect(wrapper.queryByText('value: ab')).toBeInTheDocument();
            expect(wrapper.queryByText('value: abc')).toBeInTheDocument();
        });
    })

    it('async fetchSuggestions should works fine', async () => {
        // const wrapper = render(generateAutoComplete(testAsyncProps));
        // const inputNode = wrapper.getByPlaceholderText('async-autoComplete') as HTMLInputElement;
        // // input change
        // fireEvent.change(inputNode, { target: { value: 'CregskiN' } });
        // await wait(() => {
        //     expect(wrapper.queryByText('CregskiN')).toBeInTheDocument();
        // })
    })
})