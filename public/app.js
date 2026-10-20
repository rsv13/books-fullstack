// Find the empty <ul> on the page so we can fill it with books.
const bookList = document.getElementById("bookList");

// Ask the GraphQL API for all books, then show them on the page.
async function loadBooks() {
  const query = `
    query {
      books {
        id
        title
        author
      }
    }
  `;

  // Send the query to our own /graphql endpoint.
  const response = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  // Turn the reply into an object and dig out the list of books.
  const result = await response.json();
  const books = result.data.books;

  // Build a list item for each book and put it on the page.
  bookList.innerHTML = "";
  for (const book of books) {
    const li = document.createElement("li");
    li.textContent = ` ${book.title} — ${book.author} `;
    

    // A delete button for this specific book.
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteBook(book.id));

        li.appendChild(deleteButton);
        bookList.appendChild(li);
  }
}

// Run it as soon as the page loads.
loadBooks();

// --- Add-a-book form ---

// Find the form and its inputs.
const addForm = document.getElementById("addForm");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");

// When the form is submitted, send an addBook mutation, then refresh the list.
addForm.addEventListener("submit", async (event) => {
  // Stop the browser's default form behaviour (which would reload the page).
  event.preventDefault();

  // The mutation, with the typed values passed as variables.
  const mutation = `
    mutation AddBook($title: String!, $author: String!) {
      addBook(title: $title, author: $author) {
        id
      }
    }
  `;

  await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables: { title: titleInput.value, author: authorInput.value },
    }),
  });

  // Clear the inputs and reload the list so the new book shows.
  titleInput.value = "";
  authorInput.value = "";
  loadBooks();
});

// Send a deleteBook mutation for the given id, then refresh the list.
async function deleteBook(id) {
  const mutation = `
    mutation DeleteBook($id: ID!) {
      deleteBook(id: $id) {
        id
      }
    }
  `;

  await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables: { id },
    }),
  });

  loadBooks();
}