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

function createBookCard (book){
    // Book cards are divs in the HTML for each book in the library.
    const bookCard = document.createElement("div");
    bookCard.classList = "book";
    bookCard.id = book.id;
    bookCard.textContent = book.info();
    return bookCard;
}

function addBookCardsToElement(library, booksParentElement){
    /* 
    PARAMETERS: 
        library: array of Book objects
        booksParentElement: the object to append book cards from the library
    EFFECTS: for each Book in the library, create a Book Card and add it to the booksParentElement.
    */
    for (let i = 0; i < library.length; i++){ 
        const newBookCard = createBookCard(library[i])
        booksParentElement.appendChild(newBookCard);
    }
}

const myLibrary = [];
addBookToLibrary(myLibrary, "Design Patterns", "Gang of Four", 99, false);
addBookToLibrary(myLibrary, "FOCS", "Malik", 99, true);
addBookToLibrary(myLibrary, "How to live with CSS", "Underpaid intern", 1, false);

const booksDiv = document.querySelector("div.books");
addBookCardsToElement(myLibrary, booksDiv);

