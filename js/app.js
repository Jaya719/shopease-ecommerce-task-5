function displayProducts(productList, containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>₹${product.price.toLocaleString("en-IN")}</p>
                <a href="product-details.html?id=${product.id}">View Details</a>
                <button class="add-cart-btn" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function initializeApp() {
    displayProducts(products.slice(0, 4), "featured-products");
    updateCartCount();
}

window.initializeApp = initializeApp;

document.addEventListener("DOMContentLoaded", initializeApp);

// Add-to-cart click handler only once
if (!window.shopEaseClickHandlerAdded) {
    document.addEventListener("click", function(event) {
        const button = event.target.closest(".add-cart-btn");

        if (button) {
            addToCart(Number(button.dataset.productId));
        }
    });

    window.shopEaseClickHandlerAdded = true;
}