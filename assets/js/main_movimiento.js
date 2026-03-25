let circles1 = [];
let animation1;

class CircleMove {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;

        let angle = Math.random() * Math.PI * 2;
        let speed = 2;

        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
    }

    draw(ctx) {
        let gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.r);
        gradient.addColorStop(0, "#00f5ff");
        gradient.addColorStop(1, "#0066ff");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.shadowColor = "#00f5ff";
        ctx.shadowBlur = 15;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }

    update(ctx, w, h) {
        if (this.x + this.r >= w || this.x - this.r <= 0) this.dx *= -1;
        if (this.y + this.r >= h || this.y - this.r <= 0) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;

        this.draw(ctx);
    }
}

function initMovimiento(N) {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    cancelAnimationFrame(animation1);
    circles1 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 15 + 10;
        let x = Math.random() * (canvas.width - 2 * r) + r;
        let y = Math.random() * (canvas.height - 2 * r) + r;

        circles1.push(new CircleMove(x, y, r));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles1.forEach(c => c.update(ctx, canvas.width, canvas.height));

        animation1 = requestAnimationFrame(animate);
    }

    animate();
}

initMovimiento(10);