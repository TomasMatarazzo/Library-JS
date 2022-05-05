
export class Book {

    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
    }

    getName() {
        return this.name;
    }

    getAuthor() {
        return this.author;
    }

    getPages() {
        return this.pages;
    }
}

export default class Library {

    constructor() {
        this.restoreLocal();
    }

    restoreLocal() {
        //we get the book from the Local Storage, the books are objects and we need
        //to convert it instances of the class Book.
        const booksLocal = JSON.parse(localStorage.getItem("books"));
        if (booksLocal != undefined)
            this.books = booksLocal.map(e => new Book(e.name, e.author, e.pages))
        else
            this.books = []
    }

    addBook(book) {
        this.books.push(book);
        localStorage.setItem("books", JSON.stringify(this.books));
        this.renderView(this.books)
    }

    deleteBook(bookName) {
        this.books = this.books.filter(e => e.getName() !== bookName)
        localStorage.setItem("books", JSON.stringify(this.books));
        this.renderView(this.books)
    }

    getBookByName(name) {
        return this.books.find(e => e.getName() === name)
    }

    isInLibrary(book) {
        return this.books.some(e => e.getName() === book.getName())
    }

    bindRenderView(callback) {
        this.renderView = callback;
    }

    _commit(books) {
        this.render(books);
        localStorage.setItem("books", JSON.stringify(books))
    }
}
