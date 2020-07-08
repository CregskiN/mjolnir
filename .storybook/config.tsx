import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import '../src/styles/index.scss'

const wrapperStyles: React.CSSProperties = {
    padding: '20px 40px',
};

/**
 * 全局装饰器，针对组件加一层wrapper
 * @param storyFn 
 */
function storyWrapper(storyFn: any) {
    return (
        <div style={wrapperStyles}>
            <h3>组件展示</h3>
            {storyFn()}
        </div>
    )
}

addDecorator(storyWrapper)
addDecorator(withInfo);
addParameters({
    info: {
        inline: true,
        header: false
    }
});
