import { FC } from 'react';
import Upload, { UploadProps } from './upload';

export type IUploadComponent = FC<UploadProps>;

const TransUpload = Upload as IUploadComponent;

export default TransUpload;