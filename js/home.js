document.addEventListener('DOMContentLoaded', () => {
    const products = window.sweetbox.getAllProducts();
    
    // Filter produk dengan rating 4 atau 5
    const popularProducts = products.filter(p => p.rating >= 4);

    const menuSlider = document.querySelector('.menu-slider');
    
    const createPopularMenu = () => {
        if (!menuSlider) return;
        
        // Gandakan array untuk efek slide tak terbatas
        const sliderContent = [...popularProducts, ...popularProducts]; 
        
        menuSlider.innerHTML = sliderContent.map(product => `
            <a href="products.html?search=${encodeURIComponent(product.name)}" class="popular-card-link">
                <div class="popular-card">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="popular-card-info">
                        <h4>${product.name}</h4>
                        <p class="city">${product.city}</p>
                        <div class="details">
                           <span class="rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</span>
                           <span class="calories">~${product.calories} Cal</span>
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
    };

    createPopularMenu();
});
