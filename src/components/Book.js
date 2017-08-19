import React from 'react'
import Rating from './Rating';

const Book = ({
    authors = [],
    customClass = '',
    imageUrl = '',
    onShelfChange,
    pageCount = 0,
    rating = 0,
    shelf='none',
    title = ''
}) => {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className={`book-cover ${customClass}`} style={{ width: 128, height: 188, backgroundImage: `url(${imageUrl})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={shelf} onChange={onShelfChange}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.join()}</div>
                <Rating stars={rating} />
                {pageCount > 0 &&
                    <span className="book-page-count">{`${pageCount} pages`}</span>
                }
            </div>
        </li>
    );
}

export default Book
