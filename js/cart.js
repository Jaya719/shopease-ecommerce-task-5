let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];

function saveCart() {
    localStorage.setItem("shopEaseCart", JSON.stringify(cart));
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    alert("Product added to cart!");
}

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
});