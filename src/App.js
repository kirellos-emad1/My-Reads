import "./App.css";
import Navbar from './components/Navbar'
import BookShelf from './components/BookShelf'
import { useState, useEffect } from "react";
import { Link, Route, Routes } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchList from "./components/SearchList";
// import SearchList from "./components/SearchList";

function App() {
  const [books, setBooks] = useState ([{}])

  const bookUpdate = async (book, shelf) => {
    let isExisit = false
    setBooks(books.map((b)=>{
      if (b.id === book.id) {
        b.shelf = shelf
        isExisit = true
      }
      return b
    }))

    if(!isExisit) {
      book = await BooksAPI.get(book.id)
      book.shelf = shelf
      setBooks ([...books, book])
    }

    BooksAPI.update(book, shelf)
  }

  useEffect(() => {
    const getAllBooks = async() => {
      const res = await BooksAPI.getAll()
      setBooks(res)
    }
    getAllBooks()
  }, [])
  const filterBooks = (shelf) => {
    return books.filter((book)=>book.shelf === shelf)
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <div className="list-books">
            <Navbar />
            <div className="list-books-content">
              <div>
                <BookShelf category= {'Currently Reading'} books={filterBooks('currentlyReading')} bookUpdate={bookUpdate}/>
                <BookShelf category= {'Want to Read'} books={filterBooks('wantToRead')} bookUpdate={bookUpdate} />
                <BookShelf category= {'Read'} books={filterBooks('read')} bookUpdate={bookUpdate} />
              </div>
            </div>
            <div className="open-search">
            <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />
        <Route path="/search" element={<SearchList  currentBook={books} bookUpdate={bookUpdate}/>}/>
      </Routes>
    </div>
  );
}

export default App;
