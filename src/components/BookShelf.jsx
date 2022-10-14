import ListBook from "./ListBook"
const BookShelf = ({ category, books, bookUpdate}) => {
    return (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid"> {
            books !== undefined ? 
            books.length > 0 ?
            (!(books[0].title ===undefined))?

            books.map((book)=> (
                <ListBook key={book.id} book={book} bookUpdate={bookUpdate}/>
            ))
            :"No Result Found":"No Result Found":"No Result Found"
        }
        </ol>
        </div>
    </div>
)
}

export default BookShelf