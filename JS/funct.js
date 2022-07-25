function background (){
    Fill("Cornflowerblue");
    Rect(0,0,cnv.width,cnv.height);
    for (i=0;i<cnv.width;i+=20){
        Line(i,cnv.height-45,i+10,cnv.height-45);
    }
}
function movingObj () {
    Fill("DarkOrchid");
    Rect(player.x,player.y,player.w,player.h);
    circle(ball.x,ball.y,ball.r);
    if (!stasis){
       if (ball.xflip){
        ball.x += ball.speed;
    } else {
        ball.x += -ball.speed;
    } if (ball.yflip){
        ball.y += ball.speed;
    } else {
        ball.y += -ball.speed;
    } 
    }
    
}
function drawPellets () {
    Fill("DarkOrchid");
    for (i=0;i<pelletArray.length;i++){
        Rect(pelletArray[i].x,pelletArray[i].y,pelletArray[i].w,pelletArray[i].h);
    }
}
function initPellets () {
    for (i=0;i<20;i++){
        for (n=0;n<10;n++){
            pelletArray.push({x:n*(cnv.width/10)+15,y:i*20+5,w:10,h:10,health:levelVal});
        }
    }
}
function keyHandler () {
    if (keyPressed.KeyA && player.x >0){
        player.x+= -player.speed;
    } if (keyPressed.KeyD && player.x+100 < cnv.width){
        player.x+= player.speed;
    } if (stasis && keyPressed.Space){
        stasis = false;
    }
}
function collide () {
       if (ball.x-ball.r <= 0){
        ball.xflip = !ball.xflip;
    } else if (ball.x+ball.r >= cnv.width){
        ball.xflip = !ball.xflip;
    }
    if (ball.y-ball.r <= 0){
        ball.yflip = !ball.yflip;
    } else if (ball.y+ball.r >= cnv.height){
        ball.yflip = !ball.yflip;
        ball.x = cnv.width/2;
        ball.y = cnv.height-100;
        stasis = true;
        lifeVal += -1;
        livesEl.innerHTML = lifeVal;
        if (lifeVal === 0){
            gameover = "true";
        }
    } 
    if (rectcircCollide(ball,player)){
        ball.yflip = !ball.yflip;
    }
    for (i=0;i<pelletArray.length;i++){
        if (rectcircCollide(ball,pelletArray[i])){
        if (ball.y>=pelletArray[i].y && ball.y<=pelletArray[i].y+pelletArray[i].h){
            ball.xflip = !ball.xflip;
        } else {
            ball.yflip = !ball.yflip;
        }
        score+=50;
        scoreEl.innerHTML = score;
        if (score > highScore){
            highScore = score;
            localStorage.setItem("breakoutHighScore", highScore);
            highScoreEl.innerHTML = highScore;
        }
        pelletArray[i].health += -1;
        if (pelletArray[i].health === 0){
        pelletArray.splice(i,1);
        }
        if (pelletArray === []){
            levelVal++;
            ball.speed += 5;
            gameover = "levelbreak";
            initPellets();
        }
        }
    }
}
function drawGameOver () {
    Fill("rgb(0,0,0,0.5");
    Rect(0,0,cnv.width,cnv.height);
    Fill("white");
    Font("42px Arial")
    text("Game Over",100,100, "fill");
    text("Retry?",150,200, "fill");
    Fill("rgb(255,255,255,0.5");
    Rect(150,150,130,80,"fill");
}
function loadHighScore (){
    let highScoreStr = localStorage.getItem("breakoutHighScore");
    return JSON.parse(highScoreStr) ?? 0;
}
function clickGameOver(){
    if (mouseX>=150 && mouseX<=280 && mouseY >=150 && mouseY <=230){
        if (mouseIsPressed){
            document.body.style.cursor = "default";
            pelletArray = [];
            initPellets();
            lifeVal = 3;
            livesEl.innerHTML = lifeVal;
            score = 0;
            scoreEl.innerHTML = score;
            player.x = cnv.width/2-50;
            gameover = "not";
        } else {
           document.body.style.cursor = "pointer"; 
        }
    } else {
        document.body.style.cursor = "default";
    }
}
function drawStartGame(){
    Fill("black");
    Rect(0,0,cnv.width,cnv.height,"fill");
    Fill("white");
    Font("42px Arial")
    text("Breakout Game v.1",100,100, "fill");
    text("Start",150,200, "fill");
    Fill("rgb(255,255,255,0.5");
    Rect(150,150,100,80,"fill");
}
function clickStartGame() {
    if (mouseX>=150 && mouseX<=250 && mouseY >=150 && mouseY <=230){
        if (mouseIsPressed) {
            gameover = "not";
            document.body.style.cursor = "default"; 
        } else {
            document.body.style.cursor = "pointer";
        }
    } else {
        document.body.style.cursor = "default";
    }
}