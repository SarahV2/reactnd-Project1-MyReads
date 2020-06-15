import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import BookShelves from './BookShelves'


class BooksApp extends React.Component {

  state = {
    books: [],
    searchResults: [],
  }

  componentDidMount() {
    console.log('MOUNTED!')
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
        console.log(books)
      })
    console.log(this.props)
  }

  componentWillReceiveProps() {
    if (this.props.location.updateProps.isUpdated) {
      console.log(this.props.location)
    }
  }

  // componentDidUpdate(){
  //   BooksAPI.getAll()
  //   .then((books) => {
  //     this.setState({
  //       books
  //     })
  //     console.log(books)
  //   })
  // console.log(this.props)

  // }

  updateBookStatus = async (book, shelf) => {

    // const quickUpdate = this.state.books
    // for (let i = 0; i < quickUpdate.length; i++) {
    //   if (quickUpdate[i].id === book.id) {
    //     quickUpdate[i].shelf = shelf
    //     break;
    //   }
    // }

    // this.setState({
    //   books: quickUpdate
    // })
    let newBooks = []
    var updatedShelves = await BooksAPI.update(book, shelf)
    console.log('updating ...')
    console.log(updatedShelves)
    let updateAll=await BooksAPI.getAll()
    // const shelves = Object.values(updatedShelves)
    // for (var i = 0; i < shelves.length; i++) {
    //   for (var j = 0; j < shelves[i].length; j++) {
    //     var newBook = await BooksAPI.get(shelves[i][j])
    //     newBooks.push(newBook)
    //   }
    // }
    // console.log(newBooks)

    this.setState({
      books: updateAll
    })

  }

  // onSearchQueryChange = async (query) => {
  //   console.log(query)

  //   if (query.length > 0) {


  //     let searchResults = await BooksAPI.search(query);

  //     let books = this.state.books
  //     // console.log(books)

  //     if (searchResults) {
  //       for (var i = 0; i < searchResults.length; i++) {
  //         for (var j = 0; j < books.length; j++) {
  //           if (searchResults[i].id === books[j].id) {
  //             console.log('if clause')
  //             searchResults[i].shelf = books[j].shelf;
  //           }
  //           console.log(searchResults[i].shelf)
  //         }
  //       }
  //       this.setState({
  //         searchResults
  //       })
  //     }
  //   } //outer if
  //   else {
  //     this.setState({
  //       searchResults: []
  //     })
  //   }
  // }

  onSearchQueryChange = async (query) => {
    console.log(query)

    if (query.length > 0) {
      try {
        let searchResults = await BooksAPI.search(query);
        let books = this.state.books
        for (var i = 0; i < searchResults.length; i++) {
          for (var j = 0; j < books.length; j++) {
            if (searchResults[i].id === books[j].id) {
              console.log('if clause')
              searchResults[i].shelf = books[j].shelf;
            }
            console.log(searchResults[i].shelf)
          }
        }
        this.setState({
          searchResults
        })


        // console.log(books)
      }
      catch (error) {
        this.setState({ searchResults: [] })
      }

    } //outer if
    else {
      this.setState({
        searchResults: []
      })
    }
  }

  // onSearchQueryChange = (query) => {
  //   if (query.length > 0) {
  //     BooksAPI.search(query).then(books => {
  //       this.setState({
  //         searchResults: books
  //       })
  //     })
  //   }
  //   else {
  //     this.setState({ searchResults: [] })
  //   }
  //   console.log(query)
  // this.setState({
  //   searchResults: []
  // })

  //  if (query.trim() !== '') {
  //   BooksAPI.search(query).then((books) => {
  //     this.setState({
  //       searchResults: books
  //     })
  //   })
  // }
  //   let books = this.state.books
  //   let searchResults = this.state.searchResults
  //   console.log(books)
  //   if (searchResults) {
  //   for (var i = 0; i < searchResults.length; i++) {
  //     for (var j = 0; j < books.length; j++) {
  //       if (searchResults[i].id === books[j].id) {
  //         console.log('if clause')
  //         searchResults[i].shelf = books[j].shelf;
  //       }
  //       console.log(searchResults[i].shelf)
  //     }
  //   }
  //   this.setState({
  //     searchResults
  //   })
  //   }
  // }

  addBook = (book, shelf) => {
    const currentBooks = this.state.books
    currentBooks.push(book)
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">



        <div className="open-search">
          <Link to='/search'><button>Add a Book</button></Link>
        </div>

        <Switch>
          <Route path='/search'
            render={() => <Search
              searchBooks={this.onSearchQueryChange}
              searchResults={this.state.searchResults}
              updateBook={this.updateBookStatus} />}
          />


          {/* Constructing the finish route */}
          <Route exact path='/' component={() => <BookShelves books={books} updateBook={this.updateBookStatus} />} />

        </Switch>
      </div>


    )
  }
}

export default BooksApp
