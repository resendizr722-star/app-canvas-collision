let circles2 = [];

function initColision(N) {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    circles2 = [];

    for (let i = 0; i < N; i++) {
        circles2.push({
            x: Math.random()*300,
            y: Math.random()*200,
            r: 15,
            dx: 2,
            dy: 2,
            color: "yellow"
        });
    }

    function animate() {
        ctx.clearRect(0,0,300,200);

        circles2.forEach(c => {
            c.x += c.dx;
            c.y += c.dy;

            if (c.x < 0 || c.x > 300) c.dx *= -1;
            if (c.y < 0 || c.y > 200) c.dy *= -1;

            c.color = "yellow";
        });

        // detectar colisiones
        for (let i=0;i<circles2.length;i++){
            for (let j=i+1;j<circles2.length;j++){
                let dx = circles2[i].x - circles2[j].x;
                let dy = circles2[i].y - circles2[j].y;
                let dist = Math.sqrt(dx*dx+dy*dy);

                if(dist < circles2[i].r + circles2[j].r){
                    circles2[i].color="red";
                    circles2[j].color="red";
                }
            }
        }

        circles2.forEach(c=>{
            ctx.beginPath();
            ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
            ctx.fillStyle=c.color;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

initColision(10);