import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import BooksCatalog from './BooksCatalog'
import BooksSearch from './BooksSearch'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
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
    }

    render() {
        const { books, filter } = this.state;

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
                        onFilterChange={(event) => this.handleFilterChange(event.target.value)}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
