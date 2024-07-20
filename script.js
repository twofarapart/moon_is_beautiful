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
    }, 7000); // 3 seconds

    setTimeout(() => {
        const birthdayCard = document.querySelector('.birthday-card');
        if (birthdayCard) {
            birthdayCard.style.opacity = '1'; // Fade in the card
        }
    }, 5000);

    var w = c.width = window.innerWidth,
        h = c.height = window.innerHeight,
        ctx = c.getContext('2d'),

        opts = {

            len: 20,
            count: 50,
            baseTime: 10,
            addedTime: 10,
            dieChance: .05,
            spawnChance: 1,
            sparkChance: .1,
            sparkDist: 10,
            sparkSize: 2,

            color: 'hsl(hue,100%,light%)',
            baseLight: 50,
            addedLight: 10, // [50-10,50+10]
            shadowToTimePropMult: 6,
            baseLightInputMultiplier: .01,
            addedLightInputMultiplier: .02,

            cx: w / 2,
            cy: h / 2,
            repaintAlpha: .04,
            hueChange: .1
        },

        tick = 0,
        lines = [],
        dieX = w / 2 / opts.len,
        dieY = h / 2 / opts.len,

        baseRad = Math.PI * 2 / 6;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    function loop() {

        window.requestAnimationFrame(loop);

        ++tick;

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';

        if (lines.length < opts.count && Math.random() < opts.spawnChance)
            lines.push(new Line);

        lines.map(function (line) { line.step(); });
    }
    function Line() {

        this.reset();
    }
    Line.prototype.reset = function () {

        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;

        this.rad = 0;

        this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();

        this.color = opts.color.replace('hue', tick * opts.hueChange);
        this.cumulativeTime = 0;

        this.beginPhase();
    }
    Line.prototype.beginPhase = function () {

        this.x += this.addedX;
        this.y += this.addedY;

        this.time = 0;
        this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;

        this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
        this.addedX = Math.cos(this.rad);
        this.addedY = Math.sin(this.rad);

        if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY)
            this.reset();
    }
    Line.prototype.step = function () {

        ++this.time;
        ++this.cumulativeTime;

        if (this.time >= this.targetTime)
            this.beginPhase();

        var prop = this.time / this.targetTime,
            wave = Math.sin(prop * Math.PI / 2),
            x = this.addedX * wave,
            y = this.addedY * wave;

        ctx.shadowBlur = prop * opts.shadowToTimePropMult;
        ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
        ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);

        if (Math.random() < opts.sparkChance)
            ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize)
    }
    loop();

    window.addEventListener('resize', function () {

        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);

        opts.cx = w / 2;
        opts.cy = h / 2;

        dieX = w / 2 / opts.len;
        dieY = h / 2 / opts.len;
    });
});

