document.addEventListener('DOMContentLoaded', () => {
    // Unix timestamp (in seconds) to count down to
    // const toDayFromNow = (new Date("Oct 06, 2024 08:30:00").getTime() / 1000) + (3600 / 60 / 60 / 24) - 1;
    const toDayFromNow = (new Date("Jul 20, 2024 02:40:00").getTime() / 1000) + (3600 / 60 / 60 / 24) - 1;
    // Set Up FlipDown
    const flipdown = new FlipDown(toDayFromNow)

    // Start The Count Down
    .start()
    // Do Something When The Countdown Ends
    .ifEnded(() => {
        document.querySelector(".flipdown").innerHTML = `<h2>The moon is beautiful isn't it?</h2>`;
    });
});