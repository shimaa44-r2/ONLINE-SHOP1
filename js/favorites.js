// إدارة المفضلة
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    setupEventListeners();
});

// تحميل المنتجات المفضلة
function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyFavorites = document.getElementById('emptyFavorites');
    
    // في بيئة حقيقية، هنا سيتم جلب البيانات من الخادم أو localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '';
        emptyFavorites.style.display = 'block';
        updateFavoritesCount(0);
        return;
    }
    
    emptyFavorites.style.display = 'none';
    favoritesGrid.innerHTML = '';
    
    favorites.forEach(product => {
        const favoriteItem = createFavoriteItem(product);
        favoritesGrid.appendChild(favoriteItem);
    });
    
    updateFavoritesCount(favorites.length);
}

// إنشاء عنصر المفضلة
function createFavoriteItem(product) {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${product.price.toLocaleString()} ر.س</div>
            <div class="favorite-actions">
                <button class="add-to-cart">أضف إلى السلة</button>
                <button class="remove-favorite" data-id="${product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return item;
}

// إعداد event listeners
function setupEventListeners() {
    // تغيير طريقة العرض
    document.querySelector('.view-select').addEventListener('change', function() {
        const favoritesGrid = document.getElementById('favoritesGrid');
        if (this.value === 'list') {
            favoritesGrid.classList.add('list-view');
        } else {
            favoritesGrid.classList.remove('list-view');
        }
    });
    
    // ترتيب المنتجات
    document.querySelector('.sort-select').addEventListener('change', function() {
        sortFavorites(this.value);
    });
    
    // مسح كل المفضلة
    document.querySelector('.clear-favorites').addEventListener('click', clearAllFavorites);
    
    // إزالة عنصر من المفضلة
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-favorite')) {
            const productId = e.target.closest('.remove-favorite').getAttribute('data-id');
            removeFromFavorites(parseInt(productId));
        }
        
        if (e.target.closest('.add-to-cart')) {
            const productItem = e.target.closest('.favorite-item');
            const productName = productItem.querySelector('.product-title').textContent;
            addToCartFromFavorites(productName);
        }
    });
}

// ترتيب المنتجات المفضلة
function sortFavorites(criteria) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    switch(criteria) {
        case 'price-low':
            favorites.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            favorites.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            favorites.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'date':
        default:
            // الترتيب الافتراضي (الأحدث)
            favorites.sort((a, b) => b.id - a.id);
            break;
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

// إزالة عنصر من المفضلة
function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    loadFavorites();
    showNotification('تم إزالة المنتج من المفضلة', 'success');
}

// مسح كل المفضلة
function clearAllFavorites() {
    if (confirm('هل أنت متأكد من أنك تريد مسح كل المنتجات من المفضلة؟')) {
        localStorage.removeItem('favorites');
        loadFavorites();
        showNotification('تم مسح كل المنتجات من المفضلة', 'success');
    }
}

// إضافة إلى السلة من المفضلة
function addToCartFromFavorites(productName) {
    // في بيئة حقيقية، هنا سيتم إضافة المنتج إلى السلة
    const currentCount = parseInt(document.querySelector('.cart-count').textContent);
    updateCartCount(currentCount + 1);
    
    showNotification(`تم إضافة ${productName} إلى السلة`, 'success');
}

// تحديث عداد المفضلة
function updateFavoritesCount(count) {
    const favoritesCount = document.querySelector('.favorites-count');
    if (favoritesCount) {
        favoritesCount.textContent = count;
    }
}

// عرض الإشعارات
function showNotification(message, type) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // إخفاء الإشعار تلقائياً بعد 3 ثوان
    setTimeout(() => {
        hideNotification(notification);
    }, 3000);
    
    // إغلاق الإشعار عند النقر على الزر
    notification.querySelector('.close-notification').addEventListener('click', () => {
        hideNotification(notification);
    });
}

// إخفاء الإشعار
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}
