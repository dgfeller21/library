const books = [];
console.log(books);

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = true;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
}

function addBookToLibrary(book) {
    books.push(book)
}

function displayBooks() {

  while (library.firstChild) {
    library.firstChild.remove();
  }
  let num = 0;
  let num2 = 0;
  books.forEach((book) => {
    const bookContainer = document.createElement("div");
    bookContainer.setAttribute("class", "book");
    bookContainer.setAttribute("id", num2++);
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readButton = document.createElement("button");
    readButton.setAttribute("id", num);
    if(book.read === true) {
      readButton.classList.add("myButton", "read");
    } else {
      readButton.classList.add("myButton", "not-read");
    }
    readButton.innerHTML = "read";
    const removeButton = document.createElement("button");
    removeButton.classList.add("myButton", "remove");
    removeButton.setAttribute("id", num);
    removeButton.innerHTML = "remove";
  
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
  
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(readButton);
    bookContainer.appendChild(removeButton);
    library.appendChild(bookContainer);
    num++;
  });

  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener('click', (e) => {
      let id = e.target.id;
      books.splice(id, 1);
      console.log("remove book id: " + id);
      displayBooks();
    });
  });

  document.querySelectorAll(".read, .not-read").forEach((button) => {
    button.addEventListener('click', (e) => {
      button.classList.toggle("not-read");
      button.classList.toggle("read");
      let id = e.target.id;
      console.log(id);
      console.log(books[id]);
      books[id].toggleReadStatus();
    });
  });
  
}
const dialog = document.querySelector("dialog");
const library = document.getElementById("library");
const cancel = document.getElementById("cancel");

const addBookButton = document.getElementById("addButton");
addBookButton.addEventListener("click", e => {
    dialog.showModal();
})


dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  }) 
dialog.addEventListener("submit", e => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    let book = new Book(title, author, pages);
    addBookToLibrary(book);
    console.log(books);
    displayBooks();
})
cancel.addEventListener("click", e=> {
  dialog.close();
})

function toString(book) {
  console.log(book.title + " " + book.author + " " + book.pages);
}