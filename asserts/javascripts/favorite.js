document.addEventListener("DOMContentLoaded", function () {
    const favoriteList = document.getElementById("favorite-list");
    const removeButton = document.getElementById("remove-button");

    if (!favoriteList) return;

    function loadFavorites() {
        favoriteList.innerHTML = "";
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // ✅ Update total favorites count
        document.getElementById("total-favorites").textContent = favorites.length;

        if (favorites.length === 0) {
            favoriteList.innerHTML = "<p>No favorite products added.</p>";
            return;
        }

        favorites.forEach(fav => {
            const favItem = document.createElement("div");
            favItem.innerHTML = fav.html;
            favoriteList.appendChild(favItem);
        });

        document.querySelectorAll(".remove-fav").forEach(button => {
            button.addEventListener("click", function () {
                removeFavorite(this.getAttribute("data-name"));
            });
        });

        // Highlight favorited items
        document.querySelectorAll(".product").forEach(product => {
            const productName = product.querySelector(".name").textContent;
            if (favorites.some(fav => fav.name === productName)) {
                const favIcon = product.querySelector(".fav-icon i");
                if (favIcon) favIcon.style.color = "red";
            }
        });
    }

    function removeFavorite(name) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(fav => fav.name !== name);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites();
    }

    if (removeButton) {
        removeButton.addEventListener("click", function () {
            if (document.querySelector(".confirm-box")) return;

            const confirmBox = document.createElement("div");
            confirmBox.innerHTML = `
                <div class="confirm-box">
                    <p>Remove all items from wishlist?</p>
                    <button id="confirm-remove">Remove</button>
                    <button id="cancel-remove">Cancel</button>
                </div>
            `;
            document.body.appendChild(confirmBox);

            document.getElementById("confirm-remove").addEventListener("click", function () {
                localStorage.removeItem("favorites");
                loadFavorites();
                document.body.removeChild(confirmBox);
            });

            document.getElementById("cancel-remove").addEventListener("click", function () {
                document.body.removeChild(confirmBox);
            });
        });
    }

    loadFavorites();
});

function toggleFavorite(element) {
    const product = element.closest(".product");
    const productName = product.querySelector(".name").textContent;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favorites.findIndex(fav => fav.name === productName);

    if (index > -1) {
        favorites.splice(index, 1);
        element.querySelector("i").style.color = "";
    } else {
        favorites.push({ name: productName, html: product.outerHTML });
        element.querySelector("i").style.color = "red";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
}

function favouriteItem() {
    const favItemElement = document.getElementById('fav-item');

    if (favItemElement) {
        favItemElement.style.display = 'block';
    }
}
