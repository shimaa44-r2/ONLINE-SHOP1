// تحسين وظيفة البحث
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});

// تهيئة البحث
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput || !searchButton) return;
    
    // بحث عند النقر على زر البحث
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    // بحث عند الضغط على Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    // اقتراحات البحث أثناء الكتابة
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        
        if (query.length < 2) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.classList.remove('active');
            return;
        }
        
        showSearchSuggestions(query);
    });
    
    // إخفاء الاقتراحات عند فقدان التركيز
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchSuggestions.classList.remove('active');
        }, 200);
    });
    
    // إظهار الاقتراحات عند التركيز
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            searchSuggestions.classList.add('active');
        }
    });
}

// عرض اقتراحات البحث
function showSearchSuggestions(query) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // في بيئة حقيقية، هنا سيتم جلب الاقتراحات من الخادم
    const suggestions = getSearchSuggestions(query);
    
    if (suggestions.length === 0) {
        searchSuggestions.innerHTML = '<div class="suggestion-item">لا توجد نتائج</div>';
    } else {
        searchSuggestions.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" data-search="${suggestion}">
                <i class="fas fa-search"></i>
                <span>${suggestion}</span>
            </div>
        `).join('');
    }
    
    searchSuggestions.classList.add('active');
    
    // إضافة event listeners للاقتراحات
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const searchValue = item.getAttribute('data-search');
            document.getElementById('searchInput').value = searchValue;
            performSearch(searchValue);
            searchSuggestions.classList.remove('active');
        });
    });
}

// الحصول على اقتراحات البحث
function getSearchSuggestions(query) {
    // في بيئة حقيقية، هنا سيتم جلب البيانات من الخادم
    const allSuggestions = [
        'iPhone 13 Pro',
        'لابتوب ديل XPS 15',
        'ساعة أبل Series 7',
        'حذاء رياضي نايك',
        'سماعات الرأس سوني',
        'كاميرا كانون EOS',
        'ماك بوك برو',
        'هواتف ذكية',
        'أجهزة كمبيوتر',
        'ملابس رياضية',
        'أثاث منزلي'
    ];
    
    return allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
}

// تنفيذ البحث
function performSearch(query) {
    if (!query.trim()) {
        alert('يرجى إدخال كلمة للبحث');
        return;
    }
    
    // في بيئة حقيقية، هنا سيتم توجيه المستخدم إلى صفحة نتائج البحث
    // حالياً، سنقوم بتوجيهه إلى صفحة المنتجات مع معلمة البحث
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}

// إضافة أنماط للبحث والاقتراحات
const searchStyles = `
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        max-height: 300px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
    }
    
    .search-suggestions.active {
        display: block;
    }
    
    .suggestion-item {
        padding: 12px 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: background-color 0.2s;
    }
    
    .suggestion-item:hover {
        background-color: #f5f5f5;
    }
    
    .suggestion-item i {
        color: var(--dark-gray);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid var(--success);
    }
    
    .notification-error {
        border-left: 4px solid var(--danger);
    }
    
    .close-notification {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        margin-right: 10px;
    }
`;

// إضافة الأنماط إلى الصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);
