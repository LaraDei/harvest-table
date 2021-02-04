import React from 'react'
import './Pagination.css'

const Pagination = ({ itemsPerPage, totalItems, paginate}) => {
    const pageNums = []
    for(let i = 1; i <= Math.ceil(totalItems/ itemsPerPage); i++){
        pageNums.push(i)
    }

    return (
        <div className="pagination"> 
            <ul>
                {pageNums.map(num => (
                    <li key={num} className='page-item'>
                        <button onClick={() => paginate(num)} className='page-link'>
                            {num}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination