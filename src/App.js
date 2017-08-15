import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksCatalog from './BooksCatalog'
import BooksSearch from './BooksSearch'
import './App.css'

class BooksApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleShelfChange = this.handleShelfChange.bind(this);
    }

    state = {
        books: [],
        filteredBooks: [],
        filter: ''
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        })
    }

    handleFilterChange(filter) {
        this.setState({
            filter
        });

        if (filter) {
            BooksAPI.search(filter).then((books) => {
                const filteredBooks = books.error ? [] : books;
                console.log(filteredBooks);
                if (this.state.filter) {
                    this.setState({
                        filteredBooks
                    });
                }
            })

        } else {
            this.setState({
                filteredBooks: []
            });
        }
    }

    handleShelfChange(id, value) {
        BooksAPI.update({ id: id }, value)
            .then((response) => {
                const { books } = this.state;
                const bookIndex = books.findIndex((book) => { return book.id === id; });

                if (bookIndex !== -1) {
                    this.setState({
                        books: [
                            ...books.slice(0, bookIndex),
                            {
                                ...books[bookIndex],
                                shelf: value
                            },
                            ...books.slice(bookIndex + 1)
                        ]
                    });
                } else {
                    const { filteredBooks } = this.state;
                    const bookIndex = filteredBooks.findIndex((book) => { return book.id === id; });
                    const bookUpdate = {
                        ...filteredBooks[bookIndex],
                        shelf: value
                    };

                    console.log(bookUpdate);
                    this.setState({
                        books: [
                            ...this.state.books,
                            bookUpdate
                        ],
                        filteredBooks: [
                            ...filteredBooks.slice(0, bookIndex),
                            bookUpdate,
                            ...filteredBooks.slice(bookIndex + 1)
                        ]
                    });
                }
            });
    }

    render() {
        const { books, filter, filteredBooks } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BooksCatalog
                        books={books}
                        onShelfChange={this.handleShelfChange}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <BooksSearch
                        filter={filter}
                        books={books}
                        filteredBooks={filteredBooks}
                        onShelfChange={this.handleShelfChange}
                        onFilterChange={(event) => this.handleFilterChange(event.target.value)}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
