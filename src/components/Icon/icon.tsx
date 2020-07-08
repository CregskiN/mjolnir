import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;

}

// 对已有库封装
const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props;
  const classes = classNames('mjolnir-icon', className, {
    [`icon-${theme}`]: theme
  })
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
