
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

// Help form submission
const helpForm = document.getElementById('helpForm');
const suggestions = document.getElementById('suggestions');
const suggestionList = document.getElementById('suggestionList');

helpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const problem = document.getElementById('problem').value.toLowerCase();

    // Show suggestions section
    suggestions.style.display = 'block';

    // Clear previous suggestions
    suggestionList.innerHTML = '';

    // Generate suggestions based on category and problem description
    let suggestionsArray = [];

    if (category === 'order') {
        suggestionsArray = [
            {
                title: 'Check Order Status',
                content: 'You can track your order status in the "My Orders" section of your account. Orders typically take 24-48 hours to process.'
            },
            {
                title: 'Order Not Received',
                content: 'If your order shows as delivered but you haven\'t received it, please wait 24 hours as it might be with a neighbor or in a safe place.'
            },
            {
                title: 'Cancel an Order',
                content: 'You can cancel an order within 1 hour of placing it. Go to "My Orders" and select the cancel option if available.'
            }
        ];
    } else if (category === 'delivery') {
        suggestionsArray = [
            {
                title: 'Delivery Delays',
                content: 'Deliveries may be delayed due to weather conditions or high order volumes. Check your tracking information for updates.'
            },
            {
                title: 'Change Delivery Address',
                content: 'You can change your delivery address before your order is processed. Contact customer support immediately for assistance.'
            },
            {
                title: 'Damaged Items',
                content: 'If your items arrived damaged, please take photos and contact us within 24 hours of delivery for a replacement or refund.'
            }
        ];
    } else if (category === 'product') {
        suggestionsArray = [
            {
                title: 'Product Quality Issues',
                content: 'If you\'re not satisfied with the quality of your products, please take photos and contact us within 24 hours of delivery.'
            },
            {
                title: 'Wrong Product Received',
                content: 'If you received the wrong product, please contact customer support with your order number and details of the issue.'
            },
            {
                title: 'Product Information',
                content: 'For detailed product information, check the product description page or contact the seller directly through the product page.'
            }
        ];
    } else if (category === 'account') {
        suggestionsArray = [
            {
                title: 'Reset Password',
                content: 'You can reset your password by clicking "Forgot Password" on the login page. A reset link will be sent to your email.'
            },
            {
                title: 'Update Account Information',
                content: 'To update your account information, go to "Your Profile" in the menu and select "Edit Profile".'
            },
            {
                title: 'Account Security',
                content: 'For security concerns, change your password immediately and contact customer support if you notice any suspicious activity.'
            }
        ];
    } else if (category === 'payment') {
        suggestionsArray = [
            {
                title: 'Payment Failed',
                content: 'If your payment failed, please check your card details and try again. Contact your bank if the issue persists.'
            },
            {
                title: 'Double Charged',
                content: 'If you were charged twice, please check if you received two order confirmations. If not, contact us with your order details.'
            },
            {
                title: 'Add Payment Method',
                content: 'You can add or update payment methods in the "Payment Options" section of your account settings.'
            }
        ];
    } else {
        suggestionsArray = [
            {
                title: 'Contact Customer Support',
                content: 'For issues not covered in our help topics, please contact our customer support team directly at support@farm2home.com.'
            },
            {
                title: 'Visit FAQ Section',
                content: 'Check our comprehensive FAQ section for answers to common questions about our services and policies.'
            },
            {
                title: 'Live Chat Support',
                content: 'Our live chat support is available Monday to Friday, 9 AM to 6 PM. Click the chat icon in the bottom right corner of the page.'
            }
        ];
    }

    // Add suggestions to the list
    suggestionsArray.forEach(suggestion => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.innerHTML = `
          <div class="suggestion-icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <div class="suggestion-content">
            <h4>${suggestion.title}</h4>
            <p>${suggestion.content}</p>
          </div>
        `;
        suggestionList.appendChild(li);
    });

    // Scroll to suggestions
    suggestions.scrollIntoView({ behavior: 'smooth' });
});
