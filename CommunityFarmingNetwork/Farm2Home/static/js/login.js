// Form switching functionality
const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Forgot password functionality
const forgotModal = document.getElementById('forgot-password-modal');
const forgotLink = document.getElementById('forgot-password-link');
const closeModal = document.querySelector('.close-modal');
const step1 = document.getElementById('forgot-step-1');
const step2 = document.getElementById('forgot-step-2');
const step3 = document.getElementById('forgot-step-3');
const generateOtpBtn = document.getElementById('generate-otp-btn');
const verifyOtpBtn = document.getElementById('verify-otp-btn');
const resetPasswordBtn = document.getElementById('reset-password-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Show/hide modal
forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    forgotModal.classList.remove('active');
    // Reset the form state
    step1.style.display = 'block';
    step2.style.display = 'none';
    step3.style.display = 'none';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
});

// // Generate OTP
// generateOtpBtn.addEventListener('click', () => {
//     const email = document.getElementById('forgot-email').value;
//     if (email) {
//         // Here you would typically make an API call to send OTP
//         // For demo, we'll just simulate it
//         step1.style.display = 'none';
//         step2.style.display = 'block';
//         successMessage.textContent = 'OTP sent to your email!';
//         successMessage.style.display = 'block';
//         errorMessage.style.display = 'none';
//     } else {
//         errorMessage.textContent = 'Please enter your email address';
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//     }
// });

// // Verify OTP
// verifyOtpBtn.addEventListener('click', () => {
//     const otp = document.getElementById('otp-input').value;
//     if (otp && otp.length === 6) {
//         // Here you would verify the OTP with your backend
//         // For demo, we'll just simulate it
//         step2.style.display = 'none';
//         step3.style.display = 'block';
//         successMessage.textContent = 'OTP verified successfully!';
//         successMessage.style.display = 'block';
//         errorMessage.style.display = 'none';
//     } else {
//         errorMessage.textContent = 'Please enter a valid OTP';
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//     }
// });

// Reset Password
// resetPasswordBtn.addEventListener('click', () => {
//     const newPassword = document.getElementById('new-password').value;
//     const confirmPassword = document.getElementById('confirm-new-password').value;

//     if (newPassword && confirmPassword) {
//         if (newPassword === confirmPassword) {
//             // Here you would update the password in your backend
//             // For demo, we'll just simulate it
//             successMessage.textContent = 'Password reset successful! Redirecting to login...';
//             successMessage.style.display = 'block';
//             errorMessage.style.display = 'none';

//             setTimeout(() => {
//                 forgotModal.classList.remove('active');
//                 // Reset the form state
//                 step1.style.display = 'block';
//                 step2.style.display = 'none';
//                 step3.style.display = 'none';
//                 successMessage.style.display = 'none';
//                 // Clear all inputs
//                 document.getElementById('forgot-email').value = '';
//                 document.getElementById('otp-input').value = '';
//                 document.getElementById('new-password').value = '';
//                 document.getElementById('confirm-new-password').value = '';
//             }, 2000);
//         } else {
//             errorMessage.textContent = 'Passwords do not match';
//             errorMessage.style.display = 'block';
//             successMessage.style.display = 'none';
//         }
//     } else {
//         errorMessage.textContent = 'Please fill in all fields';
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//     }
// });

// // Form submission handlers
// document.getElementById('login-form').addEventListener('submit', (e) => {
//     // Here you would handle login form submission
//     // For demo, we'll just redirect to home
// });

// document.getElementById('signup-form').addEventListener('submit', (e) => {
//     // Here you would handle signup form submission
//     // For demo, we'll just show success and redirect
//     alert('Account created successfully!');
// });

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === forgotModal) {
        forgotModal.classList.remove('active');
        // Reset the form state
        step1.style.display = 'block';
        step2.style.display = 'none';
        step3.style.display = 'none';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
});
