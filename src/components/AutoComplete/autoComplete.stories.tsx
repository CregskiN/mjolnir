import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AutoComplete, { DataSourceType } from './autoComplete';

interface LakerPlayerProps {
    value: string;
    number: number;
}

interface GithubUserProps {
    login: string;
    url: string;
    [propName: string]: any;
}

const SimpleComplete = () => {
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins'];

    // const lakersWithNumber = [
    //     { value: 'bradley', number: 11 },
    //     { value: 'pope', number: 1 },
    //     { value: 'caruso', number: 4 },
    //     { value: 'cook', number: 2 },
    //     { value: 'cousins', number: 15 },
    //     { value: 'james', number: 23 },
    //     { value: 'AD', number: 3 },
    //     { value: 'green', number: 14 },
    //     { value: 'howard', number: 39 },
    //     { value: 'kuzma', number: 0 },
    // ];

    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(item => ({ value: item }));
    // };

    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query));
    // };

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                console.log(items);
                return (items as GithubUserProps[]).slice(0, 10).map((item) => ({ value: item.login, ...item }))
            })
    }

    const renderOption = (item: DataSourceType) => {
        const githubUserProps = item as DataSourceType<GithubUserProps>;
        return (
            <div>
                <h2>Name: {githubUserProps.value} </h2>
                <p>url: {githubUserProps.url}</p>
            </div>
        )
    };


    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            renderOption={renderOption}
        />
    )
}


storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete)