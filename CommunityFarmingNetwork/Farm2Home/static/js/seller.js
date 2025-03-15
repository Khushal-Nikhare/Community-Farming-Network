// Form Handling
document.getElementById('sellerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('otpVerification').style.display = 'block';
    // Simulate OTP send
    alert('OTP sent to your mobile number and email');
});

document.getElementById('verifyOtp').addEventListener('click', function () {
    const otp = document.getElementById('otp').value;
    if (otp.length === 6) {
        document.getElementById('sellerRegistration').style.display = 'none';
        document.getElementById('productListing').style.display = 'block';
    } else {
        alert('Please enter valid OTP');
    }
});

// Product Form Handling
document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Product listed successfully!');
    this.reset();
});

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
