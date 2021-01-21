import * as React from 'react';
import { useCallback, useEffect, useReducer } from 'react';


interface PaginationProps {
    totalPage: number;
    totalCounts: number;
    onPageChange: (page: number) => void;
}

interface PaginationInterface extends React.FC<PaginationProps> {}

interface PaginationStateInterface {
    currentPage: number;
    pageUnit: number;
    pageListCount: number;
    totalPage: number;
}

const initialState: PaginationStateInterface = {
    currentPage: 1,
    pageUnit: 5,
    pageListCount: 5,
    totalPage: 0,
};

const NEXT_PAGE = 'NEXT_PAGE';
const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
const GO_TO_PAGE = 'GO_TO_PAGE';
const SET_OPTIONS = 'SET_OPTIONS';

const getNextPageState = (state: PaginationStateInterface, pageUnit: number, totalPage: number) => {
    const currentPage = state.currentPage + 1;
    const pageListCount = (currentPage > state.pageListCount)
        ? (state.pageListCount + state.pageUnit)
        : state.pageListCount;
    return {
        currentPage,
        pageUnit,
        pageListCount,
        totalPage,
    };
}

const getPreviousPageState = (state: PaginationStateInterface, pageUnit: number, totalPage: number) => {
    const currentPage = state.currentPage - 1;
    const pageListCount = (
        currentPage < state.pageListCount
        && (state.pageListCount - state.pageUnit) > 0
    )
        ? (state.pageListCount - state.pageUnit)
        : state.pageListCount;


    return {
        currentPage,
        pageUnit,
        pageListCount,
        totalPage,
    };
};

const getGoToPageState = (state: PaginationStateInterface, action: PaginationStateInterface, pageUnit: number, totalPage: number) => {
    return {
        currentPage: action.currentPage,
        pageUnit,
        pageListCount: state.pageListCount,
        totalPage,
    };
};

const getSetOptionsState = (state: PaginationStateInterface, action: PaginationStateInterface, pageUnit: number) => {
    return {
        currentPage: state.currentPage,
        pageUnit,
        pageListCount: state.pageListCount,
        totalPage: action.totalPage,
    };
};

const reducer = (state: PaginationStateInterface, action: any) => {
    const pageUnit = state.pageUnit;
    const totalPage = state.totalPage;
    switch (action.type) {
        case NEXT_PAGE:
            return getNextPageState(state, pageUnit, totalPage);

        case PREVIOUS_PAGE:
            return getPreviousPageState(state, pageUnit, totalPage);

        case GO_TO_PAGE:
            return getGoToPageState(state, action, pageUnit, totalPage);

        case SET_OPTIONS:
            return getSetOptionsState(state, action, pageUnit);

        default:
            throw new Error();
    }
}

const getPageItems = (state: any) => {
    const pageItems = [];
    const start = state.pageUnit < state.totalPage ? (state.pageListCount - state.pageUnit) : 0;
    let count: number;
    if (state.pageUnit < state.totalPage
        && state.totalPage > state.pageListCount
    ) {
        count = state.pageListCount;
    } else if (
        state.pageUnit < state.totalPage
        && state.totalPage < state.pageListCount
    ) {
        count = state.totalPage;
    } else {
        count = state.totalPage;
    }
    for (let i = start; i < count; i++) {
        pageItems.push(i + 1);
    }

    return pageItems;
}

const previousBtnRender = (state: any, pageHandle: (type: string) => void) => {
    if (state.currentPage !== 1) {
        return (
            <li className="page-item">
                <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => pageHandle(PREVIOUS_PAGE)}>
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
        );
    } else { return null; }
}

const nextBtnRender = (state: any, pageHandle: (type: string) => void) => {
    if (state.currentPage < state.totalPage) {
        return (
            <li className="page-item">
                <button className="page-link" aria-label="Next" onClick={() => pageHandle(NEXT_PAGE)}>
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        );
    } else { return null; }
}

// const getList = (pageItems: any, state: any, clickHandle: (page: number) => void) => {
//     return (pageItems.map((item: number) => {
//         const listClass = item === state.currentPage ? 'page-item active' : 'page-item';
//         return (
//             <li
//                 key={item}
//                 className={listClass}>
//                 <button
//                     className="page-link"
//                     onClick={() => clickHandle(item)}
//                 >
//                     {item}
//                 </button>
//             </li>
//         );
//     });)
// };

const Pagination: PaginationInterface = ({
    totalPage,
    onPageChange
}) => {
    initialState.totalPage = totalPage;
    const [state, dispatch] = useReducer(reducer, initialState);

    const clickHandle = useCallback((page) => {
        if (page !== state.currentPage) {
            dispatch({
                type: GO_TO_PAGE,
                currentPage: page
            })
        }
    }, [state, dispatch]);

    const pageHandle = useCallback((type: string) => {
        switch (type) {
            case PREVIOUS_PAGE:
                dispatch({ type: PREVIOUS_PAGE});
                break;

            case NEXT_PAGE:
                dispatch({ type: NEXT_PAGE});
                break;

            default:
                console.error(`use error type. ${type}`);
        }
    }, [dispatch]);

    useEffect(() => {
        onPageChange(state.currentPage);
    }, [state, onPageChange])

    const pageItems = getPageItems(state);

    const renderList = pageItems.map((item) => {
        const listClass = item === state.currentPage ? 'page-item active' : 'page-item';
        return (
            <li
                key={item}
                className={listClass}>
                <button
                    className="page-link"
                    onClick={() => clickHandle(item)}
                >
                    {item}
                </button>
            </li>
        );
    });

    return (
        <nav aria-label="Page navigation example" className="mt-5">
            <ul className="pagination justify-content-center">
                {previousBtnRender(state, pageHandle)}
                {renderList}
                {nextBtnRender(state, pageHandle)}
            </ul>
        </nav>
    );
};

export default Pagination;