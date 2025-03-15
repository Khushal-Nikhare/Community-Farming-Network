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

// Tab navigation
const navLinks = document.querySelectorAll('.profile-nav a');
const sections = document.querySelectorAll('.profile-section');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));

        // Show the target section
        const targetSection = document.getElementById(link.dataset.section);
        targetSection.classList.add('active');
    });
});

// Modal functionality
function openModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal with ID "${modalId}" not found`);
            return;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function closeModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`Modal with ID "${modalId}" not found`);
            return;
        }
        modal.classList.remove('active');
        document.body.style.overflow = '';
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

// Photo upload preview
const uploadArea = document.getElementById('upload-area');
const photoUpload = document.getElementById('photo-upload');
const photoPreview = document.getElementById('photo-preview');

uploadArea.addEventListener('click', () => {
    photoUpload.click();
});

uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.backgroundColor = 'rgba(40, 167, 69, 0.05)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.backgroundColor = '';
});

uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.backgroundColor = '';

    if (e.dataTransfer.files.length) {
        photoUpload.files = e.dataTransfer.files;
        handleFileUpload(e.dataTransfer.files[0]);
    }
});

photoUpload.addEventListener('change', () => {
    if (photoUpload.files.length) {
        handleFileUpload(photoUpload.files[0]);
    }
});

function handleFileUpload(file) {
    try {
        if (!file) {
            console.error('No file provided');
            return;
        }

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function (e) {
                if (!e.target || !e.target.result) {
                    alert('Error loading the image. Please try again.');
                    return;
                }

                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
                uploadArea.style.display = 'none';
            };

            reader.onerror = function () {
                alert('Error reading the file. Please try again.');
                console.error('FileReader error');
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file (JPG, PNG, or GIF)');
        }
    } catch (error) {
        console.error('Error handling file upload:', error);
        alert('An error occurred while processing your image. Please try again.');
    }
}

// Save photo functionality
document.getElementById('save-photo').addEventListener('click', () => {
    if (photoPreview.src) {
        document.getElementById('profile-img').src = photoPreview.src;
        closeModal('photo-modal');

        // Reset the upload form
        setTimeout(() => {
            photoPreview.style.display = 'none';
            uploadArea.style.display = 'block';
            photoUpload.value = '';
        }, 300);
    }
});

// Form submissions (just for demo - would connect to backend in real app)
document.getElementById('info-form').addEventListener('submit', e => {
    e.preventDefault();
    const fullName = document.getElementById('full-name').value;
    document.getElementById('username').textContent = fullName;
    alert('Personal information updated successfully!');
});

document.getElementById('password-form').addEventListener('submit', e => {
    e.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple validation
    if (!currentPassword) {
        alert('Please enter your current password');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }

    alert('Password updated successfully!');
    e.target.reset();
});

document.getElementById('address-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('New address added successfully!');
    closeModal('address-modal');
    e.target.reset();
});

// Address manipulation functions
function editAddress(id) {
    // For demo, just open the add address modal
    // In real app, would pre-fill form with address data
    openModal('address-modal');
}

function deleteAddress(id) {
    if (confirm('Are you sure you want to delete this address?')) {
        alert('Address deleted successfully');
    }
}

// Image error handling
document.addEventListener('DOMContentLoaded', () => {
    // Handle missing profile image
    const profileImg = document.getElementById('profile-img');
    profileImg.onerror = function () {
        this.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        console.log('Default profile image loaded');
    };

    // Handle missing product images
    document.querySelectorAll('.order-item-img').forEach(img => {
        img.onerror = function () {
            this.src = 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_1280.png';
            console.log('Default product image loaded');
        };
    });

    // Enhanced localStorage handling
    try {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            document.getElementById('username').textContent = storedUser.name || 'User';
            document.getElementById('full-name').value = storedUser.name || '';
            document.getElementById('email').value = storedUser.email || '';
        } else {
            console.log('No user data found in localStorage');
        }
    } catch (error) {
        console.error('Error loading user data from localStorage:', error);
        // Set default values if localStorage fails
        document.getElementById('username').textContent = 'User';
    }
});
