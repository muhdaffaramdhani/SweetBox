document.addEventListener('DOMContentLoaded', () => {

    // --- FUNGSI GLOBAL ---
    window.sweetbox = {
        // --- Keranjang ---
        getCart: () => JSON.parse(localStorage.getItem('sweetbox_cart')) || [],
        saveCart: function(cart) {
            localStorage.setItem('sweetbox_cart', JSON.stringify(cart));
            this.updateCartBadge();
        },
        addToCart: function(productId) {
            let cart = this.getCart();
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            this.saveCart(cart);
            this.showNotification("Produk ditambahkan ke keranjang!");
        },
        removeFromCart: function(productId) {
            let cart = this.getCart().filter(item => item.id !== productId);
            this.saveCart(cart);
            if (typeof window.renderCartItems === 'function') {
                window.renderCartItems();
            }
        },
        updateQuantity: function(productId, newQuantity) {
            let cart = this.getCart();
            const product = cart.find(item => item.id === productId);
            if (product) {
                if (newQuantity > 0) {
                    product.quantity = newQuantity;
                } else {
                    cart = cart.filter(item => item.id !== productId);
                }
            }
            this.saveCart(cart);
            if (typeof window.renderCartItems === 'function') {
                window.renderCartItems();
            }
        },
        clearCart: function() {
            this.saveCart([]);
        },

        // --- Wishlist / Saved Items ---
        getWishlist: () => JSON.parse(localStorage.getItem('sweetbox_wishlist')) || [],
        saveWishlist: function(wishlist) {
            localStorage.setItem('sweetbox_wishlist', JSON.stringify(wishlist));
            this.updateLikeButtons();
        },
        toggleWishlist: function(productId) {
            let wishlist = this.getWishlist();
            if (wishlist.includes(productId)) {
                wishlist = wishlist.filter(id => id !== productId);
                this.showNotification("Produk dihapus dari wishlist.");
            } else {
                wishlist.push(productId);
                this.showNotification("Produk disimpan ke wishlist!");
            }
            this.saveWishlist(wishlist);
        },
        updateLikeButtons: function() {
            const wishlist = this.getWishlist();
            document.querySelectorAll('.like-btn').forEach(btn => {
                const productId = parseInt(btn.dataset.id, 10);
                if (wishlist.includes(productId)) {
                    btn.classList.add('liked');
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                } else {
                    btn.classList.remove('liked');
                    btn.innerHTML = '<i class="far fa-heart"></i>';
                }
            });
        },

        // --- Data Produk ---
        getProductDetails: (productId) => allProducts.find(p => p.id === productId),
        getAllProducts: () => allProducts,

        // --- UI ---
        updateCartBadge: function() {
            const cart = this.getCart();
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelectorAll('.cart-badge').forEach(badge => {
                badge.textContent = totalItems;
                badge.style.display = totalItems > 0 ? 'flex' : 'none';
            });
        },
        showNotification: (message) => {
            const notification = document.getElementById('notification');
            if (notification) {
                notification.textContent = message;
                notification.classList.add('show');
                setTimeout(() => notification.classList.remove('show'), 2500);
            }
        },

        // Lokasi Kantor
        getOfficeLocation: () => ({ lat: -6.1999109, lon: 106.9361121 }) // Jl. Rambutan, Jakarta Timur
    };

    // --- INISIALISASI & EVENT LISTENERS ---

    // Navigasi Mobile
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
        });
    }
    
    // Event listener global
    document.body.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        const likeBtn = e.target.closest('.like-btn');
        
        if (addToCartBtn) {
            const productId = parseInt(addToCartBtn.dataset.id, 10);
            sweetbox.addToCart(productId);
        }
        
        if (likeBtn) {
            const productId = parseInt(likeBtn.dataset.id, 10);
            sweetbox.toggleWishlist(productId);
        }
    });

    // Inisialisasi
    sweetbox.updateCartBadge();
    // updateLikeButtons dipanggil setelah produk dirender di products.js
});
