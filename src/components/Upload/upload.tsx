import React, { useState, useRef } from 'react';
import axios from 'axios';

import Button from '../Button/button';
import UploadList from './uploadList';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    /* 上传文件唯一识别标识 */
    uid: string;
    /* 大小 */
    size: number;
    /* 文件名 */
    name: string;
    /* 状态 */
    status?: UploadFileStatus;
    /* 上传进度 */
    percent?: number;
    /* 原始文件 */
    raw?: File;
    /* 响应处理 */
    response?: any;
    /* 错误处理 */
    error?: any;
}

export interface UploadProps {
    /* 类似 form 的 action URL */
    action: string;
    /* （可选）已经处理完的文件列表 */
    defaultFileList?: UploadFile[];
    /* 生命周期事件一 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /* 进度事件 */
    onProgress?: (percentage: number, file: File) => void;
    /* 成功事件 */
    onSuccess?: (data: any, file: File) => void;
    /* 失败事件 */
    onError?: (err: any, file: File) => void;
    /* 改变事件，发生在onSuccess、onError、以及完成文件选择之后*/
    onChange?: (file: File) => void;
    /* 移除事件 */
    onRemove?: (file: UploadFile) => void;
    /* HTTP header */
    headers?: { [key: string]: any };
    /* multipart/form 中的 name  */
    name?: string;
    /* HTTP body 中的 name 和 value */
    data?: { [key: string]: any };
    /* 是否携带cookie */
    withCredentials?: boolean;
    accept?: string;
    /* 是否支持上传多个 */
    multiple?: boolean;
    /* 是否支持拖动上传 */
    drag?: boolean;
};

const Upload: React.FC<UploadProps> = (props) => {
    // console.log('component Upload render ...');
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        defaultFileList,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj };
                } else {
                    return file;
                }
            })
        })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        }
    }

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processFile => {
                        post(processFile)
                    })
                } else if (result !== false) {
                    post(file);
                }
            }
        })
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        }
        setFileList(prevList => { return [_file, ...prevList] });
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers,
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round(e.loaded * 100 / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(res => {
            // console.log(res);
            updateFileList(_file, { status: 'success', response: res.data });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(err => {
            console.error(err);
            updateFileList(_file, { status: 'success', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
    }
    // console.log(fileList);


    return (
        <div className="mjolnir-upload-component">
            <div
                className="mjolnir-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}
            >{
                    drag ?
                        <Dragger onFile={(files) => { uploadFiles(files) }}>
                            {children}
                        </Dragger> :
                        children !== undefined ?
                            children :
                            <Button btnType="primary" onClick={handleClick}>Upload File</Button>
                }

                <input
                    className="mjolnir-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file',

}

export default Upload;