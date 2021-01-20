import * as React from 'react';
import { ErrorOutline } from '@material-ui/icons';


interface SearchEmptyProps {}

interface SearchEmptyInterface extends React.FC<SearchEmptyProps> {}

const SearchEmpty:  SearchEmptyInterface = ({...props}) => {
    return (
        <div className="mt-lg-5">
            <p className="text-lg-center fw-bold fs-1 text-muted"><ErrorOutline style={{ fontSize: 50 }} /> <span className="ml-5">尚無資料</span></p>
        </div>
    );
};

export default SearchEmpty;
