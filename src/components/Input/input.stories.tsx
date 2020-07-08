import React, { CSSProperties, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

import Input from './input';
library.add(fas);

const ControlledInput = () => {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={(e) => { setValue(e.target.value) }} />
}
// value defaultValue不能同时存在，不能同时受控又不受控


const inputNodeStyle: CSSProperties = {
    width: '300px'
}

const defaultInput = () => {
    return (
        <div>
            <Input
                style={inputNodeStyle}
                placeholder="default Input"
                onChange={action('change')}
            />
            <ControlledInput />
        </div>
    )
}

const disabledInput = () => {
    return (

        <Input
            style={inputNodeStyle}
            placeholder="disabled Input"
            disabled
        />

    )
}

const iconInput = () => {
    return (

        <Input
            style={inputNodeStyle}
            placeholder="icon Input"
            onChange={action('click')}
            icon="search"
        />

    )
}

const sizesInput = () => {
    return (
        <>
            <Input
                style={inputNodeStyle}
                placeholder="large Input"
                size="lg"
                onChange={action('click')}
            />
            <Input
                style={inputNodeStyle}
                placeholder="small Input"
                size="sm"
                onChange={action('click')}
            />
        </>
    )
}

const prepand_appendInput = () => (
    <div>
        <Input
            style={inputNodeStyle}
            placeholder="prepand Input"
            prepand="https://"
            onChange={action('click')}
        />

        <Input
            style={inputNodeStyle}
            placeholder="append Input"
            append=".com"
            onChange={action('click')}
        />
    </div>
);


storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add('被禁用的Input', disabledInput)
    .add('带图标的 Input', iconInput)
    .add('大小不同的 Input', sizesInput)
    .add('带前后缀的 Input', prepand_appendInput)

