// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Sidebar functionality
const menuButton = document.getElementById('menu-button');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

menuButton.addEventListener('click', toggleSidebar);
closeButton.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

// Initialize cart from localStorage
const cartCount = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cart.length;

// Load wishlist items from localStorage
function loadWishlist() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    const wishlistGrid = document.getElementById('wishlistGrid');

    if (wishlistItems.length === 0) {
        wishlistGrid.innerHTML = `
          <div class="empty-wishlist">
            <i class="fas fa-heart-broken"></i>
            <p>Your wishlist is empty</p>
            <a href="index.html" class="continue-shopping">Continue Shopping</a>
          </div>
        `;
        return;
    }

    wishlistGrid.innerHTML = wishlistItems.map((item, index) => `
        <div class="wishlist-item">
          <button class="remove-btn" onclick="removeFromWishlist(${index})">
            <i class="fas fa-times"></i>
          </button>
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <div class="price">${item.price}</div>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="quantity">1</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${index})">
            Add to Cart
          </button>
        </div>
      `).join('');
}

// Remove item from wishlist
function removeFromWishlist(index) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    wishlistItems.splice(index, 1);
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    loadWishlist();
}

// Update quantity
function updateQuantity(index, change) {
    const quantityElement = document.querySelectorAll('.quantity')[index];
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity = Math.max(1, currentQuantity + change);
    quantityElement.textContent = currentQuantity;
}

// Add to cart functionality
function addToCart(index) {
    // Implement add to cart functionality here
    alert('Added to cart!');
}

// Load wishlist when page loads
document.addEventListener('DOMContentLoaded', loadWishlist);
