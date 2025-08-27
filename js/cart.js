// بيانات المنتجات
const products = [
    { id: 1, name: "iPhone 13 Pro", price: 3499, quantity: 1, image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "حذاء رياضي نايك", price: 349, quantity: 2, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "ساعة أبل Series 7", price: 1499, quantity: 1, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
];

// عناصر DOM
const cartItemsContainer = document.querySelector('.cart-items');
const cartCountElement = document.querySelector('.cart-count');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const alertMessage = document.getElementById('alertMessage');
const alertText = document.getElementById('alertText');

// عرض رسالة تنبيه
function showAlert(message, type = 'success') {
    alertMessage.className = `alert alert-${type}`;
    alertText.textContent = message;
    alertMessage.style.display = 'flex';
    
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 3000);
}

// تحديث عداد السلة
function updateCartCount() {
    const totalItems = products.reduce((total, product) => total + product.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// تحديث الإجماليات
function updateTotals() {
    const subtotal = products.reduce((total, product) => total + (product.price * product.quantity), 0);
    const tax = subtotal * 0.05; // ضريبة 5%
    const total = subtotal + tax + 25 - 200; // إجمالي + ضريبة + شحن - خصم
    
    subtotalElement.textContent = `${subtotal.toLocaleString()} ر.س`;
    taxElement.textContent = `${tax.toLocaleString()} ر.س`;
    totalElement.textContent = `${total.toLocaleString()} ر.س`;
}

// تحديث واجهة السلة
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    if (products.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>سلة التسوق فارغة</h3>
                <p>لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
                <a href="products.html" class="checkout-btn">تصفح المنتجات</a>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const itemTotal = product.price * product.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="item-details">
                <h3 class="item-title">${product.name}</h3>
                <div class="item-price">${product.price.toLocaleString()} ر.س</div>
                <div class="item-actions">
                    <button class="action-btn save"><i class="far fa-heart"></i> حفظ للمفضلة</button>
                    <button class="action-btn delete"><i class="fas fa-trash"></i> حذف</button>
                </div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus">-</button>
                <span class="quantity-value">${product.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="item-total">${itemTotal.toLocaleString()} ر.س</div>
        `;
        
        // إضافة event listeners للأزرار
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        const deleteBtn = cartItem.querySelector('.delete');
        const saveBtn = cartItem.querySelector('.save');
        
        minusBtn.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
                updateCartUI();
                updateTotals();
                showAlert('تم تحديث كمية المنتج');
            }
        });
        
        plusBtn.addEventListener('click', () => {
            product.quantity++;
            updateCartUI();
            updateTotals();
            showAlert('تم تحديث كمية المنتج');
        });
        
        deleteBtn.addEventListener('click', () => {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                products.splice(index, 1);
                updateCartUI();
                updateCartCount();
                updateTotals();
                showAlert('تم حذف المنتج من السلة', 'danger');
            }
        });
        
        saveBtn.addEventListener('click', () => {
            const icon = saveBtn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                saveBtn.style.color = 'var(--danger)';
                showAlert('تم إضافة المنتج إلى المفضلة');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                saveBtn.style.color = '';
                showAlert('تم إزالة المنتج من المفضلة', 'danger');
            }
        });
        
        cartItemsContainer.appendChild(cartItem);
    });
}

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateCartCount();
    updateTotals();
});
