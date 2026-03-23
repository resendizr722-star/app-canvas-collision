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
        this.color = color;
        this.originalColor = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * this.speed * 2;
        this.dy = (Math.random() - 0.5) * this.speed * 2;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {

        //Rebote con paredes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

// 🔴 FUNCIÓN DE COLISIÓN
function detectarColision(c1, c2) {
    let dx = c1.posX - c2.posX;
    let dy = c1.posY - c2.posY;
    let distancia = Math.sqrt(dx * dx + dy * dy);

    return distancia < (c1.radius + c2.radius);
}

// 🔵 CREAR N CÍRCULOS
let numCirculos = 10;
let circles = [];

for (let i = 0; i < numCirculos; i++) {
    let radius = Math.floor(Math.random() * 40) + 20;

    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    let circle = new Circle(x, y, radius, "blue", i + 1, 3);
    circles.push(circle);
}

// 🔁 ANIMACIÓN
function updateCircle() {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    // Resetear colores
    circles.forEach(c => c.color = c.originalColor);

    // Detectar colisiones ENTRE TODOS
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            if (detectarColision(circles[i], circles[j])) {
                circles[i].color = "red";
                circles[j].color = "red";
            }

        }
    }

    // Actualizar todos
    circles.forEach(c => c.update(ctx));
}

updateCircle();