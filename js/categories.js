// بيانات المنتجات للأقسام
const categoryProducts = {
    "الهواتف والأجهزة": [
        {
            id: 1,
            name: "iPhone 13 Pro",
            price: 3499,
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 4.5,
            reviews: 124
        },
        {
            id: 5,
            name: "سماعات الرأس سوني",
            price: 899,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 4.5,
            reviews: 203
        },
        {
            id: 6,
            name: "كاميرا كانون EOS",
            price: 2899,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 4.7,
            reviews: 98
        },
        {
            id: 3,
            name: "ساعة أبل Series 7",
            price: 1499,
            image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 5,
            reviews: 156
        }
    ],
    "أجهزة الكمبيوتر": [
        {
            id: 2,
            name: "لابتوب ديل XPS 15",
            price: 4299,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 4,
            reviews: 89
        },
        {
            id: 7,
            name: "ماك بوك برو",
            price: 5999,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 4.8,
            reviews: 145
        }
    ],
    "الملابس": [
        {
            id: 4,
            name: "حذاء رياضي نايك",
            price: 349,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 3.5,
            reviews: 67
        }
    ],
    "الأثاث والمنزل": [
        {
            id: 8,
            name: "سجادة صلاة",
            price: 99,
            image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            rating: 4.2,
            reviews: 56
        }
    ]
};

// عرض المنتجات لكل قسم
function displayCategoryProducts() {
    const categoryCards = document.querySelectorAll('.category-main-card');
    
    categoryCards.forEach(card => {
        const categoryTitle = card.querySelector('.category-info h2').textContent;
        const productsGrid = card.querySelector('.products-grid');
        const products = categoryProducts[categoryTitle] || [];
        
        productsGrid.innerHTML = '';
        
        if (products.length === 0) {
            productsGrid.innerHTML = '<p>لا توجد منتجات في هذا القسم حالياً</p>';
            return;
        }
        
        // عرض最多 4 منتجات لكل قسم
        const productsToShow = products.slice(0, 4);
        
        productsToShow.forEach(product => {
            const ratingStars = generateRatingStars(product.rating);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${ratingStars}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">${product.price.toLocaleString()} ر.س</div>
                    <div class="product-actions">
                        <button class="add-to-cart">أضف إلى السلة</button>
                        <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    });
    
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

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    displayCategoryProducts();
});
