document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const summaryCard = document.getElementById('summary');
    const summaryContent = document.getElementById('summaryContent');
    const resetBtn = document.getElementById('resetForm');

    const fields = [
        { id: 'fullName', validate: val => val.trim().length >= 3, errorMsg: 'Name must be at least 3 characters long.' },
        { id: 'dob', validate: val => val !== '', errorMsg: 'Date of birth is required.' },
        { id: 'email', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), errorMsg: 'Enter a valid email address.' },
        { id: 'phone', validate: val => /^\d{10}$/.test(val), errorMsg: 'Phone must be exactly 10 digits.' },
        { id: 'gender', validate: val => val !== '', errorMsg: 'Please select a gender.' },
        { id: 'address', validate: val => val.trim().length >= 5, errorMsg: 'Address must be at least 5 characters long.' },
        { id: 'city', validate: val => val.trim().length >= 2, errorMsg: 'City is required.' },
        { id: 'pin', validate: val => /^\d{6}$/.test(val), errorMsg: 'PIN code must be exactly 6 digits.' },
        { id: 'password', validate: val => val.length >= 6, errorMsg: 'Password must be at least 6 characters.' },
        { id: 'confirmPassword', validate: val => val === document.getElementById('password').value && val !== '', errorMsg: 'Passwords do not match.' }
    ];

    const validateField = (field) => {
        const input = document.getElementById(field.id);
        const errorSpan = document.getElementById(`${field.id}Error`);
        const isValid = field.validate(input.value);

        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorSpan.textContent = '';
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorSpan.textContent = field.errorMsg;
        }
        return isValid;
    };

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.addEventListener('input', () => validateField(field));
        input.addEventListener('blur', () => validateField(field));
    });

    document.getElementById('password').addEventListener('input', () => {
        const cp = document.getElementById('confirmPassword');
        if (cp.value) {
            validateField(fields.find(f => f.id === 'confirmPassword'));
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            form.classList.add('hidden');
            summaryCard.classList.remove('hidden');

            const summaryHTML = `
                <p><strong>Name:</strong> ${document.getElementById('fullName').value}</p>
                <p><strong>DOB:</strong> ${document.getElementById('dob').value}</p>
                <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
                <p><strong>Phone:</strong> ${document.getElementById('phone').value}</p>
                <p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
                <p><strong>Address:</strong> ${document.getElementById('address').value}</p>
                <p><strong>City:</strong> ${document.getElementById('city').value}</p>
                <p><strong>PIN:</strong> ${document.getElementById('pin').value}</p>
            `;
            summaryContent.innerHTML = summaryHTML;
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        fields.forEach(field => {
            const input = document.getElementById(field.id);
            input.classList.remove('valid', 'invalid');
            document.getElementById(`${field.id}Error`).textContent = '';
        });
        summaryCard.classList.add('hidden');
        form.classList.remove('hidden');
    });
});
