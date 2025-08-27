// بيانات المنتجات
const productsData = [
    {
        id: 1,
        name: "iPhone 13 Pro",
        price: 3499,
        category: "الهواتف والأجهزة",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 124,
        isNew: true,
        discount: 0
    },
    {
        id: 2,
        name: "لابتوب ديل XPS 15",
        price: 4299,
        category: "أجهزة الكمبيوتر",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4,
        reviews: 89,
        isNew: false,
        discount: 0
    },
    {
        id: 3,
        name: "ساعة أبل Series 7",
        price: 1499,
        category: "الهواتف والأجهزة",
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 5,
        reviews: 156,
        isNew: true,
        discount: 15
    },
    {
        id: 4,
        name: "حذاء رياضي نايك",
        price: 349,
        category: "الملابس",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 3.5,
        reviews: 67,
        isNew: false,
        discount: 25
    },
    {
        id: 5,
        name: "سماعات الرأس سوني",
        price: 899,
        category: "الهواتف والأجهزة",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 203,
        isNew: false,
        discount: 30
    },
    {
        id: 6,
        name: "كاميرا كانون EOS",
        price: 2899,
        category: "الهواتف والأجهزة",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviews: 98,
        isNew: true,
        discount: 10
    },
    {
        id: 7,
        name: "ماك بوك برو",
        price: 5999,
        category: "أجهزة الكمبيوتر",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviews: 145,
        isNew: false,
        discount: 5
    },
    {
        id: 8,
        name: "سجادة صلاة",
        price: 99,
        category: "الأثاث والمنزل",
        image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.2,
        reviews: 56,
        isNew: false,
        discount: 0
    },
    {
        id: 9,
        name: "هواوي P50 Pro",
        price: 2799,
        category: "الهواتف والأجهزة",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        reviews: 87,
        isNew: true,
        discount: 20
    },
    {
        id: 10,
        name: "سامسونج جالاكسي S22",
        price: 3199,
        category: "الهواتف والأجهزة",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 132,
        isNew: false,
        discount: 12
    },
    {
        id: 11,
        name: "قلم Apple Pencil",
        price: 499,
        category: "أجهزة الكمبيوتر",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        reviews: 76,
        isNew: false,
        discount: 0
    },
    {
        id: 12,
        name: "لوحة مفاتيح ميكانيكية",
        price: 349,
        category: "أجهزة الكمبيوتر",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        rating: 4.1,
        reviews: 64,
        isNew: true,
        discount: 15
    }
];

// عرض المنتجات
function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>لم يتم العثور على منتجات</h3>
                <p>جرب تعديل عوامل التصفية للعثور على ما تبحث عنه</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const ratingStars = generateRatingStars(product.rating);
        const discountedPrice = product.discount > 0 
            ? Math.round(product.price * (100 - product.discount) / 100)
            : product.price;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.innerHTML = `
            ${product.isNew ? '<div class="product-badge">جديد</div>' : ''}
            ${product.discount > 0 ? `<div class="product-badge discount">-${product.discount}%</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <div class="product-rating">
                    ${ratingStars}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${discountedPrice.toLocaleString()} ر.س</span>
                    ${product.discount > 0 ? `
                        <span class="original-price">${product.price.toLocaleString()} ر.س</span>
                        <span class="discount-percentage">توفير ${product.discount}%</span>
                    ` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart">أضف إلى السلة</button>
                    <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // تحديث عدد النتائج
    document.getElementById('resultsCount').textContent = products.length;
    
    // إضافة event listeners للمنتجات
    attachProductEvents();
}

