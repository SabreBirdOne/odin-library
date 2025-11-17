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
    // Book cards are divs in the HTML created from a Book object.
    /* Structure: 
        <div> .book
            <h3> for title and author
            <p> for pages and read status
            <p> for id
        </div>
    */

    const bookCard = document.createElement("div");
    bookCard.classList = "book";
    bookCard.id = book.id;

    const titleAndAuthor = document.createElement("h3");
    titleAndAuthor.textContent = `${book.title} by ${book.author}`;
    bookCard.appendChild(titleAndAuthor);

    const pagesAndReadStatus = document.createElement("p");
    pagesAndReadStatus.textContent = `${book.numPages} pages, ${book.isRead ? "read" : "not read yet"}`;
    bookCard.appendChild(pagesAndReadStatus);

    const bookID = document.createElement("p");
    bookID.textContent = `ID ${book.id}`;
    bookCard.appendChild(bookID);

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

// Dialog code
const newBookButton = document.querySelector("button#newBookButton");
const newBookDialog = document.querySelector("dialog#newBookDialog");
const newBookDialogConfirmButton = newBookDialog.querySelector("button#confirmButton");
const newBookDialogForm = newBookDialog.querySelector("form");

// "Show the dialog" button opens the <dialog> modally
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

newBookDialogConfirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    newBookDialog.close("confirm");
});

/* "Cancel" button closes the dialog without submitting because of [formmethod="dialog"].
"Confirm" button also closes the dialog with "confirm" returnValue to add a book to library. 
Both buttons trigger a close event to close the dialog. */
newBookDialog.addEventListener("close", (event) => {
    if (newBookDialog.returnValue === "confirm"){
        const bookArgs = newBookDialogForm.querySelectorAll("input");
        const newBook = new Book ( 
            bookArgs[0].value, 
            bookArgs[1].value,
            bookArgs[2].valueAsNumber,
            bookArgs[3].checked
        )
        addBookCardsToElement([newBook], booksDiv);
        myLibrary.push(newBook);
    }  
});

// library array code
const myLibrary = [];
addBookToLibrary(myLibrary, "Design Patterns", "Gang of Four", 99, false);
addBookToLibrary(myLibrary, "FOCS", "Malik", 99, true);
addBookToLibrary(myLibrary, "How to live with CSS", "Underpaid intern", 1, false);

// add library to the DOM element
const booksDiv = document.querySelector("div.books");
addBookCardsToElement(myLibrary, booksDiv);

