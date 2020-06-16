import React, { Component } from 'react'
import Shelf from './Shelf'
export default class BookShelves extends Component {
    // This component is responsible for filtering the list of books passed as props  
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        updateBook: []
    }

    componentDidMount() {
        var { books } = this.props
        const { updateBook } = this.props

        if (books) {
            // Filter the list of books based on the shelf property of the book object

            // Currently Reading 
            const currentlyReading = books.filter((book) => {
                return book.shelf === "currentlyReading"
            })

            // Read
            const read = books.filter((book) => (
                book.shelf === "read"
            ))

            // Want to read
            const wantToRead = books.filter((book) => (
                book.shelf === "wantToRead"
            ))

            this.setState({
                currentlyReading,
                read,
                wantToRead,
                updateBook
            })
        }
    }
    render() {
        //For each shelf, we'll call the <Shelf> component 
        // and supply it with the corresponding list and the book update function.
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
