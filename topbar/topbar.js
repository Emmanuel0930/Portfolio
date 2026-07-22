const topbarLink = document.createElement('link');
topbarLink.rel = 'stylesheet';
topbarLink.href = 'topbar/topbar.css';

document.head.appendChild(topbarLink);

fetch('topbar/topbar.html')
    .then(response => response.text())
    .then(data => {

        document.getElementById('topbar-container').innerHTML = data;

        startTopbar();
    });

function startTopbar() {
    let lastScroll = 0;
    let upwardDistance = 0;

    const navbar = document.querySelector('.topbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Bajando
        if (currentScroll > lastScroll) {
            navbar.classList.add('hidden');
            upwardDistance = 0;
        }
        // Subiendo
        else {
            upwardDistance += lastScroll - currentScroll;

            navbar.classList.remove('hidden');

            if (upwardDistance < 5) {
                navbar.classList.add('transparent');
                navbar.classList.remove('visible');
            } else {
                navbar.classList.remove('transparent');
                navbar.classList.add('visible');
            }
        }

        lastScroll = currentScroll;
    });
}