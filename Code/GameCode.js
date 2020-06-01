/*
Game code which does the major control of the system
*/
var activeball = [];		//holds active balls
var activebrick = [];		//holds active bricks	
var starttimer;				//holds reference to start timer, in case we need to abort it
var paddle;					//reference to the players paddle
var screen;					//reference to the html container being used for the game screen
var mode = "title"; 		//current game mode
var activeMode;				//holds the mode demo or game that needs to be active during play
var deadline = 570;			//line by which ball is killed
var democontrol;			//holds a reference to the demo controller (demopick class)

/*
first time setup of system
gets reference to game area
sets up timer and keyboard events
*/
function initialise() {
    screen = document.getElementById("gameScreen");
	
	timerCallBack = timerloop;
	
	timeInitialise();
    
    addEventListener("keydown", move, false);
    addEventListener("keyup", stopmove, false);

	democontrol = new demopick(lastlevel);
	
    h_score = 100;
    titleScreen();
}
/*
sets up demo mode
*/
function startDemo()
{
	activeMode = "demo";
	level = democontrol.nextlevel; 
    c_score = 0;
	lives = 3;

    resetGame();
}
/*
starts a new game
*/
function startGame()
{
	removeResources();
	activeMode = "game";
    level = 1;
    c_score = 0;
	lives = 3;

    resetGame();
}

/*
resets game components and starts current level
*/
function resetGame() {
	clear(screen);
    activebrick = [];
    activeball = [];
	generateLevel(level);
	mode = "in between";
	delayStart();
}
/*
activates gameplay after 3 seconds
*/
function delayStart()
{
	//get demo logo on screen
	if (activeMode == "demo")
		showDemoLogo();
	
    showGetReady();
    starttimer = setTimeout(startPlay, 3000);
}

/*
removes any graphic display and activates game mode
*/
function startPlay() {
	timerClear();
    clearUI();
    mode = activeMode;
}

/*
game time delta recording
calls different subroutines depending on which mode
the game is currently in
*/
function timerloop()
{
    if (mode == "game")
    {
        gameLoop();
    }
	else if (mode == "demo")
	{
		demoLoop();
		demologo.tick(delta);

	}
	//animate demo logo even if waiting for play to start
	else if (activeMode == "demo")
			demologo.tick(delta);
		
    //any timer aware activities for all modes go here
    if (logo != null)
        logo.tick(delta);

}
/*
logic for demo mode
*/
function demoLoop()
{
	activelevel.tick(delta);
	
	//move all balls
    for (var i = 0; i < activeball.length; i++) {
        activeball[i].update(delta);
    }
	brickCollisions();
	//get paddle to track the given ball
	paddle.simulateplay(activeball[0]);
	paddleDemoCollisions();

	removeDeadBricks();
	removeDeadBalls();
	
	//stop after 10 seconds (milliseconds)
	if (gametime >= 10000)
	{
		titleScreen();
	}
	c_score = 0;
}

/*
check paddle for any ball collisions in demo mode
uses a different rebound method as the demo paddle
always hits the ball in the centre
*/
function paddleDemoCollisions()
{
	for (var i = 0; i < activeball.length; i++) {
		if (activeball[i].touching(paddle))
			activeball[i].hitsprite(paddle);
	}
}
/*
actions to be performed in game mode
*/
function gameLoop()
{
	activelevel.tick(delta);
	
	//move all balls
    for (var i = 0; i < activeball.length; i++) {
        activeball[i].update(delta);
    }
	
	brickCollisions();
	paddleCollisions();
	
    updateUI();

	removeDeadBricks();
	removeDeadBalls();
	
}
/*
check paddle for any ball collisions
*/
function paddleCollisions()
{
	for (var i = 0; i < activeball.length; i++) {
		if (activeball[i].touching(paddle))
		{
			activeball[i].hitpaddle(paddle);
		}
	}
}
/*
get each brick to check against active game balls
*/
function brickCollisions()
{
    //check all blocks for collision with balls
    for (var j = 0; j < activebrick.length; j++) {
		var ball = activebrick[j].collisioncheck(activeball);
		if (ball != null)
		{
			c_score += 10;
			//5% chance of spawning another ball
			if (Math.random() >= 0.95)
			{
				spawnBall(ball);
			}
		}
	}
}

/*
removes any destroyed blocks and checks for level end
*/
function removeDeadBricks() {
    keep = [];
    for (var i = 0; i < activebrick.length; i++) {
        if (!activebrick[i].dead)
            keep.push(activebrick[i]);
    }
	//swap list references
    activebrick = keep;
	
	//no blocks means level ended
    if (activebrick.length == 0) {
        mode = "in between";
		clearActiveInputs();
        showLevelClear();
        setTimeout(nextLevel, 3000);
    }
}
/*
removes any dead balls and checks for all balls lost to end life
*/
function removeDeadBalls() {
    keep = [];
    for (var i = 0; i < activeball.length; i++) {
        if (!activeball[i].dead)
            keep.push(activeball[i]);
    }
	//swap list references
    activeball = keep;
	
	//no blocks means level ended
    if (activeball.length == 0) {
		clearActiveInputs();
		//do we have lives left?
		if (lostLife() == 0)
			gameOver();
		else
			nextLife();
    }
}
/*
short delay the start gameplay
*/
function nextLife()
{
	mode = "in between";
	createStartBall();
	delayStart();
}
/*
short delay then back to title			
*/
function gameOver()
{
	mode = "in between";
	showGameOver();
	setTimeout(titleScreen, 3000);
}
/*
reduces lives by 1
and updates display
returns number of lives for checking
*/
function lostLife()
{
	lives -= 1;
    livesText.innerText = "LIVES " + lives;

	return lives;
}
/*
Removes all children of a given node
*/
function clear(item) {
    currentImage = null;

    while (item.firstChild) {
        item.removeChild(item.firstChild);
    }
	//always draw my logo
    showLogo();
}
/*
removes any resources that need cancelling
*/
function removeResources()
{
	clearActiveInputs();
    clearInterval(starttimer);
	clearInterval(demostart);
    clear(screen);
}