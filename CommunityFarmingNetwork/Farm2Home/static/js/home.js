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

// Enhanced carousel with smooth transitions
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const leftButton = document.querySelector('.left-btn');
const rightButton = document.querySelector('.right-btn');
let index = 0;

function updateCarousel() {
    // Hide all images
    slideImages.forEach(img => {
        img.classList.remove('active');
    });

    // Show current image
    slideImages[index].classList.add('active');

    // Update dots if they exist
    if (document.querySelectorAll('.dot').length > 0) {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

function nextSlide() {
    index = (index < slideImages.length - 1) ? index + 1 : 0;
    updateCarousel();
}

function prevSlide() {
    index = (index > 0) ? index - 1 : slideImages.length - 1;
    updateCarousel();
}

// Initialize carousel
leftButton.addEventListener('click', prevSlide);
rightButton.addEventListener('click', nextSlide);

// Initialize first slide
updateCarousel();

// Auto-advance carousel with pause on hover
let carouselInterval = setInterval(nextSlide, 5000);

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carousel.addEventListener('mouseleave', () => carouselInterval = setInterval(nextSlide, 5000));

// Enhanced shopping cart functionality with localStorage
// const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cart.length;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        const product = button.parentElement;
        const productLink = product.querySelector('.product-link');
        const productName = productLink.querySelector('h4').textContent;
        const productPrice = parseFloat(productLink.querySelector('.price').textContent.replace('$', ''));
        const productImage = productLink.querySelector('img').src;

        // Create cart item
        const cartItem = {
            name: productName,
            price: productPrice,
            image: productImage,
            style: 'Standard',
            quantity: 1
        };

        // Add to cart array and update localStorage
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count with animation
        cartCount.textContent = cart.length;
        cartCount.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);

        // Enhanced button animation
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#232F3E';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '';
        }, 200);

        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = `${productName} added to cart!`;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = '#232F3E';
        toast.style.color = '#fff';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Search suggestions functionality
const searchBar = document.querySelector('.search-bar');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'search-suggestions';
document.querySelector('.search-container').appendChild(suggestionsContainer);

// Sample product suggestions
const productSuggestions = [
    'Fresh Tomatoes',
    'Organic Apples',
    'Organic Rice',
    'Farm Fresh Eggs',
    'Organic Milk',
    'Fresh Spinach',
    'Sweet Potatoes',
    'Organic Honey',
    'Fresh Carrots',
    'Whole Wheat Bread'
];

searchBar.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    suggestionsContainer.innerHTML = '';

    if (query.length > 1) {
        const filteredSuggestions = productSuggestions.filter(item =>
            item.toLowerCase().includes(query)
        );

        if (filteredSuggestions.length > 0) {
            suggestionsContainer.classList.add('active');

            filteredSuggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = suggestion;

                item.addEventListener('click', function () {
                    searchBar.value = suggestion;
                    suggestionsContainer.classList.remove('active');
                });

                suggestionsContainer.appendChild(item);
            });
        } else {
            suggestionsContainer.classList.remove('active');
        }
    } else {
        suggestionsContainer.classList.remove('active');
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-container')) {
        suggestionsContainer.classList.remove('active');
    }
});

// Fetch CSRF token from cookie
async function addToCart(productId) {
    try {
        // Check if productId is a string (identifier) or number (database ID)
        if (typeof productId === 'string') {
            // Client-side approach using localStorage for static products
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Find the product details from the DOM
            const productCard = document.querySelector(`.product-card button[onclick*="${productId}"]`).closest('.product-card');
            const productLink = productCard.querySelector('.product-link');
            const name = productLink.querySelector('h4').textContent;
            const price = parseInt(productLink.querySelector('.price').textContent.replace('₹', '').replace('/kg', ''));
            const image = productLink.querySelector('img').src;
            
            // Check if product already exists in cart
            let existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                // Increase quantity if item already in cart
                existingItem.quantity += 1;
            } else {
                // Add new item to cart
                cart.push({
                    id: productId,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count in DOM
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
            
            // Show toast notification
            showAddedToCartMessage(name);
            
            return;
        }
        
        // If productId is a number, use the original server-side approach
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const response = await fetch('/add-to-cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: 1
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Update cart count
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = data.cart_count;

            // Show success message
            // alert('Product added to cart successfully!');
        } else {
            if (data.error === "login_required") {
                window.location.href = '/login/';
            } else {
                alert(data.message || 'Failed to add product to cart');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Show message when product is added to cart
function showAddedToCartMessage(productName) {
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `${productName} added to cart!`;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#27ae60',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.3s, transform 0.3s'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}