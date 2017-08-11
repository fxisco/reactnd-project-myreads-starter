import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import BookList from './BookList'

const BooksSearch = ({ books, filter, onFilterChange }) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" value={filter} onChange={onFilterChange} placeholder="Search by title or author"/>
                </div>
            </div>
            <div className="search-books-results">
                <BookList 
                    customClass="books-grid"
                    books={books}
                />
            </div>
        </div>
    );
}

export default BooksSearch