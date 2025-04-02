function addToCart(event) {
    console.log("Adding item to cart...");

    // Find the closest product container
    let productDiv = event.target.closest(".product");

    // Extract product details dynamically
    let product = {
        name: productDiv.querySelector(".name").innerText,
        price: productDiv.querySelector(".price ins span").innerText,
        image: productDiv.querySelector("img").src,
        discount: productDiv.querySelector(".discount").innerText,
        quantity: 1 // Default quantity
    };

    // Retrieve existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the item is already in the cart
    let existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
        alert("Item is already in the cart!");
        return;
    }

    // Add new item to cart
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    
    // Change the button color to red and update the text
    let addToCartButton = productDiv.querySelector(".add-cart p");
    addToCartButton.style.backgroundColor = "red";
    addToCartButton.innerText = "Added";

    alert(`${product.name} added to cart!`);
    console.log("Updated Cart:", cartItems);
}

// File: asserts/javascripts/search.js
function searchItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    let found = false;
    products.forEach(product => {
        const name = product.querySelector('.name').innerText.toLowerCase();
        if (name.includes(input)) {
            product.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
        }
    });

    if (!found) {
        alert('No matching product found!');
    }
}

// Handle Enter key
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchItems();
        }
    });
}
