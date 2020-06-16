import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import BookShelves from './BookShelves'


class BooksApp extends React.Component {

  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    // Get the list of books from the API endpoint and assign its value to the books state
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  // Update the current shelf of the book
  updateBookStatus = async (book, shelf) => {
    await BooksAPI.update(book, shelf)
    console.log('updating ...')
    // Call getAll() and assign its value to the book variable to have the updated list of books
    let updatedBookList = await BooksAPI.getAll()
    this.setState({
      books: updatedBookList
    })
  }

  // Search for books 
  onSearchQueryChange = async (query) => {
    if (query.length > 0) {
      try {
        let searchResults = await BooksAPI.search(query);
        let books = this.state.books
        // Compare the books resulted from the search with the current book list
        // this will help us show the correct current shelf of the book
        for (var i = 0; i < searchResults.length; i++) {
          for (var j = 0; j < books.length; j++) {
            // if book from the search result has the same id as the book from the current list
            if (searchResults[i].id === books[j].id) {
              // Assign the correct shelf to that book
              searchResults[i].shelf = books[j].shelf;
            }
          }
        }
        this.setState({
          searchResults
        })
      }
      catch (error) {
        // this.setState({ searchResults: [] })
        console.log(error)
      }
    }
    else {
      this.setState({ searchBooks: [] })
    }
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <div className="open-search">
          <Link to='/search'><button>Add a Book</button></Link>
        </div>
        <Route path='/search'
          render={() => <Search
            searchBooks={this.onSearchQueryChange} // search function
            searchResults={this.state.searchResults} // search results
            updateBook={this.updateBookStatus} />}  // book.shelf update function
        />

        <Route exact path='/' component={() => <BookShelves books={books} updateBook={this.updateBookStatus} />} />
      </div>
    )
  }
}
export default BooksApp