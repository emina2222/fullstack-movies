import React from 'react';
import {PaginationDetails} from "../types/PaginationDetails";


interface PaginationProps {
    pagination: PaginationDetails
}

const Pagination = ({pagination}: PaginationProps) => {
    let pageLinks = []
    console.log(pagination)

    for (let i = 1; i <= pagination.pages; i++) {
        const active = pagination.currentPage === i ? 'active' : '';
        pageLinks.push(
            <li
                key={i}
                style={{paddingRight: '10px'}}
                className={`waves-effect ${active}`}
                onClick={() => pagination.nextPage(i)}
            >
                <a href="#">{i}</a>
            </li>
        );
    }

    return (
        <div className='container'>
            <div className='row'>
                <ul className='pagination'>
                    {pagination.currentPage > 1 && (
                        <li
                            style={{ paddingRight: '10px' }}
                            className='waves-effect'
                            onClick={() => pagination.nextPage(pagination.currentPage - 1)}
                        >
                            <a href="#">Prev</a>
                        </li>
                    )}
                    {pageLinks}
                    {pagination.currentPage < pagination.pages && (
                        <li
                            className='waves-effect'
                            onClick={() => pagination.nextPage(pagination.currentPage + 1)}
                        >
                            <a href="#">Next</a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Pagination;