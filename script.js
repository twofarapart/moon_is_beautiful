document.addEventListener('DOMContentLoaded', () => {
    // Unix timestamp (in seconds) to count down to
    const toDayFromNow = (new Date("Oct 06, 2024 08:30:00").getTime() / 1000) + (3600 / 60 / 60 / 24) - 1;
    const video = document.querySelector('video');
    // Set Up FlipDown
    const flipdown = new FlipDown(toDayFromNow)

        // Start The Count Down
        .start()
        // Do Something When The Countdown Ends
        .ifEnded(() => {
            document.querySelector(".flipdown").innerHTML = '';
            document.querySelector(".title").innerHTML = '';
            document.querySelector(".wish").innerHTML = `<h2>The moon is beautiful isn't it?</h2>`;
        });


    // Initially hide the main container and temp-page-2
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.temp-page-2').style.display = 'none'; // Hide temp-page-2 initially

    // Show temp-page-1 for 3 seconds
    setTimeout(function () {
        document.querySelector('.temp-page-1').style.display = 'none';
        document.querySelector('.temp-page-2').style.display = 'block'; // Show temp-page-2
        video.play();

        // After 12 seconds, prepare to show the main container with a fade-in effect
        setTimeout(function () {
            document.querySelector('.temp-page-2').style.display = 'none';

            const container = document.querySelector('.container');
            container.style.display = 'block'; // Make the container take up space

            // Use setTimeout to allow the browser to render the container before starting the fade-in effect
            setTimeout(() => container.style.opacity = 1, 10); // Start fade-in after a very short delay
        }, 12000); // 12 seconds
    }, 3000); // 3 seconds
});

