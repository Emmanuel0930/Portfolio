const contactLink =
    document.createElement('link');

contactLink.rel = 'stylesheet';
contactLink.href = 'contact-form/contact-form.css';

document.head.appendChild(contactLink);

fetch('contact-form/contact-form.html')
    .then(response => response.text())
    .then(data => {

        document
            .getElementById('contact-form-container')
            .innerHTML = data;

        startContactForm();
    });

function startContactForm() {

    const modal =
        document.getElementById('contactModal');

    const openButton =
        document.getElementById('open-contact-form');

    const closeButton =
        document.querySelector('.contact-close-btn');

    openButton.addEventListener('click', (e) => {

        e.preventDefault();

        modal.classList.add('active');
    });

    closeButton.addEventListener('click', () => {

        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {

            modal.classList.remove('active');
        }
    });

    document
        .getElementById('contactForm')
        .addEventListener('submit', submitForm);
}

function showToast(title, message, type = 'success') {

    const toast =
        document.getElementById('toast');

    const icon =
        toast.querySelector('.toast-icon');

    document.getElementById('toastTitle').textContent =
        title;

    document.getElementById('toastMessage').textContent =
        message;

    icon.textContent =
        type === 'success'
            ? '✓'
            : '✕';

    toast.className =
        `toast ${type} show`;

    setTimeout(() => {

        toast.classList.remove('show');

    }, 4000);
}

async function submitForm(e) {

    e.preventDefault();

    const button =
        document.querySelector('.send-btn');

    button.disabled = true;
    button.textContent = 'Sending...';

    const payload = {

        name:
            document.getElementById('contactName').value,

        email:
            document.getElementById('contactEmail').value,

        subject:
            document.getElementById('contactSubject').value,

        message:
            document.getElementById('contactMessage').value
    };

    try {

        await emailjs.send(

            'default_service',
            'template_eg02ie6',
            payload

        );

        showToast(
            'Your message has been sent successfully!',
        );

        document
            .getElementById('contactForm')
            .reset();

        document
            .getElementById('contactModal')
            .classList.remove('active');

    }
    catch (error) {

        console.error(error);

        showToast(
            'Something went wrong. Please try again.',
            'error'
        );
    }

    finally {

        button.disabled = false;
        button.textContent = 'Send Message';
    }
}
