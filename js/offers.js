// بيانات العروض
const offersData = [
    {
        id: 1,
        title: "خصم 20% على جميع الهواتف",
        category: "الهواتف والأجهزة",
        discount: 20,
        originalPrice: 3499,
        currentPrice: 2799,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        endDate: "2023-12-15",
        type: "week"
    },
    {
        id: 2,
        title: "عرض خاص على اللابتوبات",
        category: "أجهزة الكمبيوتر",
        discount: 15,
        originalPrice: 4299,
        currentPrice: 3654,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        endDate: "2023-12-10",
        type: "today"
    },
    {
        id: 3,
        title: "تخفيضات الملابس",
        category: "الملابس",
        discount: 30,
        originalPrice: 349,
        currentPrice: 244,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        endDate: "2023-12-20",
        type: "month"
    },
    {
        id: 4,
        title: "عرض الأثاث المميز",
        category: "الأثاث والمنزل",
        discount: 25,
        originalPrice: 999,
        currentPrice: 749,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        endDate: "2023-12-05",
        type: "ending"
    },
    {
        id: 5,
        title: "خصم على الكاميرات",
        category: "الهواتف والأجهزة",
        discount: 10,
        originalPrice: 2899,
        currentPrice: 2609,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        endDate: "2023-12-12",
        type: "week"
    },
    {
        id: 6,
        title: "عرض السماعات",
        category: "الهواتف والأجهزة",
        discount: 40,
        originalPrice: 899,
        currentPrice: 539,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        endDate: "2023-12-08",
        type: "ending"
    }
];

// عرض العروض
function displayOffers(filter = 'all') {
    const offersGrid = document.querySelector('.offers-grid');
    offersGrid.innerHTML = '';
    
    let filteredOffers = offersData;
    
    if (filter !== 'all') {
        filteredOffers = offersData.filter(offer => offer.type === filter);
    }
    
    if (filteredOffers.length === 0) {
        offersGrid.innerHTML = `
            <div class="no-offers">
                <i class="fas fa-tags"></i>
                <h3>لا توجد عروض</h3>
                <p>لا توجد عروض متاحة في هذا القسم حالياً</p>
            </div>
        `;
        return;
    }
    
    filteredOffers.forEach(offer => {
        const timeLeft = calculateTimeLeft(offer.endDate);
        
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card';
        offerCard.innerHTML = `
            <div class="offer-badge">-${offer.discount}%</div>
            <div class="product-image">
                <img src="${offer.image}" alt="${offer.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${offer.title}</h3>
                <div class="product-category">${offer.category}</div>
                <div class="offer-price">
                    <span class="current-price">${offer.currentPrice.toLocaleString()} ر.س</span>
                    <span class="original-price">${offer.originalPrice.toLocaleString()} ر.س</span>
                </div>
                <div class="offer-timer-small">
                    <div class="timer-unit-small">
                        <div class="timer-value-small">${timeLeft.days}</div>
                        <div class="timer-label-small">أيام</div>
                    </div>
                    <div class="timer-unit-small">
                        <div class="timer-value-small">${timeLeft.hours}</div>
                        <div class="timer-label-small">ساعات</div>
                    </div>
                    <div class="timer-unit-small">
                        <div class="timer-value-small">${timeLeft.minutes}</div>
                        <div class="timer-label-small">دقائق</div>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart">أضف إلى السلة</button>
                    <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        
        offersGrid.appendChild(offerCard);
    });
    
    // إضافة event listeners للمنتجات
    attachProductEvents();
}

// حساب الوقت المتبقي
function calculateTimeLeft(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;
    
    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0 };
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
}

// تصفية العروض
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر الحالي
            this.classList.add('active');
            
            // تطبيق التصفية
            const filter = this.getAttribute('data-filter');
            displayOffers(filter);
        });
    });
}

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    displayOffers();
    setupFilterButtons();
    
    // تحديث العداد كل دقيقة
    setInterval(() => {
        document.querySelectorAll('.offer-card').forEach((card, index) => {
            const offer = offersData[index];
            if (offer) {
                const timeLeft = calculateTimeLeft(offer.endDate);
                const timerValues = card.querySelectorAll('.timer-value-small');
                
                if (timerValues.length >= 3) {
                    timerValues[0].textContent = timeLeft.days;
                    timerValues[1].textContent = timeLeft.hours;
                    timerValues[2].textContent = timeLeft.minutes;
                }
            }
        });
    }, 60000);
});
