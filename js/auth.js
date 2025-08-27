// إدارة نموذج المصادقة
document.addEventListener('DOMContentLoaded', () => {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    // تبديل بين تسجيل الدخول وإنشاء حساب
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار
            authTabs.forEach(t => t.classList.remove('active'));
            // إضافة النشاط للزر الحالي
            tab.classList.add('active');
            
            // إخفاء جميع النماذج
            authForms.forEach(form => form.classList.remove('active'));
            // إظهار النموذج المحدد
            document.getElementById(`${targetTab}Form`).classList.add('active');
        });
    });
    
    // التحقق من صحة نموذج تسجيل الدخول
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (validateLoginForm(email, password)) {
            // في بيئة حقيقية، هنا سيتم إرسال البيانات إلى الخادم
            simulateLogin();
        }
    });
    
    // التحقق من صحة نموذج إنشاء حساب
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('registerFirstName').value;
        const lastName = document.getElementById('registerLastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const terms = document.querySelector('input[name="terms"]').checked;
        
        if (validateRegisterForm(firstName, lastName, email, password, confirmPassword, terms)) {
            // في بيئة حقيقية، هنا سيتم إرسال البيانات إلى الخادم
            simulateRegistration();
        }
    });
    
    // المصادقة الاجتماعية
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`سيتم توجيهك إلى صفحة مصادقة ${provider}`);
        });
    });
});

// التحقق من صحة نموذج تسجيل الدخول
function validateLoginForm(email, password) {
    let isValid = true;
    
    // مسح أخطاء سابقة
    clearErrors('loginForm');
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('loginEmail', 'يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('loginEmail', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!password) {
        showError('loginPassword', 'يرجى إدخال كلمة المرور');
        isValid = false;
    } else if (password.length < 6) {
        showError('loginPassword', 'كلمة المرور يجب أن تحتوي على الأقل على 6 أحرف');
        isValid = false;
    }
    
    return isValid;
}

// التحقق من صحة نموذج إنشاء حساب
function validateRegisterForm(firstName, lastName, email, password, confirmPassword, terms) {
    let isValid = true;
    
    // مسح أخطاء سابقة
    clearErrors('registerForm');
    
    // التحقق من الاسم الأول
    if (!firstName) {
        showError('registerFirstName', 'يرجى إدخال الاسم الأول');
        isValid = false;
    }
    
    // التحقق من اسم العائلة
    if (!lastName) {
        showError('registerLastName', 'يرجى إدخال اسم العائلة');
        isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('registerEmail', 'يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('registerEmail', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!password) {
        showError('registerPassword', 'يرجى إدخال كلمة المرور');
        isValid = false;
    } else if (password.length < 6) {
        showError('registerPassword', 'كلمة المرور يجب أن تحتوي على الأقل على 6 أحرف');
        isValid = false;
    }
    
    // التحقق من تأكيد كلمة المرور
    if (!confirmPassword) {
        showError('registerConfirmPassword', 'يرجى تأكيد كلمة المرور');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('registerConfirmPassword', 'كلمتا المرور غير متطابقتين');
        isValid = false;
    }
    
    // التحقق من الموافقة على الشروط
    if (!terms) {
        alert('يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }
    
    return isValid;
}

// عرض الخطأ
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = input.nextElementSibling;
    
    input.style.borderColor = 'var(--danger)';
    errorElement.textContent = message;
}

// مسح الأخطاء
function clearErrors(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    const errorMessages = form.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
    
    errorMessages.forEach(message => {
        message.textContent = '';
    });
}

// محاكاة تسجيل الدخول
function simulateLogin() {
    // في بيئة حقيقية، هنا سيتم إرسال البيانات إلى الخادم
    alert('تم تسجيل الدخول بنجاح! سيتم توجيهك إلى الصفحة الرئيسية.');
    // توجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// محاكاة إنشاء حساب
function simulateRegistration() {
    // في بيئة حقيقية، هنا سيتم إرسال البيانات إلى الخادم
    alert('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
    // التبديل إلى نموذج تسجيل الدخول
    document.querySelector('[data-tab="login"]').click();
}
