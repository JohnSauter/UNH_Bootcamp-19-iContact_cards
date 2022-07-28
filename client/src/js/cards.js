import { initDb, postDb, getAllDb, deleteDb } from "./database";

const form = document.getElementById("contact-form");

// Adds deleteCard() to the global scope so each card has access to it.
window.deleteCard = (e) => {
  // Grabs the id from the button element attached to the contact card.
  console.log(e);
  let id = parseInt(e.id);

  // Delete the card
  deleteDb(id);

  // Reload the DOM
  fetchCards();
};

form.addEventListener("submit", (event) => {
  // handle the form data
  event.preventDefault();
  const name = form.elements["name"].value;
  const home_phone = form.elements["home-phone"].value;
  const cell_phone = form.elements["cell-phone"].value;
  const email = form.elements["email"].value;

  // Post form data to IndexedDB
  postDb({name, home_phone, cell_phone, email});

  // Submit the form
  form.reset();

  // Reload the DOM
  fetchCards();
});

const fetchCards = async () => {
  // Grab card data from IndexedDB
  const result = await getAllDb();

  let card = ` `;

  // Loop through the data and create the contact card
  if (result != null) {
    for (let i = 0;i<result.length;i++) {
      const data = result[i].contact;
      const data_id = result[i].id;
      console.log(data);
      card += `
    <div class="card card-rounded col-md-3 m-2">
      <div class="card-header card-rounded">
        <h1>${data.name}</h1>
      </div>
      <div class="card-body">
        <p>Home Phone: ${data.home_phone}</p>
        <p>Cell Phone: ${data.cell_phone}</p>
        <p>Email: ${data.email}</p>
      </div>
      <div class="flex-row justify-flex-end p-1">
        <button class="btn btn-sm btn-danger" id="${data_id}" onclick="deleteCard(this)">Delete</button>
      </div>
    </div>
    `;
    }
  }

  // Setting innerHTML as card variable
  document.getElementById("card-group").innerHTML = card;
};

/* Initialize the database, then fetch the cards.  */
initDb(fetchCards);
