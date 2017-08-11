import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

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
                <ol className="books-grid">
                    {books.map((book) => {
                        const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : '';

                        return (
                            <Book
                                key={book.id}
                                authors={book.authors}
                                imageUrl={imageUrl}
                                title={book.title}
                            />
                        )
                    })}
                </ol>
            </div>
        </div>
    );
}

export default BooksSearch