// توليد نجوم التقييم
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// تطبيق الفلترة
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(checkbox => checkbox.value);
    
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 10000;
    
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    const onlyDiscounted = document.querySelector('input[name="discount"]:checked') !== null;
    
    let filteredProducts = productsData.filter(product => {
        // فلترة حسب الفئة
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        // فلترة حسب السعر
        const discountedPrice = product.discount > 0 
            ? Math.round(product.price * (100 - product.discount) / 100)
            : product.price;
        const priceMatch = discountedPrice >= minPrice && discountedPrice <= maxPrice;
        
        // فلترة حسب التقييم
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(r => product.rating >= r);
        
        // فلترة حسب الخصم
        const discountMatch = !onlyDiscounted || product.discount > 0;
        
        return categoryMatch && priceMatch && ratingMatch && discountMatch;
    });
    
    // الترتيب
    const sortBy = document.querySelector('.sort-select').value;
    
    switch(sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => {
                const priceA = a.discount > 0 ? Math.round(a.price * (100 - a.discount) / 100) : a.price;
                const priceB = b.discount > 0 ? Math.round(b.price * (100 - b.discount) / 100) : b.price;
                return priceA - priceB;
            });
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => {
                const priceA = a.discount > 0 ? Math.round(a.price * (100 - a.discount) / 100) : a.price;
                const priceB = b.discount > 0 ? Math.round(b.price * (100 - b.discount) / 100) : b.price;
                return priceB - priceA;
            });
            break;
        case 'popular':
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'discount':
            filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
        default:
            // الترتيب الافتراضي
            break;
    }
    
    displayProducts(filteredProducts);
}

// إضافة event listeners للمنتجات
function attachProductEvents() {
    // إضافة إلى السلة
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const currentCount = parseInt(document.querySelector('.cart-count').textContent);
            updateCartCount(currentCount + 1);
            
            // تأثير على الزر
            this.textContent = 'تمت الإضافة!';
            this.style.background = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = 'أضف إلى السلة';
                this.style.background = '';
            }, 1500);
        });
    });
    
    // إضافة إلى المفضلة
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--danger)';
                this.style.borderColor = 'var(--danger)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    });
}

// مسح جميع الفلاتر
function setupClearFilters() {
    document.querySelector('.clear-filters').addEventListener('click', function() {
        // مسح جميع checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // إعادة تعيين نطاق السعر
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
        document.getElementById('priceRange').value = 5000;
        document.querySelector('.price-values span:last-child').textContent = '5000 ر.س';
        
        // إعادة تعيين الترتيب
        document.querySelector('.sort-select').value = 'default';
        
        // تطبيق الفلترة
        applyFilters();
    });
}

// إعداد نطاق السعر
function setupPriceRange() {
    const priceRange = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    
    priceRange.addEventListener('input', function() {
        maxPriceInput.value = this.value;
        document.querySelector('.price-values span:last-child').textContent = `${this.value} ر.س`;
    });
    
    minPriceInput.addEventListener('change', function() {
        if (this.value && parseInt(this.value) < 0) this.value = 0;
        if (this.value && parseInt(this.value) > 10000) this.value = 10000;
    });
    
    maxPriceInput.addEventListener('change', function() {
        if (this.value && parseInt(this.value) < 0) this.value = 0;
        if (this.value && parseInt(this.value) > 10000) this.value = 10000;
        if (this.value) priceRange.value = this.value;
    });
}

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    // عرض جميع المنتجات في البداية
    displayProducts(productsData);
    
    // تطبيق الفلترة عند النقر على الزر
    document.querySelector('.apply-filters-btn').addEventListener('click', applyFilters);
    
    // تطبيق الفلترة عند تغيير خيارات الترتيب
    document.querySelector('.sort-select').addEventListener('change', applyFilters);
    
    // إعداد نطاق السعر
    setupPriceRange();
    
    // إعداد مسح الفلاتر
    setupClearFilters();
    
    // تحديث عرض نطاق السعر
    const priceRange = document.getElementById('priceRange');
    const priceValues = document.querySelector('.price-values');
    
    priceRange.addEventListener('input', () => {
        priceValues.querySelector('span:last-child').textContent = `${priceRange.value} ر.س`;
    });
});
