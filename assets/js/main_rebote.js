const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Dimensiones
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {

    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = color;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * this.speed * 2;
        this.dy = (Math.random() - 0.5) * this.speed * 2;
    }

    draw(context) {
        context.beginPath();

        // 🔹 RELLENO (fondo del círculo)
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fill();

        // 🔹 BORDE
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();

        // 🔹 TEXTO
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        this.draw(context);

        // Rebote con paredes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// 🔹 Crear N círculos
let circles = [];
let N = 10;

for (let i = 0; i < N; i++) {
    let radius = Math.floor(Math.random() * 40 + 20);
    let x = Math.random() * (window_width - 2 * radius) + radius;
    let y = Math.random() * (window_height - 2 * radius) + radius;

    circles.push(new Circle(x, y, radius, "blue", i + 1, 3));
}

// 🔹 Función para color aleatorio
function colorAleatorio() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// 🔹 Colisiones con rebote
function detectarColisiones() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[j].posX - circles[i].posX;
            let dy = circles[j].posY - circles[i].posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia <= circles[i].radius + circles[j].radius) {

                // 🔥 CAMBIO DE COLOR
                circles[i].color = colorAleatorio();
                circles[j].color = colorAleatorio();

                // 🔥 REBOTE (intercambio de velocidades)
                let tempDx = circles[i].dx;
                let tempDy = circles[i].dy;

                circles[i].dx = circles[j].dx;
                circles[i].dy = circles[j].dy;

                circles[j].dx = tempDx;
                circles[j].dy = tempDy;
            }
        }
    }
}

let updateCircle = function () {
    requestAnimationFrame(updateCircle);

    ctx.clearRect(0, 0, window_width, window_height);

    circles.forEach(circle => circle.update(ctx));

    detectarColisiones();
};

updateCircle();