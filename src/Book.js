import React, { Component } from 'react'

export default class Book extends Component {

    state = {
        selectedShelf: ''
    }

    handleUpdate = (e, book) => {
        e.preventDefault();
        if (this.props.updateBookHandler) {
            this.props.updateBookHandler(book, e.target.value)
        }
    }
    render() {
        const { book } = this.props

        // Handle the case of rendering a book object that dosen't have 'imageLinks' property
        let thumbnail = ''
        // if the book dosen't have a thumbnail, assign a URL of an image to it.
        if (book.imageLinks === undefined) {
            thumbnail = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png'
        }
        // otherwise, the book will have its thumbnail
        else {
            thumbnail = book.imageLinks.thumbnail
        }
        return (
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.handleUpdate(e, book)} defaultValue={book.shelf === undefined ? 'none' : book.shelf}>
                                <option value="move" disabled >Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </div>
        )
    }
}
