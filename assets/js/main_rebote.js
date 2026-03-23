let circles3 = [];

function initRebote(N) {
    const canvas = document.getElementById("canvas3");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    circles3 = [];

    for (let i = 0; i < N; i++) {
        circles3.push({
            x: Math.random()*300,
            y: Math.random()*200,
            r: 15,
            dx: (Math.random()-0.5)*4,
            dy: (Math.random()-0.5)*4,
            color: "lime"
        });
    }

    function animate() {
        ctx.clearRect(0,0,300,200);

        circles3.forEach(c=>{
            c.x += c.dx;
            c.y += c.dy;

            if(c.x<0||c.x>300) c.dx*=-1;
            if(c.y<0||c.y>200) c.dy*=-1;

            c.color="lime";
        });

        // colisiones con rebote
        for (let i=0;i<circles3.length;i++){
            for (let j=i+1;j<circles3.length;j++){

                let dx = circles3[j].x - circles3[i].x;
                let dy = circles3[j].y - circles3[i].y;
                let dist = Math.sqrt(dx*dx+dy*dy);

                if(dist < circles3[i].r + circles3[j].r){

                    // intercambio de velocidades
                    let tempDx = circles3[i].dx;
                    let tempDy = circles3[i].dy;

                    circles3[i].dx = circles3[j].dx;
                    circles3[i].dy = circles3[j].dy;

                    circles3[j].dx = tempDx;
                    circles3[j].dy = tempDy;

                    circles3[i].color="orange";
                    circles3[j].color="orange";
                }
            }
        }

        circles3.forEach(c=>{
            ctx.beginPath();
            ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
            ctx.fillStyle=c.color;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

initRebote(10);