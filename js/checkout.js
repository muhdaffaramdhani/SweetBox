document.addEventListener('DOMContentLoaded', () => {

    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const orderSummary = document.getElementById('order-summary');
    const checkoutForm = document.getElementById('checkout-form');
    const useGpsBtn = document.getElementById('use-gps-btn');
    const addressInput = document.getElementById('address');
    const distanceInfo = document.getElementById('distance-info');
    
    const confirmModal = document.getElementById('confirm-modal');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    
    const successModal = document.getElementById('order-success-modal');
    const closeReceiptBtn = document.getElementById('close-receipt-btn');
    const downloadReceiptBtn = document.getElementById('download-receipt-btn');

    let itemToRemoveId = null;
    let userLocation = null;
    let currentSubtotal = 0;

    const officeLocation = window.sweetbox.getOfficeLocation();

    // Fungsi render global
    window.renderCartItems = () => {
        if (!cartItemsContainer) return;

        const cart = window.sweetbox.getCart();
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            orderSummary.classList.add('hidden');
            document.getElementById('suggested-products').style.display = 'none';
            return;
        }

        emptyCartMessage.classList.add('hidden');
        orderSummary.classList.remove('hidden');
        document.getElementById('suggested-products').style.display = 'block';
        
        let subtotal = 0;

        cart.forEach(item => {
            const product = window.sweetbox.getProductDetails(item.id);
            if (product) {
                subtotal += product.price * item.quantity;
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="item-info">
                        <h4>${product.name}</h4>
                        <p class="item-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                        <div class="item-controls">
                            <div class="quantity-control">
                                <button class="quantity-decrease" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-increase" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            }
        });

        currentSubtotal = subtotal;
        updateSummary();
        renderSuggestedProducts();
    };

    const updateSummary = () => {
        const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
        let shippingCost = 0;
        
        if (deliveryOption === 'delivery' && userLocation) {
            const distance = calculateDistance(userLocation.lat, userLocation.lon, officeLocation.lat, officeLocation.lon);
            shippingCost = Math.min(Math.max(10000, Math.round(distance) * 2500), 50000); // Rp 2.500/km, min 10k, max 50k
            distanceInfo.textContent = `Jarak: ${distance.toFixed(2)} km`;
        } else if (deliveryOption === 'pickup') {
            distanceInfo.textContent = `Ambil di toko.`;
            shippingCost = 0;
        } else {
            distanceInfo.textContent = `Mohon aktifkan lokasi untuk menghitung biaya.`;
            shippingCost = 15000; // Default shipping cost
        }

        const tax = currentSubtotal * 0.11;
        const total = currentSubtotal + shippingCost + tax;
        
        document.getElementById('summary-subtotal').textContent = `Rp ${currentSubtotal.toLocaleString('id-ID')}`;
        document.getElementById('summary-shipping').textContent = `Rp ${shippingCost.toLocaleString('id-ID')}`;
        document.getElementById('summary-tax').textContent = `Rp ${tax.toLocaleString('id-ID')}`;
        document.getElementById('summary-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    };
    
    const renderSuggestedProducts = () => {
        const suggestedGrid = document.getElementById('suggested-grid');
        if(!suggestedGrid) return;
        const all = window.sweetbox.getAllProducts();
        const cartIds = window.sweetbox.getCart().map(i => i.id);
        const suggestions = all.filter(p => !cartIds.includes(p.id)).sort(() => 0.5 - Math.random()).slice(0, 4);
        
        suggestedGrid.innerHTML = suggestions.map(p => `
            <a href="#" class="suggested-item add-to-cart-btn" data-id="${p.id}">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <h5>${p.name}</h5>
            </a>
        `).join('');
    };

    const showConfirmModal = (id) => {
        itemToRemoveId = id;
        confirmModal.classList.remove('hidden');
    };

    const hideConfirmModal = () => {
        itemToRemoveId = null;
        confirmModal.classList.add('hidden');
    };
    
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    // Event Listeners
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id, 10);
            if (e.target.classList.contains('quantity-increase')) {
                const item = window.sweetbox.getCart().find(i => i.id === id);
                window.sweetbox.updateQuantity(id, item.quantity + 1);
            }
            if (e.target.classList.contains('quantity-decrease')) {
                const item = window.sweetbox.getCart().find(i => i.id === id);
                window.sweetbox.updateQuantity(id, item.quantity - 1);
            }
            if (e.target.classList.contains('remove-item-btn')) {
                showConfirmModal(id);
            }
        });
    }
    
    const suggestedProductsContainer = document.getElementById('suggested-products');
    if (suggestedProductsContainer) {
        suggestedProductsContainer.addEventListener('click', (e) => {
            const suggestedItem = e.target.closest('.suggested-item.add-to-cart-btn');
            if (suggestedItem) {
                e.preventDefault();
                const id = parseInt(suggestedItem.dataset.id, 10);
                window.sweetbox.addToCart(id);
                renderCartItems(); // Panggil renderCartItems untuk update UI secara real-time
            }
        });
    }
    
    if(modalConfirmBtn) modalConfirmBtn.addEventListener('click', () => {
        if (itemToRemoveId !== null) window.sweetbox.removeFromCart(itemToRemoveId);
        hideConfirmModal();
    });
    if(modalCancelBtn) modalCancelBtn.addEventListener('click', hideConfirmModal);
    
    if(useGpsBtn) useGpsBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                userLocation = { lat: position.coords.latitude, lon: position.coords.longitude };
                // Reverse geocoding (optional, needs API)
                addressInput.value = `Lat: ${userLocation.lat.toFixed(5)}, Lon: ${userLocation.lon.toFixed(5)}`;
                updateSummary();
            }, () => {
                alert('Tidak bisa mendapatkan lokasi. Mohon izinkan akses lokasi.');
            });
        } else {
            alert("Geolocation tidak didukung oleh browser ini.");
        }
    });

    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', updateSummary);
    });
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.sweetbox.getCart().length === 0) {
                alert('Keranjang Anda kosong!');
                return;
            }
            showSuccessModal();
            window.sweetbox.clearCart();
        });
    }
    
    const showSuccessModal = () => {
        const cart = window.sweetbox.getCart();
        document.getElementById('receipt-id').textContent = `SWB-${Date.now()}`;
        document.getElementById('receipt-date').textContent = new Date().toLocaleDateString('id-ID');
        
        const itemsHtml = cart.map(item => {
            const product = window.sweetbox.getProductDetails(item.id);
            return `<div class="receipt-item"><span>${item.quantity}x ${product.name}</span><span>Rp ${(item.quantity * product.price).toLocaleString('id-ID')}</span></div>`;
        }).join('');
        document.getElementById('receipt-items').innerHTML = itemsHtml;
        
        document.getElementById('receipt-summary').innerHTML = document.querySelector('.summary-details').innerHTML;
        
        successModal.classList.remove('hidden');
    }

    if(closeReceiptBtn) closeReceiptBtn.addEventListener('click', () => {
        successModal.classList.add('hidden');
        renderCartItems(); // Re-render to show empty state
    });
    
    if(downloadReceiptBtn) downloadReceiptBtn.addEventListener('click', () => {
        const receiptContent = document.getElementById('receipt-content');
        
        // Mengambil warna latar belakang dari variabel CSS untuk memastikan struk yang diunduh memiliki background
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim() || '#ffffff';

        // Opsi untuk html2canvas agar menggunakan warna background yang kita tentukan dan menambahkan padding
        const options = {
            backgroundColor: bgColor,
            onclone: (document) => {
                // Menambahkan padding pada elemen yang akan di-screenshot di dalam klonnya
                // Ini memastikan tampilan di layar tidak berubah, tapi hasil unduhan rapi
                const content = document.getElementById('receipt-content');
                if (content) {
                    content.style.padding = '30px';
                }
            }
        };

        html2canvas(receiptContent, options).then(canvas => {
            const link = document.createElement('a');
            link.download = `receipt-sweetbox-${document.getElementById('receipt-id').textContent}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    // Inisialisasi Halaman
    renderCartItems();
});

