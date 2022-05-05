export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // to Display the initial books
        //this.renderView(this.model.books);

        // to listen all the events from the view.
        this.view.bindAddBook(this.handleAddBook);
        this.view.bindDeleteBook(this.handleDeleteBook);
        //this.model.bindDeleteBook(this.renderView);
        this.model.bindRenderView(this.renderView)
        this.renderView(this.model.books);

    }

    handleAddBook = (book) => {
        this.model.addBook(book);
    }

    handleDeleteBook = (bookName) => {
        this.model.deleteBook(bookName)
    }

    renderView = (books) => {
        this.view.render(books)
    }
}


