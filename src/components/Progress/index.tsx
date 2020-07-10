import { FC } from 'react';
import Progress, {ProgressProps} from './progress';

export type IProcessComponent = FC<ProgressProps>;

const TransProgress = Progress as IProcessComponent;

export default TransProgress;