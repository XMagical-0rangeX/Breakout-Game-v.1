let livesEl = document.getElementById("lives");
let scoreEl = document.getElementById("score");
let highScoreEl = document.getElementById("highscore");
let player = {
    x: cnv.width/2-50,
    y: cnv.height-50,
    w: 100,
    h: 10,
    speed: 10,
}
let ball = {
    x: cnv.width/2,
    y: cnv.height-100,
    r: 5,
    speed: 5,
    xflip: false,
    yflip: false,
}
let pelletArray = [], stasis = true,lifeVal = 3, gameover = "start", score = 0,highScore = loadHighScore(),
levelVal = 1;
initPellets();
highScoreEl.innerHTML = highScore;
loop();
function loop () {
    if (gameover === "start"){
        drawStartGame();
        clickStartGame();
    } else if (gameover === "not"){
      background();
        movingObj();
        drawPellets();
        keyHandler();
        collide();  
    } else {
        background();
        movingObj();
        drawPellets();
        drawGameOver();
        clickGameOver();
    }
    requestAnimationFrame(loop);
}