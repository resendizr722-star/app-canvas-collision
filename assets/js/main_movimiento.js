let circles1 = [];

class Circle {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = (Math.random() - 0.5) * speed;
        this.dy = (Math.random() - 0.5) * speed;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "cyan";
        ctx.fill();
    }

    update(ctx, w, h) {
        if (this.x + this.r > w || this.x - this.r < 0) this.dx *= -1;
        if (this.y + this.r > h || this.y - this.r < 0) this.dy *= -1;

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

    circles1 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 20 + 10;
        circles1.push(new Circle(Math.random()*300, Math.random()*200, r, 3));
    }

    function animate() {
        ctx.clearRect(0,0,300,200);
        circles1.forEach(c => c.update(ctx,300,200));
        requestAnimationFrame(animate);
    }

    animate();
}

initMovimiento(10);