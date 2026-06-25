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

async function submitForm(e) {

    e.preventDefault();

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

    console.log(payload);

    /*
    Endpoint futuro

    await fetch('/api/contact', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)
    });
    */
}