// // Form Handling
// document.getElementById('sellerForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     document.getElementById('otpVerification').style.display = 'block';
//     // Simulate OTP send
//     alert('OTP sent to your mobile number and email');
// });

// document.getElementById('verifyOtp').addEventListener('click', function () {
//     const otp = document.getElementById('otp').value;
//     if (otp.length === 6) {
//         document.getElementById('sellerRegistration').style.display = 'none';
//         document.getElementById('productListing').style.display = 'block';
//     } else {
//         alert('Please enter valid OTP');
//     }
// });

// // Product Form Handling
// document.getElementById('productForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     alert('Product listed successfully!');
//     this.reset();
// });

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

// menuButton.addEventListener('click', toggleSidebar);
// closeButton.addEventListener('click', toggleSidebar);
// overlay.addEventListener('click', toggleSidebar);
//  // Form submission event
//  document.getElementById('sellerForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     document.getElementById('otpVerification').style.display = 'block';
//     document.getElementById('sellerForm').style.display = 'none';
//     // Simulate OTP send
//     alert('OTP sent to your mobile number and email');
// });

// // OTP verification event
// document.getElementById('verifyOtp').addEventListener('click', function() {
//     const otp = document.getElementById('otp').value;
//     if(otp.length === 6) {
//         document.getElementById('otpVerification').style.display = 'none';
//         document.getElementById('passwordCreation').style.display = 'block';
//     } else {
//         document.getElementById('otp').classList.add('input-error');
//         setTimeout(() => {
//             document.getElementById('otp').classList.remove('input-error');
//         }, 500);
//         alert('Please enter valid 6-digit OTP');
//     }
// });

// // Password strength meter
// document.getElementById('password').addEventListener('input', function() {
//     const password = this.value;
//     const strength = document.getElementById('passwordStrength');
    
//     // Simple password strength check
//     if (password.length < 6) {
//         strength.className = 'password-strength strength-weak';
//     } else if (password.length < 10) {
//         strength.className = 'password-strength strength-medium';
//     } else {
//         strength.className = 'password-strength strength-strong';
//     }
// });

// // Password match check
// document.getElementById('confirmPassword').addEventListener('input', function() {
//     const password = document.getElementById('password').value;
//     const confirmPassword = this.value;
//     const matchDisplay = document.getElementById('passwordMatch');
    
//     if (confirmPassword === '') {
//         matchDisplay.textContent = '';
//         matchDisplay.style.color = '';
//     } else if (password === confirmPassword) {
//         matchDisplay.textContent = 'Passwords match';
//         matchDisplay.style.color = '#23d160';
//     } else {
//         matchDisplay.textContent = 'Passwords do not match';
//         matchDisplay.style.color = '#ff3860';
//     }
// });

// // Create account button event
// document.getElementById('createAccount').addEventListener('click', function() {
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;
    
//     if (password.length < 6) {
//         document.getElementById('password').classList.add('input-error');
//         setTimeout(() => {
//             document.getElementById('password').classList.remove('input-error');
//         }, 500);
//         alert('Password must be at least 6 characters long');
//         return;
//     }
    
//     if (password !== confirmPassword) {
//         document.getElementById('confirmPassword').classList.add('input-error');
//         setTimeout(() => {
//             document.getElementById('confirmPassword').classList.remove('input-error');
//         }, 500);
//         alert('Passwords do not match');
//         return;
//     }
    
//     // Redirect to seller profile page
//     window.location.href = 'seller_profile.html';
// });

// // Add Product functionality - redirects to the product form when Add Product button is clicked
// document.addEventListener('DOMContentLoaded', function() {
//     // This will be called if the page had an "Add Product" button from seller_profile.html
//     const addProductBtn = document.querySelector('.add-product-btn');
//     if (addProductBtn) {
//         addProductBtn.addEventListener('click', function(e) {
//             e.preventDefault();
//             window.location.href = 'add_product.html';
//         });
//     }
// });