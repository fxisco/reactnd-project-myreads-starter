import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

const BooksSearch = ({
    books,
    filter,
    filteredBooks,
    sortBy = 'none',
    onFilterChange,
    onOrderByChange,
    onShelfChange
}) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" value={filter} onChange={onFilterChange} placeholder="Search by title or author"/>
                </div>
                {filteredBooks.length > 0 &&
                    <div className="search-books-sort-wrapper">
                        <select value={sortBy} onChange={onOrderByChange}>
                            <option value="none" disabled>Sort by...</option>
                            <option value="name">Name</option>
                            <option value="page">Page</option>
                            <option value="star">Stars</option>
                        </select>
                    </div>
                }
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {filteredBooks.map((book) => {
                        const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : '';
                        const bookInShelf = books.find((item) => { return item.id === book.id });
                        const shelf = bookInShelf ? bookInShelf.shelf : 'none';

                        return (
                            <Book
                                key={book.id}
                                authors={book.authors}
                                customClass={shelf !== 'none' ? 'book-in-shelf' : ''}
                                imageUrl={imageUrl}
                                pageCount={book.pageCount}
                                title={book.title}
                                shelf={shelf}
                                rating={book.averageRating}
                                onShelfChange={(event) => onShelfChange(book.id, event.target.value)}
                            />
                        )
                    })}
                </ol>
            </div>
        </div>
    );
}

export default BooksSearch
