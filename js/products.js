document.addEventListener('DOMContentLoaded', () => {
    const products = window.sweetbox.getAllProducts();

    const productGrid = document.getElementById('product-grid');
    const cityFilter = document.getElementById('city-filter');
    const searchBox = document.getElementById('search-box');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const ratingFilter = document.getElementById('rating-filter');
    const sortFilter = document.getElementById('sort-filter');
    const noResults = document.getElementById('no-results');
    
    let selectedRating = 0;

    const renderProducts = (productsToRender) => {
        if (!productGrid) return;
        
        const wishlist = window.sweetbox.getWishlist();
        productGrid.innerHTML = '';
        noResults.style.display = productsToRender.length === 0 ? 'block' : 'none';
        
        productsToRender.forEach(product => {
            const isLiked = wishlist.includes(product.id);
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${product.id}" aria-label="Save to wishlist">
                    <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="product-city">${product.city}</p>
                    <p class="product-calories">~${product.calories} Kalori</p>
                    <div class="product-details">
                        <div>
                            <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                            <div class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                        </div>
                        <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add to cart">+</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
        window.sweetbox.updateLikeButtons(); // Panggil setelah render
    };

    const populateCityFilter = () => {
        if (!cityFilter) return;
        const cities = [...new Set(products.map(p => p.city))];
        cities.sort().forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });
        // Initialize Select2
        if (jQuery && jQuery.fn && jQuery.fn.select2) {
            $('.city-select').select2({
                placeholder: "Pilih Kota",
                allowClear: true
            });
        }
    };
    
    const applyFiltersAndSort = () => {
        let processedProducts = [...products];
        const searchTerm = searchBox.value.toLowerCase();
        const selectedCity = cityFilter.value;
        const min = parseFloat(minPrice.value) || 0;
        const max = parseFloat(maxPrice.value) || Infinity;
        const sortValue = sortFilter.value;

        // Filtering
        if (searchTerm) {
            processedProducts = processedProducts.filter(p => p.name.toLowerCase().includes(searchTerm) || p.city.toLowerCase().includes(searchTerm));
        }
        if (selectedCity && selectedCity !== 'all') {
            processedProducts = processedProducts.filter(p => p.city === selectedCity);
        }
        processedProducts = processedProducts.filter(p => p.price >= min && p.price <= max);
        if (selectedRating > 0) {
             processedProducts = processedProducts.filter(p => p.rating >= selectedRating);
        }
        
        // Sorting
        switch (sortValue) {
            case 'price-asc':
                processedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                processedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'calories-asc':
                processedProducts.sort((a, b) => a.calories - b.calories);
                break;
            case 'calories-desc':
                processedProducts.sort((a, b) => b.calories - a.calories);
                break;
            case 'rating-asc':
                processedProducts.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc':
                processedProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
        
        renderProducts(processedProducts);
    };

    const handleInitialSearch = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        if (searchTerm && searchBox) {
            searchBox.value = decodeURIComponent(searchTerm);
        }
    };
    
    // Event Listeners
    [searchBox, minPrice, maxPrice, sortFilter].forEach(el => {
        if (el) el.addEventListener('input', applyFiltersAndSort);
    });
    
    if(cityFilter && jQuery && jQuery.fn && jQuery.fn.select2) {
        $(cityFilter).on('change', applyFiltersAndSort);
    }

    if (ratingFilter) {
        ratingFilter.addEventListener('click', (e) => {
            if (e.target.tagName === 'SPAN') {
                const rating = parseInt(e.target.dataset.rating, 10);
                selectedRating = (selectedRating === rating) ? 0 : rating;
                
                ratingFilter.querySelectorAll('span').forEach(star => {
                    star.classList.toggle('selected', parseInt(star.dataset.rating, 10) <= selectedRating);
                });
                
                applyFiltersAndSort();
            }
        });
    }

    // Inisiasi
    handleInitialSearch();
    populateCityFilter();
    applyFiltersAndSort();
});
