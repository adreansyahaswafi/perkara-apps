import { useState, useEffect } from "react";

const defaultPageSizeOptions = [
    { label: 10, value: 10 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
    { label: 200, value: 200 },
    { label: 500, value: 500 },
    { label: 1000, value: 1000 }
];

const Pagination = ({
    currentPage,
    totalPage,
    limitPage,
    onChangePage,
    // options = [],
    showRowsPerPage = true,
    // withSelector = false,
    optionsPageSize = defaultPageSizeOptions
}) => {
    const [state, setState] = useState({
        currentPage: 0,
        totalPage: 0,
        limitPage: 0,
        page: 0,
        size: 0,
    });

    useEffect(() => {
        if (currentPage || totalPage || limitPage) {
            setState({
                currentPage,
                totalPage,
                limitPage,
                page: currentPage,
                size: limitPage,
            });
        }
    }, [currentPage, totalPage, limitPage]);

    const setPage = (e, page) => {
        e.preventDefault();
        const newState = { ...state, currentPage: page, page };
        setState({ ...newState });
        onChangePage(newState);
    };

    const handlePageSize = (value) => {
        const newState = {
            ...state,
            currentPage: 1,
            limitPage: value,
            page: 1,
            size: value
        };
        setState({ ...newState });
        onChangePage(newState);
    };

    const setTotalPaging = (currentPage, totalPage) => {
        const fillRange = (start, end) =>
            Array(end - start + 1)
                .fill()
                .map((item, index) => start + index);

        let temp = fillRange(0, totalPage - 1);

        let startPage, endPage;
        if (totalPage <= 7) {
            startPage = 0;
            endPage = totalPage;
        } else {
            if (currentPage <= 4) {
                startPage = 0;
                endPage = 7;
            } else if (currentPage + 3 >= totalPage) {
                startPage = totalPage - 7;
                endPage = totalPage;
            } else {
                startPage = currentPage - 4;
                endPage = currentPage + 3;
            }
        }
        return temp.slice(startPage, endPage);
    };

    if (!state.totalPage || state.totalPage <= 0) {
        return null;
    }
    const pagingList = setTotalPaging(state.currentPage, state.totalPage);

    return (
        <div className="flex border-t-3 border-t-red-400 flex-col md:flex-row justify-between items-center  p-4 bg-white rounded-lg shadow-sm">
            {showRowsPerPage && (
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                    <span className="text-sm text-gray-600">Rows per page:</span>
                    <select
                        className="form-select border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={state.limitPage}
                        onChange={(e) => handlePageSize(Number(e.target.value))}
                    >
                        {optionsPageSize.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <nav className="flex items-center space-x-1">
                {/* First Page Button */}
                <button
                    onClick={(e) => setPage(e, 1)}
                    disabled={state.currentPage === 1}
                    className={`px-3 py-1 cursor-pointer rounded-md text-sm ${state.currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-400 hover:bg-red-100 hover:text-red-400'
                        }`}
                >
                    First
                </button>

                {/* Previous Page Button */}
                <button
                    onClick={(e) => setPage(e, state.currentPage - 1)}
                    disabled={state.currentPage === 1}
                    className={`px-2 py-1 cursor-pointer rounded-md ${state.currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-400 hover:bg-red-100 hover:text-red-400'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                {/* Page Numbers */}
                {pagingList.map((page) => (
                    <button
                        key={page}
                        onClick={(e) => setPage(e, page + 1)}
                        // disabled={(state.currentPage > page)}
                        className={`px-3 py-1 cursor-pointer rounded-md text-sm ${state.currentPage === page + 1
                            ? 'bg-red-400 text-white'
                            : 'text-gray-400 hover:bg-red-100'
                            }`}
                    >
                        {page + 1}
                    </button>
                ))}

                {/* Next Page Button */}
                <button
                    onClick={(e) => setPage(e, state.currentPage + 1)}
                    disabled={state.currentPage === state.totalPage}
                    className={`px-2 py-1 cursor-pointer rounded-md ${state.currentPage === state.totalPage
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-400 hover:bg-red-100 hover:text-red-400'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Last Page Button */}
                <button
                    onClick={(e) => setPage(e, state.totalPage)}
                    disabled={state.currentPage === state.totalPage}
                    className={`px-3 py-1 cursor-pointer rounded-md text-sm ${state.currentPage === state.totalPage
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-400 hover:bg-red-100 hover:text-red-400'
                        }`}
                >
                    Last
                </button>
            </nav>
        </div>
    );
};

export default Pagination;