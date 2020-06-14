import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import BoShelf from './BoShelf'
import BookShelves from './BookShelves'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  state = {
    contacts: [],
    screen: 'list'
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
        console.log(books)
      })
  }

  updateBookStatus = async (book, shelf) => {
    let newBooks = []
    var updatedShelves = await BooksAPI.update(book, shelf)
    console.log('updating ...')
    console.log(updatedShelves)
    const shelves = Object.values(updatedShelves)
    for (var i = 0; i < shelves.length; i++) {
      for (var j = 0; j < shelves[i].length; j++) {
        var newBook = await BooksAPI.get(shelves[i][j])
        newBooks.push(newBook)
      }
    }
    console.log(newBooks)
    this.setState({
      books: newBooks
    })

  }
  onSearchQueryChange = (query) => {
    BooksAPI.search(query)
      .then(searchResult => {
        console.log(searchResult)
      })
  }

  render() {
    return (
      <div className="app">
        <button><Link to='/final'>Final</Link></button>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>


          <div className="open-search">
            <Link to='/search'><button>Add a Book</button></Link>
          </div>

          <Route path='/search'
            component={() => <Search searchBooks={this.onSearchQueryChange} />} />
          <Route exact path='/' component={BoShelf} />

          {/* Constructing the finish route */}
          <Route path='/final' component={() => <BookShelves books={this.state.books} updateBook={this.updateBookStatus} />} />
        </div>

      </div>
    )
  }
}

export default BooksApp
