import React, { Component } from 'react'
import Book from './Book'
export default class Shelf extends Component {

    // This component is responsible for rendering a book shelf with the appropriate list of books
    // passed to it by <BookShelves> component
    state = {
        books: []
    }

    componentDidMount() {
        const { bookList } = this.props
        if (bookList.length > 0) {
            this.setState({
                books: bookList
            })
        }
    }
    render() {
        // Loop through the list of books and render a <Book> component for each book.
        // The book component will have the book object and the update function passed to it as props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(this.props.bookList).map((book) => (
                            <li key={book.id}>
                                <Book book={book} updateBookHandler={this.props.updateBookHandler} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

        )
    }
}