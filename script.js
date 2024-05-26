var runImage = 1;
var runWorker = 0;

var jumpImage = 1;
var jumpWorker = 0;
var jumpMargin = 480;


var backgroundX = 0;
var backgroundWorker = 0;

var score = 0;
var scoreWorker = 0;

var runSound = new Audio("run.mp3");
runSound.loop = true;

var jumpSound = new Audio("jump.mp3")

var flameMarginLeft = [400, 800, 1200, 1600, 2000, 2400];

var deadImage = 1;
var deadWorker = 0;

var deadSound = new Audio("dead.mp3");

var continueGame = true;

function controller(event) {

    if (event.key == "Enter") {
        if (runWorker == 0) {
            run();
            runSound.play();
            movebackground();
            updateScore();
            flameMarginLeft.forEach(createFlame);
        }
    }

    if (event.key == " ") {


        if (jumpWorker == 0) {
            if (runWorker != 0) {
                clearInterval(runWorker);
                runSound.pause();
                jumpSound.play();
                jump();

            }
        }

    }

}


function run() {

    runWorker = setInterval(() => {
        runImage = runImage + 1;

        if (runImage == 9) {
            runImage = 1;

        }
        document.getElementById("boy").src = "run" + runImage + ".png";
    }, 150);


}

function jump() {

    jumpWorker = setInterval(() => {


        jumpImage = jumpImage + 1;

        if (jumpImage < 8) {
            jumpMargineTop = jumpMargin - 60;
            document.getElementById("boy").style.marginTop = jumpMargineTop + "px";

        }

        if (jumpImage > 7) {
            jumpMargineTop = jumpMargin + 10;
            document.getElementById("boy").style.marginTop = jumpMargineTop + "px";

        }



        if (jumpImage == 13) {
            jumpImage = 1;
            clearInterval(jumpWorker);
            jumpSound.pause();
            run();
            runSound.play();
            jumpWorker = 0;

        }
        document.getElementById("boy").src = "jump" + jumpImage + ".png";
    }, 150);


}

function movebackground() {

    backgroundWorker = setInterval(
        () => {

            backgroundX = backgroundX - 10;
            document.getElementById("background").style.backgroundPositionX = backgroundX + "px";

        }, 50);

}

function updateScore() {

    scoreWorker = setInterval(() => {

        score = score + 10;
        document.getElementById("score").innerHTML = score;

    }, 100);

}

function createFlame(x, y) {

    var i = document.createElement("img");
    i.src = "flame.gif";
    i.style.height = "150px";
    i.style.marginTop = "580px";
    i.style.marginLeft = x + "px";
    i.style.position = "absolute";

    document.getElementById("background").appendChild(i);

    var flameWorker = setInterval(() => {

        if (continueGame) {
            x = x - 10;
            i.style.marginLeft = x + "px";

            if (x == 180) {
                if (jumpWorker == 0) {
                    continueGame = false;
                    clearInterval(runWorker);
                    clearInterval(backgroundWorker);
                    clearInterval(scoreWorker);
                    runSound.pause();
                    dead();
                    deadSound.play();



                }
                if (y == 5) {
                    if (x = -100) {

                        alert("you won");
                        window.location.reload();

                    }

                }

            }



        }

    }, 50);

}

function dead() {
    deadWorker = setInterval(() => {

        deadImage = deadImage + 1;
        if (deadImage == 11) {
            deadImage = 10;
            clearInterval(deadWorker);
            alert("game Over. Your Score is " + score);
            window.location.reload();


        }
        document.getElementById("boy").src = "dead" + deadImage + ".png";

    }, 50);

}