const UNCOMPLETED_BOOK_ID = 'incompletedBookList';
const COMPLETED_BOOK_ID = 'completedBookList';
const BOOK_ITEMID = 'itemId';

function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);

    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    
    const book = makeBook(bookTitle, bookAuthor, bookYear, false);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false)

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedBookList.append(book);
    updateDataToStorage(); 
}
function makeBook(txtTitle, txtAuthor, txtYear, waduuelitbanget) {
    const bookTitle = document.createElement('h2');
    bookTitle.innerText = txtTitle;
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = txtAuthor;
    const bookYear = document.createElement('p');
    bookYear.innerText = txtYear;
    bookYear.classList.add("year");

    const bookContainerTitle = document.createElement('div');
    bookContainerTitle.classList.add('title');
    bookContainerTitle.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement('div');
    container.classList.add('bookItem');
    container.append(bookContainerTitle);

    if(waduuelitbanget){
        container.append(createUnreadButton(), createTrashButton());
    } else {
        container.append(createReadButton(), createTrashButton());
    }
    return container;

}
function createButton(buttonTypeClass, textButton, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}
function addBookToCompleted(bookElement) {
    const ppTitle = bookElement.querySelector(".title > h2").innerText;
    const ppAuthor = bookElement.querySelector(".title > p").innerText;
    const ppYear = bookElement.querySelector(".title > p.year").innerText;

    const newBook = makeBook(ppTitle, ppAuthor, ppYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.waduuelitbanget = true;
    newBook[BOOK_ITEMID] = book.id;

    const alreadyBook = document.getElementById(COMPLETED_BOOK_ID);
    alreadyBook.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}
function createReadButton() {
    return createButton('read-button', 'Selesai dibaca', function(event) {
        addBookToCompleted(event.target.parentElement);
    });
}
function createUnreadButton() {
    return createButton("unread-button",'Belum selesai dibaca', function(event) {
        undoBookFromCompleted(event.target.parentElement);
    });
}
function createTrashButton() {
    return createButton('trash-button', 'Hapus buku', function(event) {
        removeBookFromCompleted(event.target.parentElement);
    });
}
function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    bookElement.remove();
    updateDataToStorage();
}
function undoBookFromCompleted(bookElement) {
    const ppTitle = bookElement.querySelector(".title > h2").innerText;
    const ppAuthor = bookElement.querySelector(".title > p").innerText;
    const ppYear = bookElement.querySelector(".title > p.year").innerText;

    const newBook = makeBook(ppTitle, ppAuthor, ppYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.waduuelitbanget = false;
    newBook[BOOK_ITEMID] = book.id;

    const unalreadyBook = document.getElementById(UNCOMPLETED_BOOK_ID);
    unalreadyBook.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}