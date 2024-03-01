const STORAGE_KEY = "BOOK_APPS";
let books = [];

function checkStorage() {
    if(typeof(Storage) == undefined) {
        alert('Browser anda tidak mendukung web storage');
        return false;
    }
    return true;
}
function saveData() {
    const parseData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parseData);
    document.dispatchEvent(new Event('ondatasaved'));
}
function loadDatafromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);

    if(data !== null) 
        books = data;

    document.dispatchEvent(new Event('ondataloaded'));
}
function updateDataToStorage() {
    if(checkStorage())
        saveData();
}
function composeBookObject(bookTitle, bookAuthor, bookYear, waduuelitbanget) {
    return {
        id: +new Date(),
        bookTitle,
        bookAuthor,
        bookYear,
        waduuelitbanget,
    }
}
function findBook(bookId) {
    for(book of books) {
        if(book.id == bookId)
            return book;
    }
    return null;
}
function findBookIndex(bookId) {
    let index = 0;
    for(book of books) {
        if(book.id === bookId)
            return index;
        
        index++;
    }
}
function refreshDataFromBooks() {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

    for(book of books) {
        const newBook = makeBook(book.bookTitle, book.bookAuthor, book.bookYear , book.waduuelitbanget);
        newBook[BOOK_ITEMID] = book.id;

        if(book.waduuelitbanget) {
            bookCompleted.append(newBook);
        }else {
            bookUncompleted.append(newBook);
        }
    }
}