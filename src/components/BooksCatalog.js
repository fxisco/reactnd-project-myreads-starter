import React from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import { SHELF_TYPES } from '../constants'

const BooksCatalog = ({ books, onShelfChange }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <BookList
                                customClass={"books-grid"}
                                books={books}
                                type={SHELF_TYPES.CURRENTLY_READING}
                                onShelfChange={onShelfChange}
                            />
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <BookList
                                customClass={"books-grid"}
                                books={books}
                                type={SHELF_TYPES.WANT_TO_READ}
                                onShelfChange={onShelfChange}
                            />
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <BookList
                                customClass={"books-grid"}
                                books={books}
                                type={SHELF_TYPES.READ}
                                onShelfChange={onShelfChange}
                            />
                      </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

export default BooksCatalog
