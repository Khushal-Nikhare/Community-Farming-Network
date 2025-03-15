
// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Parse URL parameters to get product data
function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }

    return params;
}

// Load product data from URL parameters
function loadProductData() {
    const params = getUrlParams();

    // If we have product parameters, update the page content
    if (params.name) {
        // Product name and title
        document.querySelector('.product-title').textContent = params.name;
        document.title = `${params.name} - Farm2Home`;

        // Product price
        if (params.price) {
            const price = parseFloat(params.price);
            const originalPrice = (price * 1.33).toFixed(2); // Original price is 33% higher for this example
            document.querySelector('.price').textContent = `$${params.price}/kg`;
            document.querySelector('.original-price').textContent = `$${originalPrice}/kg`;
        }

        // Product image
        if (params.image) {
            const mainImage = document.querySelector('.main-image');
            const thumbnails = document.querySelectorAll('.thumbnail');

            mainImage.src = params.image;
            mainImage.alt = params.name;

            // Update thumbnails - for now, just use the same image
            thumbnails.forEach(thumb => {
                thumb.src = params.image;
                thumb.alt = params.name;
            });
        }

        // Update about section if description is provided
        if (params.description) {
            const aboutText = document.querySelector('.about-text');
            if (aboutText) {
                // Start with the basic description
                let fullDescription = params.description + '. ';

                // Add product-type specific details based on ID
                if (params.id === 'tomatoes') {
                    fullDescription += 'These premium fresh tomatoes are organically grown at our partner farms using sustainable farming practices. Harvested at peak ripeness to ensure maximum flavor and nutritional value. Our tomatoes are known for their bright red color, juicy texture, and perfect balance of sweetness and acidity.';
                } else if (params.id === 'apples') {
                    fullDescription += 'Our organic apples are grown in pristine orchards without the use of synthetic pesticides or fertilizers. Each apple is handpicked at perfect ripeness to ensure the best flavor and nutritional benefits. These apples have a perfect balance of sweetness and tartness.';
                } else if (params.id === 'rice') {
                    fullDescription += 'This premium organic rice is cultivated using traditional farming methods that respect the environment. The grains are carefully harvested and processed to maintain their nutritional integrity and natural flavor. Perfect for a variety of dishes.';
                } else {
                    fullDescription += 'This premium product is sourced from the best farms with a focus on quality and sustainability. We ensure that all our products meet the highest standards of freshness and taste.';
                }

                aboutText.textContent = fullDescription;
            }
        }

        // Update product details based on product ID
        const detailsList = document.querySelector('.details-list');
        if (detailsList && params.id) {
            detailsList.innerHTML = ''; // Clear existing details

            let details = [];

            if (params.id === 'tomatoes') {
                details = [
                    'Farm-fresh premium quality tomatoes',
                    'Harvested daily for maximum freshness',
                    'Naturally ripened and chemical-free',
                    'Rich in vitamins and antioxidants',
                    'Perfect for salads and cooking'
                ];
            } else if (params.id === 'apples') {
                details = [
                    'Organically grown premium apples',
                    'No synthetic pesticides or chemicals',
                    'Rich in fiber and essential nutrients',
                    'Harvested at peak ripeness',
                    'Sweet and crisp texture'
                ];
            } else if (params.id === 'rice') {
                details = [
                    'Premium organic rice grains',
                    'Grown using sustainable farming practices',
                    'No artificial fertilizers or pesticides',
                    'High nutritional value',
                    'Perfect for everyday cooking'
                ];
            } else {
                details = [
                    'Premium quality product',
                    'Sourced from certified organic farms',
                    'Free from harmful chemicals',
                    'Rich in nutritional value',
                    'Carefully handled and packaged'
                ];
            }

            // Add details to the list
            details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                detailsList.appendChild(li);
            });
        }
    }
}

// Call loadProductData when the page loads
window.addEventListener('DOMContentLoaded', loadProductData);

