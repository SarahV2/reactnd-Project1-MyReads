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
    searchResult: [],
    filteredResults: false,
    showSearchPage: false,
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
        console.log(books)
      })
    console.log(this.props)
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

  onSearchQueryChange = async (query) => {
    // BooksAPI.search(query)
    //   .then(searchResult => {
    //     console.log(searchResult)
    //   })
    let searchResult = await BooksAPI.search(query);
    // console.log(searchResult)

    let books = this.state.books
    console.log(books)

    for (var i = 0; i < searchResult.length; i++) {
      for (var j = 0; j < books.length; j++) {
        if (searchResult[i].id === books[j].id) {
          console.log('if clause')
          searchResult[i].shelf = books[j].shelf;
        }
        // else {
        //   searchResult[i].shelf = 'none'
        // }
        console.log(searchResult[i].shelf)

      }
      // if (i === searchResult.length - 1) {
      //   this.setState({
      //     filteredResults: true
      //   })
      // }
      // else{
      //   console.log('false clause id'+i)
      // }
    }

    this.setState({
      searchResult
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>


          <div className="open-search">
            <Link to='/search'><button>Add a Book</button></Link>
          </div>

          <Route path='/search'
            component={() => <Search
              searchBooks={this.onSearchQueryChange}
              searchResults={this.state.searchResult}
              updateBook={this.updateBookStatus} />} />



          {/* Constructing the finish route */}
          <Route exact path='/' component={() => <BookShelves books={this.state.books} updateBook={this.updateBookStatus} />} />
        </div>

      </div>
    )
  }
}

export default BooksApp
