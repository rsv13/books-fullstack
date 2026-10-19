// Find the empty <ul> on the page so we can fill it with books.
const bookList = document.getElementById("bookList");

// Ask the GraphQL API for all books, then show them on the page.
async function loadBooks() {
  // The query — same one you've run in Sandbox, just sent by code.
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
    li.textContent = `${book.title} — ${book.author}`;
    bookList.appendChild(li);
  }
}

// Run it as soon as the page loads.
loadBooks();