// التحقق من صحة النموذج
function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // مسح أخطاء سابقة
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    document.querySelectorAll('input, textarea').forEach(input => {
        input.style.borderColor = '';
    });
    
    // التحقق من الاسم
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        showError(nameInput, 'يرجى إدخال الاسم الكامل');
        isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        showError(emailInput, 'يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // التحقق من الموضوع
    const subjectInput = document.getElementById('subject');
    if (!subjectInput.value.trim()) {
        showError(subjectInput, 'يرجى إدخال موضوع الرسالة');
        isValid = false;
    }
    
    // التحقق من الرسالة
    const messageInput = document.getElementById('message');
    if (!messageInput.value.trim()) {
        showError(messageInput, 'يرجى إدخال محتوى الرسالة');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'الرسالة يجب أن تحتوي على الأقل على 10 أحرف');
        isValid = false;
    }
    
    return isValid;
}

// عرض رسالة الخطأ
function showError(input, message) {
    input.style.borderColor = 'var(--danger)';
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
}

// إرسال النموذج
function submitForm(event) {
    event.preventDefault();
    
    if (validateForm()) {
        // في بيئة حقيقية، هنا سيتم إرسال البيانات إلى الخادم
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        console.log('بيانات النموذج:', formData);
        
        // إظهار رسالة النجاح
        document.getElementById('formSuccess').style.display = 'flex';
        document.getElementById('contactForm').reset();
        
        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => {
            document.getElementById('formSuccess').style.display = 'none';
        }, 5000);
    }
}

// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', submitForm);
    
    // التحقق أثناء الكتابة
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            this.nextElementSibling.textContent = '';
        });
    });
});
