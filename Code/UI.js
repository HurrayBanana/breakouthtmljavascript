// JavaScript source code
var h_score;
var c_score;
var lives;
var scoreText;
var topscoreText;
var livesText;
var logo;

var currentImage = null;
//remove any user message graphics
function clearUI()
{
    if (currentImage) {
        screen.removeChild(currentImage);
        currentImage = null;
    }
}
//setup title screen
function titleScreen()
{
    mode = "title";
    removeResources();
    showImage(".\\graphics\\title.fw.png");
	
	demostart = setTimeout(startDemo, 3000);
}
//displays logo
function showLogo()
{
    logo = new HBLogo(screen);
}
//shows particular user graphic on screen
function showImage(filename)
{
    currentImage = document.createElement("img");
    currentImage.className = "imageoverlay";
    currentImage.tabIndex = 1000;
    currentImage.src = filename;
    screen.appendChild(currentImage);
}
function showLevelClear() {
    showImage(".\\graphics\\levelcomplete.fw.png");
}
function showGetReady() {
    showImage(".\\graphics\\getready.fw.png");
}

function showGameOver() {
    showImage(".\\graphics\\gameover.fw.png");
}
//adds score display to game screen
function addScoreInfo(screen) {
    scoreText = document.createElement("span");
    scoreText.id = "currentscore";
    scoreText.innerText = "1UP " + c_score;
    screen.appendChild(scoreText);

    topscoreText = document.createElement("span");
    topscoreText.id = "topscore";
    topscoreText.innerText = "TOP SCORE " + h_score;
    screen.appendChild(topscoreText);
	
	livesText = document.createElement("span");
    livesText.id = "lives";
    livesText.innerText = "LIVES " + lives;
    screen.appendChild(livesText);
}

//update score info
function updateUI()
{
    if (c_score > h_score)
        h_score = c_score;

    topscoreText.innerText = "TOP SCORE " + h_score;
    scoreText.innerText = "1UP " + c_score;
}