import { FC } from 'react';
import Input, { InputProps } from './input';

export type IInputComponent = FC<InputProps>;

const TransInput = Input as IInputComponent;

export default TransInput;