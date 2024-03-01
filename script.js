document.addEventListener("DOMContentLoaded", function() {
    const inputBook = document.getElementById("inputBook");

    inputBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    if(checkStorage()) {
        loadDatafromStorage();
    }
});
document.addEventListener('ondatasaved', () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
});