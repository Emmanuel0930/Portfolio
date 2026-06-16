const certificatesLink = document.createElement('link');

certificatesLink.rel = 'stylesheet';
certificatesLink.href = 'certificates/certificates.css';

document.head.appendChild(certificatesLink);

fetch('certificates/certificates.html')
    .then(response => response.text())
    .then(data => {

        document.getElementById('certificates-container').innerHTML = data;

        startCertificates();
    });

function startCertificates() {

    const modal =
        document.getElementById('certificatesModal');

    const openButton =
        document.querySelector('#open-certificates');

    const closeButton =
        document.querySelector('.close-btn');

    const list =
        document.getElementById('certificatesList');

    openButton.addEventListener('click', async (e) => {

        e.preventDefault();

        modal.classList.add('active');

        if (!list.hasChildNodes()) {
            await loadCertificates();
        }
    });

    closeButton.addEventListener('click', () => {

        modal.classList.remove('active');

    });

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {
            modal.classList.remove('active');
        }

    });
}

async function loadCertificates() {

    const list =
        document.getElementById('certificatesList');

    const response =
        await fetch('certificates/certificates.json');

    const certificates =
        await response.json();

    certificates.forEach(cert => {

        const item =
            document.createElement('div');

        item.className = 'certificate-card';

        item.innerHTML = `
            <img src="${cert.image}" alt="${cert.title}">

            <div class="certificate-info">
                <h3>${cert.title}</h3>

                <p>${cert.description}</p>

                <a href="${cert.url}" target="_blank">
                    View Certificate
                </a>
            </div>
        `;

        list.appendChild(item);
    });
}