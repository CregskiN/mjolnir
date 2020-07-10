import { FC } from 'react';
import AutoComplete, { AutoCompleteProps } from './autoComplete';

export type IAutoCompleteComponent = FC<AutoCompleteProps>;

const TransAutoComplete = AutoComplete as IAutoCompleteComponent;

export default TransAutoComplete;
