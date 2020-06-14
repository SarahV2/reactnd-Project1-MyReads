import React, { Component } from 'react'
import Book from './Book'
export default class Shelf extends Component {
    state = {
        books: []
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.bookList !== this.props.bookList) {
    //         this.setState({ books: this.props.bookList });
    //     }
    // }
    componentDidMount() {
        const { bookList } = this.props

        if (bookList.length>0) {
            console.log(bookList)

            this.setState({
                books: bookList
            })
        }


    }

    // componentDidUpdate() {
    //     if (this.props.shelfBooks) {
    //         this.setState({
    //             book: this.props.bookList
    //         })
    //     }
    // }

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
