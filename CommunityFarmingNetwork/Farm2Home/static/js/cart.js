// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountEl = document.getElementById('cart-count');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const toastEl = document.getElementById('toast');

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items
function displayCart() {
  // Update cart count
  updateCartCount();
  
  // If cart is empty, show empty cart message
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a href="/categories/" class="continue-shopping">Continue Shopping</a>
      </div>
    `;
    
    // Update summary to zeros
    updateSummary(0, 0, 0, 0);
    return;
  }
  
  // Clear container first
  cartItemsContainer.innerHTML = '';
  
  // Calculate subtotal
  let subtotal = 0;
  
  // Add each item to the cart container
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    const cartItemEl = document.createElement('div');
    cartItemEl.className = 'cart-item';
    cartItemEl.dataset.itemId = item.id;
    
    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">₹${item.price}</p>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
            onchange="updateItemQuantity('${item.id}', this.value)" />
          <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem('${item.id}')">
          <i class="fas fa-trash"></i> Remove
        </button>
      </div>
      <div class="item-total">
        <p>Total: ₹${itemTotal}</p>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItemEl);
  });
  
  // Update order summary
  const shipping = subtotal > 0 ? 40 : 0;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  updateSummary(subtotal, shipping, tax, total);
}

// Update item quantity
function updateItemQuantity(id, newQuantity) {
  newQuantity = parseInt(newQuantity);
  
  // Remove item if quantity is 0 or less
  if (newQuantity <= 0) {
    removeItem(id);
    return;
  }
  
  // Find the item and update quantity
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show toast
    showToast(`Updated quantity for ${cart[itemIndex].name}`);
    
    // Refresh cart display
    displayCart();
  }
}

// Remove item from cart
function removeItem(id) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    const itemName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show toast
    showToast(`Removed ${itemName} from cart`);
    
    // Refresh cart display
    displayCart();
  }
}

// Update cart count in navbar
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
}

// Update order summary
function updateSummary(subtotal, shipping, tax, total) {
  subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
  shippingEl.textContent = `₹${shipping.toFixed(2)}`;
  taxEl.textContent = `₹${tax.toFixed(2)}`;
  totalEl.textContent = `₹${total.toFixed(2)}`;
}

// Show toast notification
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}

// Checkout button
document.querySelector('.checkout-btn').addEventListener('click', function() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  
  // Here you would normally redirect to checkout page
  showToast('Proceeding to checkout...');
  // window.location.href = '/checkout/';
});

// Initialize the cart on page load
document.addEventListener('DOMContentLoaded', function() {
  displayCart();
});
