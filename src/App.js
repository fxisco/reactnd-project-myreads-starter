import React from 'react'
import { Route } from 'react-router-dom'
import BooksCatalog from './components/BooksCatalog'
import BooksSearch from './components/BooksSearch'
import { SORT_TYPES } from './constants';
import * as BooksAPI from './helpers/BooksAPI'
import { orderByPage, orderByName, orderByStars } from './helpers/index';
import './styles/App.css'

class BooksApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleShelfChange = this.handleShelfChange.bind(this);
    }

    state = {
        books: [],
        filteredBooks: [],
        filter: '',
        sortBy: SORT_TYPES.NONE
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        })
    }

    handleFilterChange(filter) {
        this.setState({
            filter,
            sortBy: SORT_TYPES.NONE
        });

        if (filter) {
            BooksAPI.search(filter).then((books) => {
                const filteredBooks = books.error ? [] : books;

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

    handleOrderByChange(value) {
        let orderedBooks = [];

        if (value === SORT_TYPES.STAR) {
            orderedBooks = [
                ...this.state.filteredBooks.sort(orderByStars)
            ]
        } else if (value === SORT_TYPES.PAGE) {
            orderedBooks = [
                ...this.state.filteredBooks.sort(orderByPage)
            ]
        } else {
            orderedBooks = [
                ...this.state.filteredBooks.sort(orderByName)
            ]
        }

        this.setState({
            filteredBooks: orderedBooks,
            sortBy: value
        });
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
        const { books,
            filter,
            filteredBooks,
            sortBy
        } = this.state;

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
                        books={books}
                        filter={filter}
                        filteredBooks={filteredBooks}
                        sortBy={sortBy}
                        onOrderByChange={(event) => this.handleOrderByChange(event.target.value)}
                        onShelfChange={this.handleShelfChange}
                        onFilterChange={(event) => this.handleFilterChange(event.target.value)}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
