// Holds all books
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {

        return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'already read':'not yet read'}`
    }
}

const addBookPopUp = document.querySelector(".modal");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-btn");
const bookCards = document.querySelector(".book-cards");
const form = document.querySelector("#form");

// Displays books in myLibrary as cards.
function displayMyLibrary(myBooks) {
    while (bookCards.firstChild) {
        bookCards.firstChild.remove()
    }
    for (let i = 0; i < myBooks.length; i += 1) {
        const newBook = document.createElement('div');
        const h = document.createElement("H1");
        let t = document.createTextNode(myBooks[i].title);
        h.appendChild(t);
        t = document.createTextNode(myBooks[i].author);
        h.appendChild(t);
        t = document.createTextNode(myBooks[i].pages);
        h.appendChild(t);
        t = document.createTextNode(myBooks[i].read);
        h.appendChild(t);
        newBook.appendChild(h);
        bookCards.appendChild(newBook);
    }
}

function toggleModal() {
    addBookPopUp.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === addBookPopUp) {
        toggleModal();
    }
}

function addBookToLibrary(event) {
    event.preventDefault();
    toggleModal();
    myLibrary.push(new Book(form.title.value, form.author.value, form.pages.value, true))
    displayMyLibrary(myLibrary);
    form.reset();
}

addBookButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
submitButton.addEventListener("click", addBookToLibrary);