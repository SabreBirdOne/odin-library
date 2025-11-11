function Book(title, author, numPages) {
    if (!new.target) {
        throw Error("missing new before constructor call");
    }
    
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = false;

    this.info = function (){
        const isReadStr = this.isRead ? "read" : "not read yet"; 
        return `ID ${this.id}: ${this.title} by ${this.author}, ${this.numPages} pages, ` + isReadStr;
    }
}