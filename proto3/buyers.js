// Sample data for available onion prices
const onionPrices = {
  "Brown Onion": 500, // RWF per kg
  "Red Onion": 800, // RWF per kg
  Garlic: 2000, // RWF per kg
};

// Function to populate the stock table with existing produce
function populateStockTable() {
  const stockTableBody = document
    .getElementById("stockTable")
    .querySelector("tbody");
  stockTableBody.innerHTML = ""; // Clear existing rows

  // Loop through the available onion prices and create table rows
  for (const [product, price] of Object.entries(onionPrices)) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product}</td>
            <td>${price} RWF</td>
        `;
    stockTableBody.appendChild(row);
  }
}

// Handle form submission
document
  .getElementById("request-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const productType = document.getElementById("productType").value;
    const quantity = document.getElementById("quantity").value;
    const location = document.getElementById("location").value;

    // Validate inputs
    if (!productType || !quantity || !location) {
      alert("Please fill in all fields.");
      return;
    }

    // Display confirmation message
    alert(
      `Request submitted for ${quantity} kg of ${productType} to be delivered to ${location}.`
    );

    // Optionally reset the form
    document.getElementById("request-form").reset();
  });

// Populate the stock table on page load
window.onload = populateStockTable;
