// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCount = document.getElementById("cart-count");
const subtotalElement = document.getElementById("subtotal");
const shippingElement = document.getElementById("shipping");
const taxElement = document.getElementById("tax");
const totalElement = document.getElementById("total");
const toast = document.getElementById("toast");

function updateCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <a href="index.html" class="continue-shopping">Start Shopping</a>
                </div>
            `;
    updateSummary(0);
    return;
  }

  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-price">₹${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${
      item.quantity - 1
    })">-</button>
                        <input type="number" class="quantity-input" value="${
                          item.quantity
                        }" 
                            min="1" onchange="updateQuantity(${index}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${
      item.quantity + 1
    })">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <div class="item-total">
                    <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
    cartItemsContainer.appendChild(cartItem);
  });

  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + shipping + tax;

  cartCount.textContent = `${cart.length} items`;
  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
  shippingElement.textContent = `₹${shipping.toFixed(2)}`;
  taxElement.textContent = `₹${tax.toFixed(2)}`;
  totalElement.textContent = `₹${total.toFixed(2)}`;
}

function updateQuantity(index, quantity) {
  quantity = parseInt(quantity);
  if (quantity < 1) quantity = 1;
  if (quantity > 99) quantity = 99;

  cart[index].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  showToast("Quantity updated");
}

function removeItem(index) {
  const item = cart[index];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  showToast(`${item.name} removed from cart`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Initialize cart
updateCart();

// Checkout button functionality
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  showToast("Proceeding to checkout...");
  // Add checkout logic here
});
