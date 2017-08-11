import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksCatalog from './BooksCatalog'
import BooksSearch from './BooksSearch'
import './App.css'

class BooksApp extends React.Component {
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

    render() {
        const { books, filter, filteredBooks } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BooksCatalog
                        books={books}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <BooksSearch
                        filter={filter}
                        books={filteredBooks}
                        onFilterChange={(event) => this.handleFilterChange(event.target.value)}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
