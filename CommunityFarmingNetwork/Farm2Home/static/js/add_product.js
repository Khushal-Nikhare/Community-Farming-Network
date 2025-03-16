// Image preview functionality
const productImage = document.getElementById('productImage');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('preview-img');
const previewText = document.querySelector('.image-preview-text');

productImage.addEventListener('change', function() {
    const file = this.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        previewText.style.display = "none";
        previewImg.style.display = "block";
        
        reader.addEventListener("load", function() {
            previewImg.setAttribute("src", this.result);
            imagePreview.classList.add('active');
        });
        
        reader.readAsDataURL(file);
    } else {
        previewText.style.display = "block";
        previewImg.style.display = "none";
        imagePreview.classList.remove('active');
    }
});

// Form submission
document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate terms agreement
    if (!document.getElementById('termsAgreement').checked) {
        alert('You must agree to the terms and conditions to list your product.');
        return;
    }
    
    // Gather product information
    const productData = {
        id: Date.now(), // Generate a unique ID based on timestamp
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value,
        unit: document.getElementById('priceUnit').value,
        stock: document.getElementById('stockQuantity').value,
        offer: document.getElementById('productOffer').value || '0',
        returnPolicy: document.getElementById('returnPolicy').value,
        certifications: {
            organic: document.getElementById('organicCertified').checked,
            pesticidefree: document.getElementById('pesticidefree').checked,
            freshHarvested: document.getElementById('freshHarvested').checked,
            naturalFarming: document.getElementById('naturalFarming').checked
        },
        dateAdded: new Date().toISOString(),
        status: 'Pending Approval'
    };
    
    // Handle image preview (store the image as a data URL if available)
    if (previewImg.src) {
        productData.image = previewImg.src;
    } else {
        productData.image = 'default-product.jpg'; // Fallback image
    }
    
    // Get existing products from localStorage or initialize empty array
    let products = JSON.parse(localStorage.getItem('sellerProducts')) || [];
    
    // Add the new product
    products.push(productData);
    
    // Save to localStorage
    localStorage.setItem('sellerProducts', JSON.stringify(products));
    
    // Show success message
    alert('Product successfully listed! It will appear in your seller dashboard once approved.');
    
    // Redirect to seller profile page
    window.location.href = 'seller_profile.html';
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