// Update similar products based on current product
function updateSimilarProducts() {
    const params = getUrlParams();
    const similarProductsGrid = document.querySelector('.similar-products-grid');

    if (!similarProductsGrid || !params.id) return;

    // Clear existing similar products
    similarProductsGrid.innerHTML = '';

    // Define similar products based on current product ID
    let similarProducts = [];

    if (params.id === 'tomatoes') {
        similarProducts = [
            { name: 'Capsicum', description: 'Fresh bell peppers', price: 3.99, image: 'capsicum.jpg' },
            { name: 'Cucumber', description: 'Organic cucumbers', price: 2.49, image: 'cucumber.jpg' },
            { name: 'Red Onions', description: 'Premium quality onions', price: 1.99, image: 'onions.jpg' },
            { name: 'Mixed Vegetables', description: 'Assorted fresh vegetables', price: 8.99, image: 'vegetables.jpg' }
        ];
    } else if (params.id === 'apples') {
        similarProducts = [
            { name: 'Oranges', description: 'Sweet and juicy', price: 4.29, image: 'oranges.jpg' },
            { name: 'Bananas', description: 'Organic bananas', price: 1.99, image: 'bananas.jpg' },
            { name: 'Strawberries', description: 'Fresh strawberries', price: 5.49, image: 'strawberries.jpg' },
            { name: 'Grapes', description: 'Seedless grapes', price: 6.99, image: 'grapes.jpg' }
        ];
    } else if (params.id === 'rice') {
        similarProducts = [
            { name: 'Wheat Flour', description: 'Organic whole wheat', price: 4.49, image: 'wheat.jpg' },
            { name: 'Quinoa', description: 'Premium quinoa', price: 7.99, image: 'quinoa.jpg' },
            { name: 'Oats', description: 'Organic rolled oats', price: 3.49, image: 'oats.jpg' },
            { name: 'Brown Rice', description: 'Organic brown rice', price: 6.99, image: 'brown-rice.jpg' }
        ];
    } else {
        // Default similar products if product ID is not recognized
        similarProducts = [
            { name: 'Fresh Vegetables', description: 'Assorted vegetables', price: 8.99, image: 'vegetables.jpg' },
            { name: 'Organic Fruits', description: 'Mixed fruits pack', price: 9.99, image: 'fruits.jpg' },
            { name: 'Premium Grains', description: 'Organic grains mix', price: 7.49, image: 'grains.jpg' },
            { name: 'Farm Fresh Eggs', description: 'Free-range eggs', price: 4.99, image: 'eggs.jpg' }
        ];
    }

    // Create and append similar product cards
    similarProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Create link to product page with parameters
        const productHref = `product.html?id=${product.name.toLowerCase().replace(/ /g, '-')}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${product.image}&description=${encodeURIComponent(product.description)}`;

        productCard.innerHTML = `
                    <a href="${productHref}" class="product-link">
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <div class="price">$${product.price.toFixed(2)}/kg</div>
                    </a>
                    <button class="add-to-cart">Add to Cart</button>
                `;

        similarProductsGrid.appendChild(productCard);
    });

    // Reattach event listeners for the new add to cart buttons
    attachAddToCartListeners();
}

// Helper function to attach event listeners to add to cart buttons
function attachAddToCartListeners() {
    document.querySelectorAll('.similar-products .add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productLink = product.querySelector('a');
            const productName = product.querySelector('h4').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
            const productImage = product.querySelector('img').src;

            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                style: 'Standard',
                quantity: 1
            };

            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            cartCount.textContent = cart.length;
            cartCount.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);

            button.style.transform = 'scale(0.95)';
            button.style.backgroundColor = '#232F3E';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.backgroundColor = '';
            }, 200);

            // Show success message
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="fas fa-check-circle"></i> ${productName} added to cart!`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);

            // Prevent navigation when adding to cart
            event.preventDefault();
            event.stopPropagation();
        });
    });
}

// Call updateSimilarProducts after loadProductData
window.addEventListener('DOMContentLoaded', () => {
    loadProductData();
    updateSimilarProducts();
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

// Thumbnail click handler
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        // Update main image with animation
        const mainImage = document.querySelector('.main-image');
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = thumb.src;
            mainImage.style.opacity = '1';
        }, 300);
    });
});

// Add to cart functionality
document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    // Get product details from the page
    const product = {
        name: document.querySelector('.product-title').textContent,
        price: parseFloat(document.querySelector('.price').textContent.replace('$', '')),
        image: document.querySelector('.main-image').src,
        style: 'Standard',
        quantity: 1
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count with animation
    cartCount.textContent = cart.length;
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);

    // Button animation
    const button = document.querySelector('.add-to-cart-btn');
    button.style.transform = 'scale(0.95)';
    button.style.backgroundColor = '#232F3E';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.style.backgroundColor = '';
    }, 200);

    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${product.name} added to cart!`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
});

// Buy Now button functionality
document.querySelector('.buy-now-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Here you would redirect to the checkout page
});

// Wishlist functionality
function addToWishlist(button) {
    const params = getUrlParams();
    const product = {
        id: params.id || 'default',
        name: params.name || document.querySelector('.product-title').textContent,
        price: params.price || document.querySelector('.price').textContent,
        image: params.image || document.querySelector('.main-image').src
    };

    // Get existing wishlist items from localStorage
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');

    // Check if product already exists in wishlist
    const existingIndex = wishlistItems.findIndex(item => item.id === product.id);

    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);

    if (existingIndex === -1) {
        // Add new item to wishlist
        wishlistItems.push(product);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

        // Update button state
        button.classList.add('active');
        button.querySelector('span').textContent = 'Added to Wishlist';
        button.querySelector('i').classList.remove('fa-heart');
        button.querySelector('i').classList.add('fa-heart');

        // Show success message
        showToast('Added to wishlist successfully!', 'success');
    } else {
        // Remove item from wishlist
        wishlistItems.splice(existingIndex, 1);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

        // Update button state
        button.classList.remove('active');
        button.querySelector('span').textContent = 'Add to Wishlist';
        button.querySelector('i').classList.remove('fa-heart');
        button.querySelector('i').classList.add('fa-heart');

        // Show removal message
        showToast('Removed from wishlist', 'info');
    }
}

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Check if item is in wishlist on page load
document.addEventListener('DOMContentLoaded', () => {
    const params = getUrlParams();
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    const existingIndex = wishlistItems.findIndex(item => item.id === params.id);

    if (existingIndex !== -1) {
        const button = document.querySelector('.wishlist-btn');
        button.classList.add('active');
        button.querySelector('span').textContent = 'Added to Wishlist';
    }
});
