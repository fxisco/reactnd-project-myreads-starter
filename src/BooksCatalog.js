import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

const BooksCatalog = ({ books }) => {
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
                            <ol className="books-grid">
                                {books
                                    .filter((book) => {
                                        return book.shelf === "currentlyReading"
                                    })
                                    .map((book) => {
                                        return (
                                            <Book
                                                key={book.id}
                                                authors={book.authors}
                                                imageUrl={book.imageLinks.thumbnail}
                                                title={book.title}
                                            />
                                        )
                                    })}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books
                                    .filter((book) => {
                                        return book.shelf === "wantToRead"
                                    })
                                    .map((book) => {
                                        return (
                                            <Book
                                                key={book.id}
                                                authors={book.authors}
                                                imageUrl={book.imageLinks.thumbnail}
                                                title={book.title}
                                            />
                                        )
                                })}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books
                                    .filter((book) => {
                                        return book.shelf === "read"
                                    })
                                    .map((book) => {
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
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

export default BooksCatalog