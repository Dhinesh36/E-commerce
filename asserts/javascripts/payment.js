function loadPaymentSummary() {
    const items = JSON.parse(sessionStorage.getItem("checkoutItems")) || [];
    const summary = document.getElementById("order-summary");
    const totalAmount = document.getElementById("total-amount");
    let total = 0;
  
    if (items.length === 0) {
      summary.innerHTML = "<p>No items found for payment.</p>";
      return;
    }
  
    const listHtml = items.map(item => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const itemTotal = price * quantity;
      total += itemTotal;
      return `
        <div class="order-item">
          <div>${item.name} (${quantity}KG)</div>
          <div>₹${itemTotal.toFixed(2)}</div>
        </div>
      `;
    }).join("");
  
    summary.innerHTML += listHtml;
    totalAmount.innerText = `Total: ₹${total.toFixed(2)}`;
  }
  
  function togglePaymentMethod() {
    const method = document.getElementById("payment-method").value;
    document.getElementById("upi-section").style.display = method === "upi" ? "block" : "none";
    document.getElementById("card-section").style.display = method === "card" ? "block" : "none";
  }
  
  function processPayment(event) {
    event.preventDefault();
  
    const name = document.getElementById("fullname").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const method = document.getElementById("payment-method").value;
  
    if (!name || !address || !phone || !method) {
      alert("Please fill in all required fields.");
      return;
    }
  
    localStorage.removeItem("cartItems");
    sessionStorage.removeItem("checkoutItems");
  
    document.getElementById("popup-message").classList.remove("hidden");
  }
  
  function closePopup() {
    document.getElementById("popup-message").classList.add("hidden");
    location.reload(); // Refresh the current page
  }
  
  function cancelPayment() {
    if (confirm("Are you sure you want to cancel the payment and go back to the catalog?")) {
      window.location.href = "catalog.html";
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadPaymentSummary);
  