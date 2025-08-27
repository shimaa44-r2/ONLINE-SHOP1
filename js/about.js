// عد الإحصائيات مع تحسينات
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // أقل قيمة = أسرع
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(animateCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل عداد الإحصائيات عندما يكون القسم في مجال الرؤية
    const statsSection = document.querySelector('.stats-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // إضافة تأثيرات للعناصر عند التمرير
    const animatedElements = document.querySelectorAll('.mv-card, .team-member');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        elementObserver.observe(element);
    });
});
