import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

export default class Search extends Component {
  search = (e) => {
    e.preventDefault()
    this.props.searchBooks(e.target.value)
  }

render() {
  console.log('inside render method')
  console.log(this.props.searchResults)
  console.log(this.props)

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => { this.search(event) }} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResults.map((book) => (
              <li key={book.id}>
                <Book book={book} updateBookHandler={this.props.updateBook} />
              </li>
            ))}


          </ol>
        </div>
      </div>
    </div>
  )
}
}
