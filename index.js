document.addEventListener('DOMContentLoaded', () => {
    const countdownDate = new Date("Oct 06, 2024 08:30:00").getTime();
    const pages = document.querySelectorAll('.page');
    const videoElement = document.querySelector('#video');

    new FlipDown(countdownDate / 1000 - 1)
        .start()
        .ifEnded(() => {
            const message = document.getElementById('message');
            message.classList.add('surprise');
            message.innerHTML = '<h2>The moon is beautiful, isn\'t it?</h2>';
            document.getElementById('para').style.display = 'none';

            document.getElementsByClassName('moon')[0].style.display = 'block';
        });

    function transitionToPage(pageId) {
        pages.forEach(page => {
            requestAnimationFrame(() => {
                page.style.cssText = 'opacity: 0; visibility: hidden; transition: opacity 2s ease-in-out, visibility 0s linear 2s;';
            });
        });

        const targetPage = document.getElementById(pageId);
        requestAnimationFrame(() => {
            targetPage.style.display = 'block';
            requestAnimationFrame(() => {
                targetPage.style.cssText = 'opacity: 1; visibility: visible; transition: opacity 2s ease-in-out, visibility 0s linear 0s;';
                if (pageId === 'page-2') {
                    videoElement.play();
                }
            });
        });
    }

    const timeouts = [{ 'page-1': 0 }, { 'page-2': 3000 }, { 'page-3': 12800 }];
    timeouts.forEach(timeout => {
        Object.entries(timeout).forEach(([key, value]) => {
            setTimeout(() => transitionToPage(key), value);
        });
    });
});
