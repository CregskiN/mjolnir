import React from 'react';
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';


export type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    wrapper?: boolean; // 为避免被包裹的按钮存在transition属性，造成覆盖，使用wrapper包裹内层组件
};

const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props;

    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,

}

export default Transition;