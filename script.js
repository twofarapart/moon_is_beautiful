document.addEventListener('DOMContentLoaded', () => {
    const countdownDate = new Date("Oct 06, 2024 08:30:00").getTime();
    const video = document.querySelector('video');
    const container = document.querySelector('.container');
    const tempPage1 = document.querySelector('.temp-page-1');
    const tempPage2 = document.querySelector('.temp-page-2');
    const birthdayCard = document.querySelector('.birthday-card');
    const flipdownElement = document.querySelector(".flipdown");
    const titleElement = document.querySelector(".title");
    const wishElement = document.querySelector(".wish");

    const flipdown = new FlipDown(countdownDate / 1000 - 1)
        .start()
        .ifEnded(() => {
            flipdownElement.innerHTML = '';
            titleElement.innerHTML = '';
            wishElement.innerHTML = `<h2>The moon is beautiful isn't it?</h2>`;
        });

    container.style.display = 'none';
    tempPage2.style.display = 'none';

    setTimeout(() => {
        tempPage1.style.display = 'none';
        tempPage2.style.display = 'block';
        video.play();

        setTimeout(() => {
            tempPage2.style.display = 'none';
            container.style.display = 'block';
            setTimeout(() => container.style.opacity = 1, 200);
        }, 12000);
    }, 7000);

    setTimeout(() => {
        if (birthdayCard) {
            birthdayCard.style.opacity = '1';
        }
    }, 5000);

    const c = document.querySelector('canvas');
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    const ctx = c.getContext('2d');

    const opts = {
        len: 20,
        count: 50,
        baseTime: 10,
        addedTime: 10,
        dieChance: 0.05,
        spawnChance: 1,
        sparkChance: 0.1,
        sparkDist: 10,
        sparkSize: 2,
        color: 'hsl(hue,100%,light%)',
        baseLight: 50,
        addedLight: 10,
        shadowToTimePropMult: 6,
        baseLightInputMultiplier: 0.01,
        addedLightInputMultiplier: 0.02,
        cx: w / 2,
        cy: h / 2,
        repaintAlpha: 0.04,
        hueChange: 0.1
    };

    let tick = 0;
    const lines = [];
    let dieX = w / 2 / opts.len;
    let dieY = h / 2 / opts.len;
    const baseRad = Math.PI * 2 / 6;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    function loop() {
        requestAnimationFrame(loop);
        tick++;

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';

        if (lines.length < opts.count && Math.random() < opts.spawnChance) {
            lines.push(new Line());
        }

        lines.forEach(line => line.step());
    }

    class Line {
        constructor() {
            this.reset();
        }

        reset() {
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

        beginPhase() {
            this.x += this.addedX;
            this.y += this.addedY;
            this.time = 0;
            this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
            this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
            this.addedX = Math.cos(this.rad);
            this.addedY = Math.sin(this.rad);

            if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) {
                this.reset();
            }
        }

        step() {
            this.time++;
            this.cumulativeTime++;

            if (this.time >= this.targetTime) {
                this.beginPhase();
            }

            const prop = this.time / this.targetTime;
            const wave = Math.sin(prop * Math.PI / 2);
            const x = this.addedX * wave;
            const y = this.addedY * wave;

            ctx.shadowBlur = prop * opts.shadowToTimePropMult;
            ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
            ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);

            if (Math.random() < opts.sparkChance) {
                ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize);
            }
        }
    }

    loop();

    window.addEventListener('resize', () => {
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
