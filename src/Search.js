import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

export default class Search extends Component {

  state = {
    query: '',
    booksToDisplay: [], // list of books we get from the parent component 'App.js'
    invalidQuery: false
    // will be used to handle the rendering of an informative error message in case the search didnt yield any results
  }

  search = async (e) => {
    const searchQuery = e.target.value
    this.setState({
      query: searchQuery,
      invalidQuery: false
    })

    if (searchQuery === '') {
      this.setState({ booksToDisplay: [] })
    }

    else {

      await this.props.searchBooks(searchQuery)
      this.setState({ booksToDisplay: this.props.searchResults })
      const { query, booksToDisplay } = this.state
      if ((booksToDisplay.length === undefined || booksToDisplay.length === 0) && query.length !== 0) {
        this.setState({
          invalidQuery: true
        })
      }
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

    const { query, booksToDisplay, invalidQuery } = this.state

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to={'/'} onClick={this.clearQuery}><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">

              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

              <input type="text" value={query} placeholder="Search by title or author"
                onChange={(event) => this.search(event)} />
            </div>
          </div>

          <div className="search-books-results">
            <ol className="books-grid">
              {booksToDisplay.length > 0 && booksToDisplay.map((book) => (
                <Book key={book.id} book={book} updateBookHandler={this.props.updateBook} />
              ))}
              {invalidQuery && <p>Sorry, no books found</p>}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}