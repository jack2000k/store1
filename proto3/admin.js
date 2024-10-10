// Sample Data for Stock and Orders
let stockData = [
  { product: "Brown Onion", quantity: 1500, price: 500, farmer: "Farmer John" },
  { product: "Red Onion", quantity: 1000, price: 800, farmer: "Farmer Mary" },
  { product: "Garlic", quantity: 500, price: 2000, farmer: "Farmer Steve" },
];

let ordersData = [
  {
    product: "Brown Onion",
    quantity: 200,
    buyer: "Retailer XYZ",
    status: "Pending",
  },
  {
    product: "Red Onion",
    quantity: 150,
    buyer: "Bulk Buyer A",
    status: "Completed",
  },
  {
    product: "Garlic",
    quantity: 100,
    buyer: "Retailer ABC",
    status: "Pending",
  },
];

// Function to load data into stock table
function loadStockTable() {
  const stockTableBody = document.querySelector("#stockTable tbody");
  stockTableBody.innerHTML = ""; // Clear table
  stockData.forEach((stock) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${stock.product}</td>
            <td>${stock.quantity}</td>
            <td>${stock.price}</td>
            <td>${stock.farmer}</td>
            <td>
                <button class="edit-btn" onclick="editStock('${stock.product}')">Edit</button>
                <button class="delete-btn" onclick="deleteStock('${stock.product}')">Delete</button>
            </td>
        `;
    stockTableBody.appendChild(row);
  });

  // Update total stock quantity
  const totalStock = stockData.reduce(
    (total, item) => total + item.quantity,
    0
  );
  document.getElementById("total-stock").innerText = `${totalStock} kg`;
}

// Function to load data into orders table
function loadOrdersTable() {
  const ordersTableBody = document.querySelector("#ordersTable tbody");
  ordersTableBody.innerHTML = ""; // Clear table
  ordersData.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.buyer}</td>
            <td>
                <select onchange="updateOrderStatus('${
                  order.product
                }', this.value)">
                    <option value="Pending" ${
                      order.status === "Pending" ? "selected" : ""
                    }>Pending</option>
                    <option value="Completed" ${
                      order.status === "Completed" ? "selected" : ""
                    }>Completed</option>
                    <option value="Cancelled" ${
                      order.status === "Cancelled" ? "selected" : ""
                    }>Cancelled</option>
                </select>
            </td>
        `;
    ordersTableBody.appendChild(row);
  });

  // Update total orders count
  document.getElementById("total-orders").innerText = ordersData.length;

  // Update pending orders count
  const pendingOrders = ordersData.filter(
    (order) => order.status === "Pending"
  ).length;
  document.getElementById("pending-orders").innerText = pendingOrders;
}

// Function to add new stock item
document.getElementById("add-stock").addEventListener("click", function () {
  const product = prompt("Enter product name:");
  const quantity = prompt("Enter quantity (kg):");
  const price = prompt("Enter price per kg (RWF):");
  const farmer = prompt("Enter farmer's name:");

  if (product && quantity && price && farmer) {
    stockData.push({
      product,
      quantity: parseInt(quantity),
      price: parseInt(price),
      farmer,
    });
    loadStockTable();
    alert("Stock added successfully!");
  }
});

// Function to sort tables
function sortTable(tableId, colIndex) {
  const table = document.getElementById(tableId);
  const rows = Array.from(table.rows).slice(1);
  const sortedRows = rows.sort((a, b) => {
    const cellA = a.cells[colIndex].innerText;
    const cellB = b.cells[colIndex].innerText;

    if (!isNaN(cellA) && !isNaN(cellB)) {
      return Number(cellA) - Number(cellB);
    }
    return cellA.localeCompare(cellB);
  });

  sortedRows.forEach((row) => table.appendChild(row)); // Re-attach sorted rows
}

// Function to search stock
document.getElementById("stock-search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const rows = document.querySelectorAll("#stockTable tbody tr");
  rows.forEach((row) => {
    const cells = row.getElementsByTagName("td");
    const productName = cells[0].innerText.toLowerCase();
    row.style.display = productName.includes(searchTerm) ? "" : "none";
  });
});

// Function to search orders
document.getElementById("orders-search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const rows = document.querySelectorAll("#ordersTable tbody tr");
  rows.forEach((row) => {
    const cells = row.getElementsByTagName("td");
    const productName = cells[0].innerText.toLowerCase();
    row.style.display = productName.includes(searchTerm) ? "" : "none";
  });
});

// Function to update order status
function updateOrderStatus(product, status) {
  const order = ordersData.find((order) => order.product === product);
  if (order) {
    order.status = status;
    alert(`Order status for ${product} updated to ${status}`);
    loadOrdersTable(); // Refresh the orders table
  }
}

// Function to edit stock
function editStock(product) {
  const stock = stockData.find((s) => s.product === product);
  if (stock) {
    const newQuantity = prompt("Enter new quantity (kg):", stock.quantity);
    const newPrice = prompt("Enter new price per kg (RWF):", stock.price);
    if (newQuantity && newPrice) {
      stock.quantity = parseInt(newQuantity);
      stock.price = parseInt(newPrice);
      loadStockTable();
      alert("Stock updated successfully!");
    }
  }
}

// Function to delete stock
function deleteStock(product) {
  const confirmed = confirm(
    `Are you sure you want to delete ${product} from stock?`
  );
  if (confirmed) {
    stockData = stockData.filter((s) => s.product !== product);
    loadStockTable();
    alert(`${product} has been deleted.`);
  }
}

// Function to generate stock report
document
  .getElementById("generate-report")
  .addEventListener("click", function () {
    let report = "Stock Report:\n";
    stockData.forEach((stock) => {
      report += `${stock.product}: ${stock.quantity} kg available at RWF ${stock.price} per kg\n`;
    });
    alert(report);
  });

// Function to manage users (Basic Simulation)
document.getElementById("manage-users").addEventListener("click", function () {
  alert("User management functionality coming soon!");
});

// Load data on page load
window.onload = function () {
  loadStockTable();
  loadOrdersTable();
};
