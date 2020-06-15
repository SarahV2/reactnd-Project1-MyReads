import React, { Component } from 'react'
import Shelf from './Shelf'
export default class BookShelves extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        updateBook: []
    }

    componentDidMount() {
        var { books } = this.props
        const { updateBook } = this.props
        //console.log(books)

        if (books) {
            console.log(books)
            const currentlyReading = books.filter((book) => {
                console.log(book)
                return book.shelf === "currentlyReading"
            })
            console.log('Filtered CR')
            // console.log(currentlyReading)
            const read = books.filter((book) => (
                book.shelf === "read"
            ))
            console.log('Filtered r')

            const wantToRead = books.filter((book) => (
                book.shelf === "wantToRead"
            ))
            console.log('Filtered WTR')

            this.setState({
                currentlyReading,
                read,
                wantToRead,
                updateBook
            })
            console.log('filtering ..')
            console.log('done!')
            // console.log(currentlyReading)
        }

    }
    render() {
        var { books } = this.props
        if (books && books.length > 0) {
            console.log('hi now in render()')
            const currentlyReading = books.filter((book) => {

                console.log(book)
                return book.shelf === "currentlyReading"
            })
            console.log('now filtering something ..')
            console.log(currentlyReading)
        }
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf shelfName='Currently Reading' bookList={this.state.currentlyReading} updateBookHandler={this.state.updateBook} />
                        <Shelf shelfName='Want to Read' bookList={this.state.wantToRead} updateBookHandler={this.state.updateBook} />
                        <Shelf shelfName='Read' bookList={this.state.read} updateBookHandler={this.state.updateBook} />
                    </div>
                </div>
            </div>
        )
    }
}
