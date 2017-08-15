import React from 'react'
import Book from './Book'

const BookList = ({ books, customClass = '', onShelfChange, type}) => {
    const booksToShow = type ? books.filter((book) => {return book.shelf === type}) : books;

    return (
        <ol className={customClass}>
            {booksToShow.map((book) => {
                    const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : '';

                    return (
                        <Book
                            key={book.id}
                            authors={book.authors}
                            imageUrl={imageUrl}
                            title={book.title}
                            shelf={book.shelf}
                            rating={book.averageRating}
                            onShelfChange={(event) => onShelfChange(book.id, event.target.value)}
                        />
                    )
                })
            }
        </ol>
    );
}

export default BookList;
