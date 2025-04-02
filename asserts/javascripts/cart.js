function closeCart() {
    window.location.href = "catalog.html";
}

function buyItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
        alert("No items in the cart to proceed with payment.");
        return;
    }

    // Optional: Save data to sessionStorage to use in payment page
    sessionStorage.setItem("checkoutItems", JSON.stringify(cartItems));

    // Redirect to payment page
    window.location.href = "payment.html";
}

function closeFav() {
    window.location.href = confirm("Do you want to go Catalog page? Press Ok for Catalog or cancel for Cart.") 
        ? "catalog.html" 
        : "cart.html";
}

function addToCart(event) {
    let productDiv = event.target.closest(".product");
    let product = {
        name: productDiv.querySelector(".name").innerText,
        price: productDiv.querySelector(".price ins span").innerText,
        image: productDiv.querySelector("img").src,
        discount: productDiv.querySelector(".discount").innerText,
        quantity: 1
    };

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.some(item => item.name === product.name)) {
        alert("Item is already in the cart!");
        return;
    }

    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
    event.target.innerText = "Added";
    event.target.style.backgroundColor = "red";
    event.target.disabled = true;
}

function loadCartItems() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return console.error("Cart container not found");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartContainer.innerHTML = cartItems.length === 0
        ? "<p>No items in the cart.</p>"
        : cartItems.map(item => `
            <div class="cart-item">
                <div class="cart-container">
                    <div class="cart-product">
                        <div class="cart-card">
                            <div class="cart-details">
                                <img src="${item.image}" alt="${item.name}">
                                <div class="cart-info">
                                    <p class="cart-name"><span>Product Name:</span> ${item.name}</p>
                                    <p class="cart-price"><strong>Product Price:</strong> ${item.price} INR/kg</p>
                                    <p class="cart-discount"><strong>Discount:</strong> ${item.discount}% off</p>
                                    <p class="cart-quantity"><strong>Quantity:</strong> 
                                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" /> kg
                                    </p>
                                </div>
                            </div>
                            <hr>
                            <button class="remove-cart-item" onclick="removeFromCart('${item.name}')">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");

    // Update total item count
    document.getElementById("total-items").innerText = cartItems.length;
}

function removeFromCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    loadCartItems();
}

function updateQuantity(productName, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.map(item =>
        item.name === productName ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    loadCartItems();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-cart").forEach(button =>
        button.addEventListener("click", addToCart)
    );
    if (document.getElementById("cart-items")) loadCartItems();
});
