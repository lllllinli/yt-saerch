import * as React from 'react';
import { useCallback, useState } from 'react';
import { InputSearchInterface } from './types';
import './inputSearch.scss';

const initState = '';

const InputSearch: InputSearchInterface = ({
   onSearch,
   ...props
}) => {
    const [ inputState, setState ] = useState(initState);

    const clickHandle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        onSearch(inputState);
    }, [inputState, onSearch]);

    const keyDownHandle = useCallback((e: React.KeyboardEvent<any>) => {
        if (e.key === 'Enter') {
            onSearch(inputState);
        }
    }, [inputState, onSearch])

    const changeHandle = useCallback((e) => {
        setState(e.target.value);
    }, [setState]);

    return (
        <div className="yt-search">
            <div className="input-group mb-3">
                <input
                    onChange={changeHandle}
                    className="form-control yt-control"
                    placeholder="搜尋"
                    onKeyDown={keyDownHandle} />
                <button
                    onClick={clickHandle}
                    className="btn btn-outline-secondary">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>
    );
}

export default InputSearch;