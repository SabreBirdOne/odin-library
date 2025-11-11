const myLibrary = [];

function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("missing new before constructor call");
    }
    
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = read || false;

    this.info = function (){
        const isReadStr = this.isRead ? "read" : "not read yet"; 
        return `ID ${this.id}: ${this.title} by ${this.author}, ${this.numPages} pages, ` + isReadStr;
    }
}

function addBookToLibrary(library, title, author, numPages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, numPages, read);
  library.push(newBook);
}