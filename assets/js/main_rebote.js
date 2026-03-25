let circles3 = [];
let animation3;

function randomNeonColor() {
    return `hsl(${Math.random()*360}, 100%, 60%)`;
}

class CircleBounce {
    constructor(x, y, r) {
        this.r = r;

        this.x = Math.max(r, Math.min(300 - r, x));
        this.y = Math.max(r, Math.min(200 - r, y));

        let angle = Math.random() * Math.PI * 2;
        let speed = 2;

        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;

        this.color = randomNeonColor();
    }

    draw(ctx) {

        // 🔥 Gradiente neón
        let gradient = ctx.createRadialGradient(
            this.x, this.y, this.r * 0.2,
            this.x, this.y, this.r
        );

        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();

        // 🔥 Glow fuerte
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 25;

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();

        // 🔥 borde brillante
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update(ctx, w, h) {

        this.x += this.dx;
        this.y += this.dy;

        // 🔥 rebote con corrección
        if (this.x + this.r > w) {
            this.x = w - this.r;
            this.dx *= -1;
        }
        if (this.x - this.r < 0) {
            this.x = this.r;
            this.dx *= -1;
        }
        if (this.y + this.r > h) {
            this.y = h - this.r;
            this.dy *= -1;
        }
        if (this.y - this.r < 0) {
            this.y = this.r;
            this.dy *= -1;
        }

        this.draw(ctx);
    }
}

function initRebote(N) {
    const canvas = document.getElementById("canvas3");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    cancelAnimationFrame(animation3);
    circles3 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 15 + 10;
        let x = Math.random() * (canvas.width - 2 * r) + r;
        let y = Math.random() * (canvas.height - 2 * r) + r;

        circles3.push(new CircleBounce(x, y, r));
    }

    function detectar() {
        for (let i = 0; i < circles3.length; i++) {
            for (let j = i + 1; j < circles3.length; j++) {

                let dx = circles3[j].x - circles3[i].x;
                let dy = circles3[j].y - circles3[i].y;

                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist === 0) dist = 0.1;

                if (dist < circles3[i].r + circles3[j].r) {

                    // 🔥 rebote (intercambio)
                    let tempDx = circles3[i].dx;
                    let tempDy = circles3[i].dy;

                    circles3[i].dx = circles3[j].dx;
                    circles3[i].dy = circles3[j].dy;

                    circles3[j].dx = tempDx;
                    circles3[j].dy = tempDy;

                    // 🔥 separación
                    let overlap = (circles3[i].r + circles3[j].r - dist) / 2;

                    let nx = dx / dist;
                    let ny = dy / dist;

                    circles3[i].x -= overlap * nx;
                    circles3[i].y -= overlap * ny;

                    circles3[j].x += overlap * nx;
                    circles3[j].y += overlap * ny;

                    // 🔥 cambio de color dinámico
                    circles3[i].color = randomNeonColor();
                    circles3[j].color = randomNeonColor();
                }

                // 🔥 clamp final
                circles3[i].x = Math.max(circles3[i].r, Math.min(canvas.width - circles3[i].r, circles3[i].x));
                circles3[i].y = Math.max(circles3[i].r, Math.min(canvas.height - circles3[i].r, circles3[i].y));

                circles3[j].x = Math.max(circles3[j].r, Math.min(canvas.width - circles3[j].r, circles3[j].x));
                circles3[j].y = Math.max(circles3[j].r, Math.min(canvas.height - circles3[j].r, circles3[j].y));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles3.forEach(c => c.update(ctx, canvas.width, canvas.height));

        detectar();

        animation3 = requestAnimationFrame(animate);
    }

    animate();
}

initRebote(10);