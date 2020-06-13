import React, { Component } from 'react'
import Shelf from './Shelf'
export default class BookShelves extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        var { books } = this.props

        if (books) {
            console.log(books)
            const currentlyReading = books.filter((book) => (
                book.shelf === "currentlyReading"
            ))

            const read = books.filter((book) => (
                book.shelf === "read"
            ))

            const wantToRead = books.filter((book) => (
                book.shelf === "wantToRead"
            ))

            this.setState({
                currentlyReading,
                read,
                wantToRead
            })
            console.log('filtering ..')
            console.log('done!')
            console.log(currentlyReading)
        }

    }
    render() {

        return (

            <div className="list-books-content">
                <div>
                    <Shelf shelfName='Currently Reading' bookList={this.state.currentlyReading} />
                    <Shelf shelfName='Want to Read' bookList={this.state.wantToRead} />
                    <Shelf shelfName='Read' bookList={this.state.read} />
                </div>
            </div>
        )
    }
}
