// Sample data for current onion prices
const currentPrices = {
  "Brown Onion": 500, // Price per kg
  "Red Onion": 800, // Price per kg
  Garlic: 2000, // Price per kg
};

// Display current prices on page load
window.onload = function () {
  displayCurrentPrices();
};

// Function to display current prices
function displayCurrentPrices() {
  const priceSection = document.createElement("section");
  priceSection.id = "current-prices";
  priceSection.innerHTML = `
        <h2>Current Prices for Onion Categories</h2>
        <ul>
            <li>Brown Onion: ${currentPrices["Brown Onion"]} RWF/kg</li>
            <li>Red Onion: ${currentPrices["Red Onion"]} RWF/kg</li>
            <li>Garlic: ${currentPrices["Garlic"]} RWF/kg</li>
        </ul>
    `;
  document.body.insertBefore(priceSection, document.querySelector("main"));
}

// Event listener for the login form
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Mock login functionality
    if (email === "farmer@example.com" && password === "password123") {
      alert("Login successful!");
      // Redirect or load farmer stock data here
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });

// Event listener for adding produce
document
  .getElementById("produce-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const product = document.getElementById("product").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const price = parseInt(document.getElementById("price").value, 10);

    // Add the produce to the stock table
    addProduceToStock(product, quantity, price);
    this.reset(); // Reset form after submission
  });

// Function to add produce to the stock table
function addProduceToStock(product, quantity, price) {
  const stockTableBody = document.querySelector("#farmer-stock tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td>${product}</td>
        <td>${quantity} kg</td>
        <td>${price} RWF</td>
    `;
  stockTableBody.appendChild(newRow);
}

// Mock function to fetch and display farmer's stock (Placeholder)
function fetchFarmersStock() {
  // In a real application, you would fetch data from a server
  // For now, we will just mock some data
  const sampleStock = [
    { product: "Brown Onion", quantity: 100, price: 500 },
    { product: "Red Onion", quantity: 50, price: 800 },
    { product: "Garlic", quantity: 30, price: 2000 },
  ];

  sampleStock.forEach((item) =>
    addProduceToStock(item.product, item.quantity, item.price)
  );
}

// Call the function to fetch and display the farmer's stock when the page loads
fetchFarmersStock();
