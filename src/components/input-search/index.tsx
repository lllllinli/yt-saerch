import * as React from 'react';
import { useCallback, useState } from 'react';
import { Search } from '@material-ui/icons'


interface InputSearchProps {
    onSearch: (value: string) => void;
}


interface InputSearchInterface extends React.FC<InputSearchProps> {}

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
    }, []);

    return (
        <div className="input-group mb-3">
            <input onChange={changeHandle} className="form-control" placeholder="搜尋" onKeyDown={keyDownHandle} />
            <button onClick={clickHandle} className="btn btn-outline-secondary"><Search /></button>
        </div>
    );
}

export default InputSearch;