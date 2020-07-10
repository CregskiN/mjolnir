import { FC } from 'react';
import Button, { ButtonProps } from './button';

export type IButtonComponent = FC<ButtonProps>;

const TransButton = Button as IButtonComponent;

export default TransButton;