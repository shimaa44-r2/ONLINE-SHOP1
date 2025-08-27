// العودة إلى الأعلى
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// تأثيرات التمرير
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// إغلاق رسائل التنبيه
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-alert')) {
        e.target.closest('.alert').style.display = 'none';
    }
});

// تحديث عداد السلة
function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
        
        // تأثير عند التحديث
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
}

// تهيئة أولية
document.addEventListener('DOMContentLoaded', () => {
    // يمكن إضافة أي كود تهيئة هنا
});
