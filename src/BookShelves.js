import React, { Component } from 'react'
import Shelf from './Shelf'
export default class BookShelves extends Component {
    state = {
        books: [],
        list: []
    }


    componentDidMount() {
        this.setState({
            books: this.props.books
        })

        // this.setState({
        //     list: filteredList
        // })
    }
    render() {
        var { books } = this.props

        if (books) {
            // console.log(books)
            const filteredList = books.filter((book) => (
                book.shelf === "currentlyReading"
            ))
            console.log('filtering ..')
            console.log('done!')
            console.log(filteredList)
        }


        var test = ''
        return (

            <div className="list-books-content">
                {/* {test = books.filter(book => {
                    console.log(book.shelf === "read")
                })} */}
                {console.log('original list')}
                {console.log(this.state.books)}
                {console.log('filtered list')}
                {console.log(test)}
                <div>
                    <Shelf />
                </div>
            </div>
        )
    }
}
