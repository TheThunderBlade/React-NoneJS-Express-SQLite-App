import React, {useState} from 'react';
import nextIcon from '../images/next.png'

const Pagination = ({postsPerPage, totalPosts, currentPage, setCurrentPageHandler}) => {
    const [pageNumber, setPageNumber] = useState([1, 2, 3, 4, 5])

    return (
        <nav className='pagination d-flex justify-content-center'>
            {
                currentPage !== 1
                    ?
                    <li className='page-item'>
                        <a
                            href="!#"
                            onClick={event => {
                                event.preventDefault()

                                setPageNumber(pageNumber.map(number => --number))

                                setCurrentPageHandler(--currentPage)
                            }
                            }
                        ><img className='flip' src={nextIcon} alt="next"/></a>
                    </li>
                    : null
            }

            {
                pageNumber.map(item => (

                    <li key={item} className='page-item'>
                        <a
                            onClick={event => {
                                event.preventDefault()
                                setCurrentPageHandler(item)
                            }}
                            href="!#"
                            className='page-link'
                            style={ currentPage === item ? {background: '#3A80BA', color: 'white'}:null }
                        >{item}</a>
                    </li>
                ))
            }
            {
                currentPage <= Math.ceil((totalPosts / postsPerPage) - 4) ?
                    <li className='page-item'>
                        <a
                            onClick={event => {
                                event.preventDefault()
                                if (currentPage >= Math.ceil((totalPosts / postsPerPage) - 5)) {
                                    setPageNumber([16, 17, 18, 19, 20])
                                } else {
                                    setPageNumber(pageNumber.map(number => ++number))
                                }

                                setCurrentPageHandler(++currentPage)
                            }
                            }
                            href="!#"
                        ><img src={nextIcon} alt="next"/></a>
                    </li>
                    : null
            }
        </nav>
    );
};

export default Pagination;