let circles2 = [];
let animation2;

function randomColor() {
    return `hsl(${Math.random()*360}, 80%, 60%)`;
}

class CircleCollision {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;

        let angle = Math.random() * Math.PI * 2;
        let speed = 2;

        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;

        this.color = randomColor();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
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

function initColision(N) {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    cancelAnimationFrame(animation2);
    circles2 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 15 + 10;
        let x = Math.random() * (canvas.width - 2 * r) + r;
        let y = Math.random() * (canvas.height - 2 * r) + r;

        circles2.push(new CircleCollision(x, y, r));
    }

    function detectar() {
        for (let i = 0; i < circles2.length; i++) {
            for (let j = i + 1; j < circles2.length; j++) {

                let dx = circles2[i].x - circles2[j].x;
                let dy = circles2[i].y - circles2[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < circles2[i].r + circles2[j].r) {
                    circles2[i].color = randomColor();
                    circles2[j].color = randomColor();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        circles2.forEach(c => c.update(ctx, canvas.width, canvas.height));
        detectar();

        animation2 = requestAnimationFrame(animate);
    }

    animate();
}

initColision(10);