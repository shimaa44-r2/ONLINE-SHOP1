// عد تنازلي للعرض
function updateDealTimer() {
    const days = document.querySelector('.timer-unit:nth-child(1) .timer-value');
    const hours = document.querySelector('.timer-unit:nth-child(2) .timer-value');
    const minutes = document.querySelector('.timer-unit:nth-child(3) .timer-value');
    const seconds = document.querySelector('.timer-unit:nth-child(4) .timer-value');
    
    if (days && hours && minutes && seconds) {
        let sec = parseInt(seconds.textContent);
        let min = parseInt(minutes.textContent);
        let hr = parseInt(hours.textContent);
        let d = parseInt(days.textContent);
        
        sec--;
        
        if (sec < 0) {
            sec = 59;
            min--;
            
            if (min < 0) {
                min = 59;
                hr--;
                
                if (hr < 0) {
                    hr = 23;
                    d--;
                    
                    if (d < 0) {
                        d = 0;
                        hr = 0;
                        min = 0;
                        sec = 0;
                    }
                }
            }
        }
        
        days.textContent = d.toString().padStart(2, '0');
        hours.textContent = hr.toString().padStart(2, '0');
        minutes.textContent = min.toString().padStart(2, '0');
        seconds.textContent = sec.toString().padStart(2, '0');
    }
}

// تشغيل العداد إذا كان موجودًا في الصفحة
if (document.querySelector('.deal-timer')) {
    setInterval(updateDealTimer, 1000);
}

// إضافة إلى السلة
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const currentCount = parseInt(document.querySelector('.cart-count').textContent);
        updateCartCount(currentCount + 1);
        
        // تأثير على الزر
        e.target.textContent = 'تمت الإضافة!';
        e.target.style.background = 'var(--success)';
        
        setTimeout(() => {
            e.target.textContent = 'أضف إلى السلة';
            e.target.style.background = '';
        }, 1500);
    }
});

// إضافة إلى المفضلة
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-wishlist')) {
        const icon = e.target.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            e.target.style.color = 'var(--danger)';
            e.target.style.borderColor = 'var(--danger)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            e.target.style.color = '';
            e.target.style.borderColor = '';
        }
    }
});
