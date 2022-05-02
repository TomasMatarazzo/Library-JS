class Book {
    #name;
    #author;
    #pages;

    constructor(name, author, pages) {
        this.#name = name;
        this.#author = author;
        this.#pages = pages;
    }

    getName() {
        return this.#name;
    }
}

class Library {

    constructor() {
        this.books = []
    }

    addBook(book) {
        this.books.push(book);
    }

    deleteBook(book) {
        this.books.filter(e => e.getName() !== book.getName())
    }

    getBookByName(name) {
        return this.books.find(e => e.getName() === name)
    }

    isInLibrary(book) {
        return this.books.some(e => e.getName() === book.getName())
    }
}


class UI {
    addBook() {

    }

    deleteBook() {

    }

}

//DOM EVENTS
document.getElementById('product-form').addEventListener('submit',
    e => {
        const name = document.getElementById('name').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;

        const book = new Book(name, author, pages);
        e.preventDefault();
    }
)

