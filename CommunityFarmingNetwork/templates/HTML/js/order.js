
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

// Order tabs functionality
const orderTabs = document.querySelectorAll('.order-tab');
const tabContents = document.querySelectorAll('.tab-content');

orderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        orderTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Load orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const cancelledOrders = JSON.parse(localStorage.getItem('cancelledOrders')) || [];
    const buyAgainItems = JSON.parse(localStorage.getItem('buyAgainItems')) || [];

    // Update My Orders section
    const myOrdersContent = document.getElementById('my-orders');
    if (orders.length > 0) {
        myOrdersContent.innerHTML = orders.map(order => `
          <div class="order-item">
            <img src="${order.image}" alt="${order.name}">
            <div class="order-details">
              <h3>${order.name}</h3>
              <p>Order ID: ${order.id}</p>
              <p>Date: ${order.date}</p>
              <span class="order-status status-delivered">Delivered</span>
            </div>
          </div>
        `).join('');
    }

    // Update Cancelled Orders section
    const cancelledContent = document.getElementById('cancelled');
    if (cancelledOrders.length > 0) {
        cancelledContent.innerHTML = cancelledOrders.map(order => `
          <div class="order-item">
            <img src="${order.image}" alt="${order.name}">
            <div class="order-details">
              <h3>${order.name}</h3>
              <p>Order ID: ${order.id}</p>
              <p>Date: ${order.date}</p>
              <span class="order-status status-cancelled">Cancelled</span>
            </div>
          </div>
        `).join('');
    }

    // Update Buy Again section
    const buyAgainContent = document.getElementById('buy-again');
    if (buyAgainItems.length > 0) {
        buyAgainContent.innerHTML = buyAgainItems.map(item => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="order-details">
              <h3>${item.name}</h3>
              <p>Previously purchased on: ${item.date}</p>
              <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
            </div>
          </div>
        `).join('');
    }
}

// Load orders when page loads
document.addEventListener('DOMContentLoaded', loadOrders);
