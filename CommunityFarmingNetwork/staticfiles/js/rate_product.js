document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars i'); // Select the i elements within .stars
    const productId = "{{ product.productId }}";
    const reviewCountSpan = document.querySelector('.review-count'); // Select the review count span

    function displayAverageRating(averageRating, numReviewers) {
        // Update the star display
        stars.forEach((star, index) => {
            if (index + 1 <= averageRating) {
                star.classList.add('fas', 'fa-star'); // Add filled star classes
                star.classList.remove('far', 'fa-star'); // Remove empty star classes
            } else if (index + 0.5 <= averageRating) {
                star.classList.add('fas', 'fa-star-half-alt'); // Add half star class
                star.classList.remove('far', 'fa-star'); // Remove empty star classes
            }
            else {
                star.classList.remove('fas', 'fa-star', 'fas', 'fa-star-half-alt'); // Remove filled and half star classes
                star.classList.add('far', 'fa-star'); // Add empty star classes
            }
        });

    }

    function updateRating(rating) {
        fetch("{% url 'rate_product' %}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': '{{ csrf_token }}'
            },
            body: `product_id=${productId}&rating=${rating}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    displayAverageRating(data.average_rating, data.num_reviewers);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting your rating.');
            });
    }

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.dataset.rating;
            updateRating(rating);
        });
    });

    // Initialize the display with the initial average rating
    displayAverageRating("{{ product.average_rating }}", "{{ num_reviewers }}");
});