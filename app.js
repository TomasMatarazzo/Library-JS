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

    getAuthor() {
        return this.#author;
    }

    getPages() {
        return this.#pages;
    }
}

class Library {

    constructor() {
        this.books = []
    }

    addBook(book) {
        this.books.push(book);
        this.renderView(this.books);
    }

    deleteBook(book) {
        this.books.filter(e => e.getName() !== book.getName())
        this.renderView(this.books);
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
}


class UI {
    constructor() {
        this.productList = document.getElementById('book-list');
        this.form = document.getElementById('book-form');
        this.container = document.querySelector('.container');
        this.app = document.querySelector('#App');
    }


    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector)
        return element;
    }

    bindAddBook(handler) {
        document.getElementById('book-form').addEventListener('submit',
            e => {
                const name = document.getElementById('name').value;
                const author = document.getElementById('author').value;
                const pages = document.getElementById('pages').value;

                const book = new Book(name, author, pages);
                handler(book); // handleAddBook(book)
            }
        )
    }

    bindDeleteBook() {
        document.getElementById('book-list').addEventListener('click',
            (e) => {
                const ui = new UI();
                ui.deleteBook(e.target);
            }
        )
    }

    addBook(book) {
        console.log('nashe');
        const element = this.createElement('div');
        element.innerHTML = `<div class = "card text-center mb-4">
                                <div class = "card-body">
                                    <strong> Book Name</strong>: ${book.getName()}
                                    <strong> Book Author</strong>: ${book.getAuthor()}
                                    <strong> Numer of Pages</strong>: ${book.getPages()}
                                    <a href = "#" class = "btn btn-danger" name = "delete"> delete</a>
                                </div>
                            </div>`
        this.productList.appendChild(element);
        this.form.reset();
    }

    deleteBook(element) {
        if (element.name === "delete") {
            element.parentElement.parentElement.remove();
            this.showMessage("Book deleted Successfully", 'danger');
        }

    }

    showMessage(message, cssClass) {
        const div = this.createElement('div', `alert alert-${cssClass} mt-2`);
        div.appendChild(document.createTextNode(message));
        this.container.insertBefore(div, this.app);
        setTimeout(() => { document.querySelector('.alert').remove(); }, 3000);
    }

    resetForm() {
        this.form.reset();
    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view;

        // to Display the initial books
        this.renderView(this.model.books);

        // to listen all the events from the view.
        this.view.bindAddBook(this.handleAddBook);
        this.view.bindDeleteBook(this.deleteBook);
        this.model.bindRenderView(this.renderView);
    }

    renderView = (books) => {
        this.view.render(books)
    }

    handleAddBook = (book) => {
        this.model.addBook(book);
    }

    handleDeleteBook = (book) => {
        this.model.deleteBook(book);
    }
}
//DOM EVENTS
document.getElementById('book-form').addEventListener('submit',
    e => {
        const name = document.getElementById('name').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;

        const book = new Book(name, author, pages);
        const ui = new UI();
        ui.addBook(book);
        ui.showMessage('Book added Successfully', 'success')
        e.preventDefault();
    }
)


document.getElementById('book-list').addEventListener('click',
    (e) => {
        const ui = new UI();
        ui.deleteBook(e.target);
    }
)




