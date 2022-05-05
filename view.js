import { Book } from "./model.js";

export default class UI {
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
                handler(book); // sends signal to the controller. 
                this.form.reset();
            }
        )
    }

    bindDeleteBook(handler) {
        document.getElementById('book-list').addEventListener('click',
            (e) => {
                if (e.target.name === "delete") {
                    this.showMessage("Book deleted Successfully", 'danger');
                }
                handler(e.target.parentElement.getElementsByTagName("p")[0].innerHTML)
            }
        )
    }

    render(books) {
        while (this.productList.hasChildNodes()) {
            this.productList.removeChild(this.productList.firstChild);
        }
        if (books.length != 0) {
            books.forEach((book) => {
                const element = this.createElement('div');
                element.innerHTML = `<div class = "card text-center mb-4">
                                        <div class = "card-body">
                                            <strong> Book Name</strong>:<p class = "mb-0">${book.getName()}</p>
                                            <strong> Book Author</strong>: ${book.getAuthor()}
                                            <strong> Numer of Pages</strong>: ${book.getPages()}</br>
                                            <a href = "#" class = "btn btn-danger" name = "delete"> delete</a>
                                        </div>
                                    </div>`
                this.productList.appendChild(element);
            })
        }


    }

    addBook(book) {
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