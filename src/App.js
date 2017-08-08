import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import BooksCatalog from './BooksCatalog'
import BooksSearch from './BooksSearch'
import './App.css'

class BooksApp extends React.Component {
    state = {
        filter: ''
    }

    handleFilterChange(filter) {
        this.setState({
            filter
        });
    }

    render() {
        const { filter } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BooksCatalog />
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
