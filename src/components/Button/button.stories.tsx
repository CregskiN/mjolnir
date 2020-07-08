import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import Button from './button';


const defaultButton = () => {
    return <Button onClick={action('click')}>default Button</Button>
}

const buttonWidthSize = () => {
    return (
        <div>
            <Button size="lg">large button</Button>
            <Button size="sm">small button</Button>
        </div>
    )
}

const buttonWithType = () => {
    return (
        <div>
            <Button btnType="primary">primary button</Button>
            <Button btnType="danger">danger button</Button>
            <Button btnType="link" href="#">link button</Button>
        </div>
    )
}

storiesOf('Button Component', module)
    .add('Button', defaultButton)
    .add('不同尺寸的 Button', buttonWidthSize)
    .add('不同类型的button', buttonWithType);