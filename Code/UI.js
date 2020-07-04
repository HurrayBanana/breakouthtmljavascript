/*
 Handles UI some specific code functions
 */
var h_score;                //holds the current high score
var c_score;                //holds current game scire
var lives;                  //holds the current number of lives
var scoreText;              //holds a span container to show the current score
var topscoreText;           //holds a span container to show the high score
var livesText;              //holds a span container to show the number of lives
var logo;                   //holds a reference to my logo instance of the HBLogo class
var demologo;               //holds a reference to the demo logo which appears during demo mode
var demostart;				//holds a timer event to trigger demo starting, used by UI.js

var currentImage = null;    //holds currently loaded image for display

var creditsAuthor;                //holds a container showing the author and game name
var creditsName;                //holds a container showing the author and game name
var colorcycle = [
    "black",
    "red",
    "orange",
    "yellow",
    "lime",
    "blue",
    "indigo",
    "violet",
];
var colorpick;
var colordelay;
/*
remove any user message graphics
*/
function clearUI()
{
    if (currentImage) {
        screen.removeChild(currentImage);
        currentImage = null;
    }
}
/*
setup title screen and organise demo starting event
*/
function titleScreen()
{
    mode = "title";
    screen.style.backgroundColor = "black";

    removeResources();
    showImage(".\\graphics\\title.fw.png");
	
	demostart = setTimeout(startDemo, 3000);
}
/*
displays my logo
*/
function showLogo()
{
    logo = new HBLogo(screen);
}
/*
shows the demo logo while demo is active
*/
function showDemoLogo()
{
    demologo = new DemoLogo(screen);
}
/*
shows particular user graphic on screen
as specified by the filename
these always appear in the same position as defined in the css
.imageoverlay
*/
function showImage(filename)
{
    currentImage = document.createElement("img");
    currentImage.className = "imageoverlay";
    currentImage.tabIndex = 1000;
    currentImage.src = filename;
    screen.appendChild(currentImage);
}
/*
loads the specific image for Level Clear
*/
function showLevelClear() {
    showImage(".\\graphics\\levelcomplete.fw.png");
}
/*
loads the specific image for get ready
*/
function showGetReady() {
    showImage(".\\graphics\\getready.fw.png");
}

/*
loads the specific image for Game over
*/
function showGameOver() {
    showImage(".\\graphics\\gameover.fw.png");
}
/*
creates the 3 span containers to hold the score and lives
information to be displayed at the top of the screen
*/
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

	creditsAuthor = document.createElement("div");
    creditsAuthor.id = "creditsAuthor";
    creditsAuthor.style.top = (screen.clientHeight - 30) + "px";
    creditsAuthor.innerText = "";
    screen.appendChild(creditsAuthor);

	creditsName = document.createElement("div");
    creditsName.id = "creditsName";
    creditsName.style.top = (screen.clientHeight - 30) + "px";
    creditsName.innerText = "";
    screen.appendChild(creditsName);

    colorpick = -1;
    colordelay = 10;
}


function showCredits(levelauthor, levelname)
{
    creditsName.innerText = "NM: " + levelname;
    creditsName.style.left = (screen.clientWidth - 1 - creditsName.clientWidth) + "px";

    creditsAuthor.innerText = "BY: " + levelauthor ;
}
/*
updates the score display information
checks to see if high score as been beaten first
and updates if it has
*/
function updateUI()
{
    if (c_score > h_score)
        h_score = c_score;

    topscoreText.innerText = "TOP SCORE " + h_score;
    scoreText.innerText = "1UP " + c_score;


}

function cyclecredits()
{
    //change credits color
    colordelay++
    if (colordelay > 25)
    {
        colordelay = 0;
        colorpick = (colorpick + 1) % colorcycle.length;

        creditsName.style.color = colorcycle[colorpick];
        creditsAuthor.style.color = colorcycle[colorpick];
    }
}







