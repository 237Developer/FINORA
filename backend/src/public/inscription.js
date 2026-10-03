document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.inscription_form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsInput = document.getElementById('terms');

    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirmPassword-error');
    const termsError = document.getElementById('terms-error');

    const showError = (element, message) => {
        element.textContent = message.toLowerCase();
        element.style.display = 'block';
    };

    const hideError = (element) => {
        element.textContent = '';
        element.style.display = 'none';
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            showError(emailError, "l'email est requis");
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailError, "format d'email invalide");
            return false;
        }
        hideError(emailError);
        return true;
    };

    const validatePassword = () => {
        const value = passwordInput.value;
        const hasNumber = /\d/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        if (value.length < 8) {
            showError(passwordError, "le mot de passe doit avoir au moins 8 caractères");
            return false;
        } else if (!hasNumber || !hasUpper) {
            showError(passwordError, "le mot de passe doit contenir au moins un chiffre et une majuscule");
            return false;
        }
        hideError(passwordError);
        return true;
    };

    const validateConfirmPassword = () => {
        const value = confirmPasswordInput.value;
        const password = passwordInput.value;
        if (value !== password) {
            showError(confirmPasswordError, "les mots de passe ne correspondent pas");
            return false;
        }
        hideError(confirmPasswordError);
        return true;
    };

    const validateTerms = () => {
        if (!termsInput.checked) {
            showError(termsError, "vous devez accepter les conditions");
            return false;
        }
        hideError(termsError);
        return true;
    };

    const handleBlur = (validateFn, errorElement) => {
        const isValid = validateFn();
        if (!isValid) {
            errorElement.style.display = 'block';
        }
    };

    const handleInput = (validateFn, errorElement) => {
        if (errorElement.style.display === 'block') {
            const isValid = validateFn();
            if (isValid) {
                hideError(errorElement);
            }
        }
    };

    emailInput.addEventListener('blur', () => handleBlur(validateEmail, emailError));
    emailInput.addEventListener('input', () => handleInput(validateEmail, emailError));

    passwordInput.addEventListener('blur', () => handleBlur(validatePassword, passwordError));
    passwordInput.addEventListener('input', () => handleInput(validatePassword, passwordError));

    confirmPasswordInput.addEventListener('blur', () => handleBlur(validateConfirmPassword, confirmPasswordError));
    confirmPasswordInput.addEventListener('input', () => handleInput(validateConfirmPassword, confirmPasswordError));

    termsInput.addEventListener('change', validateTerms);

    form.addEventListener('submit', (e) => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        if (!isEmailValid || !isPasswordValid || !isConfirmValid || !isTermsValid) {
            e.preventDefault();
        }
    });

    // Toggle password visibility (logic already exists in some forms, but let's ensure it works)
    const toggleButtons = document.querySelectorAll('.inscription_iconButton');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
        });
    });
});
