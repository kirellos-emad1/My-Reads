import ShalfChanger from "./ShalfChanger";
const ListBook = ({ book, bookUpdate }) => {
    return (
            <li>
                <div className="book">
                <div className="book-top">
                    <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                        book.imageLinks != null ?
                        `url(${book.imageLinks.smallThumbnail})`
                        : '',
                    }}
                    ></div>
                    <ShalfChanger book ={book} bookUpdate={bookUpdate} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors?book.authors.join(",\n"):""}</div>
                </div>
            </li>
    )

}

export default ListBook;