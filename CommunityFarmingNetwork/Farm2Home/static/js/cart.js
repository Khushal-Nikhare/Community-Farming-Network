// Initialize cart variable
let cart = [];

// Function to fetch cart data from the server
async function fetchCart() {
    try {
        const response = await fetch('/get-cart/');
        const data = await response.json();
        if (response.ok) {
            cart = data.cart_items;
            updateCart();
        } else {
            console.error('Failed to fetch cart data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to update the cart UI
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCountEl = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="/" class="continue-shopping">Start Shopping</a>
            </div>
        `;
        updateSummary(0);
        return;
    }

    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.product.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.product.photo.url}" alt="${item.product.name}">
            <div class="item-details">
                <h3 class="item-name">${item.product.name}</h3>
                <p class="item-price">₹${item.product.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                        min="1" onchange="updateQuantity(${index}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <div class="item-total">
                <p>Total: ₹${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    const shipping = subtotal > 20 ? 40 : 0;
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + shipping + tax;

    document.getElementById('cart-count').textContent = `${cart.length} items`;
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `₹${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

async function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity < 1) quantity = 1;
    if (quantity > 99) quantity = 99;

    if (index < 0 || index >= cart.length) {
        console.error('Index out of bounds:', index);
        showToast('Invalid cart item');
        return;
    }

    const item = cart[index];
    item.quantity = quantity;

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const response = await fetch('/update-cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                cart_item_id: item.id,
                quantity: quantity
            })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
            showToast("Quantity updated");
        } else {
            showToast(data.message || 'Failed to update quantity');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred while updating quantity');
    }
}
async function removeItem(index) {
    const item = cart[index];

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const response = await fetch('/remove-from-cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                cart_item_id: item.id
            })
        });

        const data = await response.json();
        if (response.ok) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
            showToast(`${item.product.name} removed from cart`);
        } else {
            showToast(data.message || 'Failed to remove item');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred while removing item');
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Fetch and initialize cart
fetchCart();
