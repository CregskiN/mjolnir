import React, { FC, useRef, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent } from 'react';
import Input, { InputProps } from '../Input/input';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';

export interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject; // 交叉类型 T + DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
};

/**
 * AutoComplete 受控组件，联想输入结果
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value = '',
        fetchSuggestions,
        onSelect,
        renderOption,
        ...restProps
    } = props;

    const [inputValue, setInputValue] = useState<string>(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [highLightIndex, setHighLightIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [ showDropdown, setShowDropdown] = useState(false)
    const triggerSearch = useRef(false); // 不用useState是因为不想改变state造成组件重渲染，triggerSearch与view层展示无关，正好可以作为lock
    const componentRef = useRef<HTMLDivElement>(null);
    const debouncedValue = useDebounce(inputValue, 500);

    // console.log(suggestions);
    useClickOutside(componentRef, () => {
        setSuggestions([]);
    })
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    // console.log(data);
                    setSuggestions(data);
                    setLoading(false);
                    if(data.length > 0){
                        setShowDropdown(true);
                    }
                })
            } else {
                setSuggestions(results);
                if(results.length > 0){
                    setShowDropdown(true);
                }
            }
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }

    }, [fetchSuggestions, debouncedValue])


    /**
     * 响应输入并搜索
     * @param e 
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    }

    /**
     * 响应点击联想列表事件
     * @param item 
     */
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    }

    const highlight = (index: number) => {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighLightIndex(index);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: {
                // 回车
                if (suggestions[highLightIndex]) {
                    handleSelect(suggestions[highLightIndex]);
                }
                break;
            }
            case 38: {
                //上
                highlight(highLightIndex - 1);
                break;
            }
            case 40: {
                // 下
                highlight(highLightIndex + 1);
                break;
            }
            case 27: {
                // ESC
                setSuggestions([]);
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * 自定义dropdown模版生成
     * @param item 
     */
    const renderTemplete = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }

    /**
     * 生成dropdown
     */
    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSuggestions([]) }}
            >
                <ul className="mjolnir-suggestion-list">
                    {
                        suggestions.map((item, index) => {
                            const classes = classNames('suggestion-item', {
                                'is-active': index === highLightIndex
                            })
                            return (
                                <li key={item.value} className={classes} onClick={() => handleSelect(item)}>
                                    {renderTemplete(item)}
                                </li>
                            )
                        })
                    }
                </ul>
            </Transition>
        )
    }


    return (
        <div className="mjolnir-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {loading && <ul><Icon icon="spinner" spin /></ul>}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}

export default AutoComplete;