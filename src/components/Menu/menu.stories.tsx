import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(fas);

const horizontalMenu = () => {
    return (
        <Menu
            onSelect={action('click')}
        >
            <MenuItem>cool link</MenuItem>
            <MenuItem disabled>disabled link</MenuItem>
            <SubMenu title="dropDown">
                <MenuItem>dropDown 1</MenuItem>
                <MenuItem>dropDown 2</MenuItem>
                <MenuItem>dropDown 3</MenuItem>
            </SubMenu>
        </Menu>
    )
}

const verticalMenu = () => {
    return (
        <Menu mode="vertical" defaultOpenSubMenus={['2']}>
            <MenuItem>coo link</MenuItem>
            <SubMenu title="dropDown">
                <MenuItem>dropDown 1</MenuItem>
                <MenuItem>dropDown 2</MenuItem>
                <MenuItem>dropDown 3</MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>dropDown 1</MenuItem>
                <MenuItem>dropDown 2</MenuItem>
                <MenuItem>dropDown 3</MenuItem>
            </SubMenu>
        </Menu>
    )
}

storiesOf('Menu Component', module)
    .add('Menu', horizontalMenu)
    .add('垂直的 Menu', verticalMenu)