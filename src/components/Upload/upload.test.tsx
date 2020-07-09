import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react';
import Upload, { UploadProps } from './upload';
import axios from 'axios';

jest.mock('../Icon/icon', () => {
    return ({ icon, onClick }) => {
        return <span onClick={onClick}>{icon}</span>
    }
})

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
    action: 'fakeurl.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true,
};

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });


let wrapper: RenderResult;
let fileInput: HTMLInputElement;
let uploadArea: HTMLElement;


describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
        fileInput = wrapper.container.querySelector('.mjolnir-file-input') as HTMLInputElement;
        uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;
    })

    it('upload process should works fine', async () => {
        const { queryByText, getByText } = wrapper;
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ 'data': 'cool' });
        // });
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' }); // 快捷方式
        expect(uploadArea).toBeInTheDocument();
        expect(fileInput).not.toBeVisible();
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        expect(queryByText('spinner')).toBeInTheDocument();
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        })
        expect(queryByText('check-circle')).toBeInTheDocument();
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
        expect(testProps.onChange).toHaveBeenCalledWith(testFile);

        // remove upload file
        expect(queryByText('times')).toBeInTheDocument();
        fireEvent.click(getByText('times'));
        expect(queryByText('test.png')).not.toBeInTheDocument();
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({ raw: testFile, status: 'success', name: 'test.png' }));
    })

    it('drag and drop files should works fine', async () => {
        const { queryByText } = wrapper;
        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass('is-dragover');
        fireEvent.dragLeave(uploadArea);
        expect(uploadArea).not.toHaveClass('is-dragover');
        // js DOM 库不支持drop事件，这里使用模拟事件
        const mockedDropEvent = createEvent.drop(uploadArea);
        Object.defineProperty(mockedDropEvent, 'dataTransfer', {
            value: {
                files: [testFile]
            }
        })
        fireEvent(uploadArea, mockedDropEvent);
        // fireEvent.drop(uploadArea, { dataTransfer: { file: [testFile] } });
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        })
    })


})