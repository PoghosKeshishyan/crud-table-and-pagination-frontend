import '../stylesheets/Pagination.css';

export function Pagination({ itemsPerPage, currentPage, setCurrentPage, totalUsers, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        if (currentPage !== pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        } 
    };

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        } 
    };

    return (
        <div className='Pagination'>
            <button onClick={() => prevPage()} className='fa-solid fa-angle-left' />

            <ul>
                {
                    pageNumbers.map(number => (
                        <li
                            key={number}
                            onClick={() => paginate(number)}
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </li>
                    ))
                }
            </ul>

            <button onClick={() => nextPage()} className='fa-solid fa-angle-right' />
        </div>
    )
}
