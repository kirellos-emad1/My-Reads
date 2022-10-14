import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import { search } from '../BooksAPI';

const SearchList = ({ currentBook, bookUpdate }) =>{
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([{}]);

  useEffect(() => {
    const getBooks = async () => {
      let res;
      if(query.trim().length){
        res = await search(query.trim(),100);
      }
      if(res === undefined || res.length === undefined){
        setBooks([{}]);
        return;
      }

      //Shelf Defining
      for(let i = 0; i<res.length; i++){
        const book = res[i];
        const thisBook = currentBook.filter((b)=>book.id === b.id)[0];
        if(thisBook){
          book.shelf = thisBook.shelf;
        }
      }
      setBooks(res);
    };

    getBooks();  
    
  }, [query,currentBook]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to='/'
                >
                Close
                </Link>
            <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    value={query}
                    onChange={(v)=>{setQuery(v.target.value)}}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <BookShelf books={books} shelfName='Result' bookUpdate={bookUpdate}/>
            </div>
        </div>
    )
}

export default SearchList;