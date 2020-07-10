import { FC } from 'react';
import Icon, { IconProps } from './icon';



export type IIconComponent = FC<IconProps>;

const TransIcon = Icon as IIconComponent;

export default TransIcon;