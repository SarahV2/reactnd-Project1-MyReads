# MyReads 
My reads is a bookshelf app where the user can search for books and assign them to shelves (labeled 'Currently Reading' , 'Want to Read', and 'Read') and also move books between them.

## Installation & Run
install the project dependencies by typing ```npm install``` or ```npm i``` in the terminal
and then start the server by using the command ```npm start```

## Components
* ```BookShelves```
* ```Shelf```
* ```Book```
* ```Search```


## Screenshots
<div align="center">
  <img src='/screenshots/c1.PNG'>
  <br>
  <img src='/screenshots/c2.PNG'>
  </div>

## Backend Server

<details>
<summary>More details about the BookAPI provided in this project</summary>
The provided file BooksAPI.js contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

</details>

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

