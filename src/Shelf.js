import React, { Component } from 'react'
import Book from './Book'
export default class Shelf extends Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(this.props.bookList).map((book) => (
                            <li key={book.id}>
                                <Book book={book} updateBookHandler={this.props.updateBookHandler} />
                                {console.log(book)}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

        )
    }
}
