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

    componentDidMount() {
        // let shelfDetails = this.props.book.shelf
        // console.log(shelfDetails)
        // let shelf = ''
        // if (shelfDetails === undefined) {// || shelfDetails !== "wantToRead" || shelfDetails !== "currentlyReading") {
        //     shelf = 'none'
        //     console.log(shelf)
        // }
        // else {
        //     shelf = shelfDetails
        // }
        // this.setState({ selectedShelf: shelf })
        // console.log(this.state.selectedShelf)

    }

    selectShelf = (shelfDetails) => {
        let shelf = ''
        if (shelfDetails !== 'read' || shelfDetails !== 'wantToRead' || shelfDetails !== 'currentlyReading') {
            shelf = 'none'
        }
        else {
            shelf = shelfDetails
        }
        this.setState({ selectedShelf: shelf })
    }
    render() {
        const { book } = this.props
        // console.log(this.props.updateBookHandler)

        return (
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.handleUpdate(e, book)} defaultValue={book.shelf===undefined?'none':book.shelf}>
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
