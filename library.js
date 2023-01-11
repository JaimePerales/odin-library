/* eslint-disable no-param-reassign */
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
        newBook.classList.add('book-card');

        const testDiv = document.createElement('div');
        testDiv.classList.add('test-div');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('close-button');
        deleteButton.innerHTML = `&times`;
        deleteButton.id = `${i}`;
        deleteButton.addEventListener("click", () => {
            myBooks.splice(i, 1)
            displayMyLibrary(myBooks)
        });
        testDiv.appendChild(deleteButton);

        const bookImg = document.createElement('img');
        bookImg.setAttribute('src', 'book-open-variant.svg');
        testDiv.appendChild(bookImg);

        newBook.appendChild(testDiv);

        const bookTitle = document.createElement('p');
        bookTitle.textContent = myBooks[i].title;
        newBook.appendChild(bookTitle);

        const by = document.createElement('p');
        by.textContent = 'by';
        newBook.appendChild(by);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = myBooks[i].author;
        newBook.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = myBooks[i].pages;
        newBook.appendChild(bookPages);

        const bookRead = document.createElement('div');
        bookRead.classList.add('book-read');
        const bookReadText = document.createElement('p');
        const bookReadCheckbox = document.createElement('input');
        bookReadCheckbox.setAttribute('type', 'checkbox');
        bookReadCheckbox.checked = myBooks[i].read;
        bookReadCheckbox.addEventListener('change', () => {
            if (bookReadCheckbox.checked) {

                myBooks[i].read = true;
                displayMyLibrary(myBooks);
            } else {
                myBooks[i].read = false;
                displayMyLibrary(myBooks);
            }
        });




        bookReadText.textContent = `${myBooks[i].read ? 'Already Read':'Not Yet Read'}`;

        bookRead.appendChild(bookReadCheckbox);
        bookRead.appendChild(bookReadText);

        newBook.appendChild(bookRead);

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
    myLibrary.push(new Book(form.title.value, form.author.value, form.pages.value, form.read.checked))
    displayMyLibrary(myLibrary);
    form.reset();
}



addBookButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
submitButton.addEventListener("click", addBookToLibrary);

displayMyLibrary(myLibrary);