import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

export default class Search extends Component {

  state = {
    query: '',
    booksToDisplay: []
  }


  componentDidUpdate() {

  }
  search = (e) => {
    // e.preventDefault()
    const searchQuery = e.target.value
    console.log('handling input')
    console.log(searchQuery)
    this.setState({
      query: searchQuery
    })
    // const { query } = this.state
    // if (query) {
    this.props.searchBooks(searchQuery)
    // this.setState({
    // booksToDisplay: this.props.searchResults
    // })
    // console.log(query)
    // }
  }
  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    // console.log('inside render method')
    // console.log(this.props.searchResults)
    // console.log(this.props)
    const { query } = this.state
    const { searchResults } = this.props
    // let searchResults=[]
    // if(this.props.searchResults){
    //  searchResults=this.props.searchResults
    // }
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' onClick={this.clearQuery}><button className="close-search">Close</button></Link>
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
              {searchResults.length > 0 && searchResults.map((book) => (

                <Book key={book.id} book={book} updateBookHandler={this.props.updateBook} />

              ))}

              {/* { searchResults.length === 0 && <p>No Results</p>} */}



            </ol>
          </div>
        </div>
      </div>
    )
  }
}
