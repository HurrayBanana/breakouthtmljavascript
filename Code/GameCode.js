/*
Game code which does the major control of the system
*/
/*TODO add a list for powerup sprite management
special brick spawns powerup, collision check with paddle for special brick
kill past bottom of screen
*/
var pickups = []				//holds pickups

var activeball = [];		//holds active balls
var activebrick = [];		//holds active bricks	
var starttimer;				//holds reference to start timer, in case we need to abort it
var paddle;					//reference to the players paddle
var screen;					//reference to the html container being used for the game screen
var mode = "title"; 		//current game mode
var activeMode;				//holds the mode demo or game that needs to be active during play
var deadline = 570;			//line by which ball is killed
var democontrol;			//holds a reference to the demo controller (demopick class)
var demotime = 10 * 1000;	//time in millisseconds for demo to last (default 10 secs)
var killbricks = true;		//whether to kill bricks or not (default true)
var killball = false;			//whether ball dies when passing paddle (default true)


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

	createLevelset();

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
	pickups = []; //add this
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
    starttimer = setTimeout(startPlay, 2000);
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
	cyclecredits();
	activelevel.tick(delta);
	processpickups();
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
	if (gametime >= demotime)
	{
		titleScreen();
	}
	c_score = 0;
}
function processpickups()
{
	for (var i = 0; i < pickups.length; i++)
	{
		if (!pickups[i].dead)
			pickups[i].update(delta);
	}	
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
	cyclecredits();

	activelevel.tick(delta);
				
	processpickups();
	
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
TODO add powerup collisions here
*/
function paddleCollisions()
{
	for (var i = 0; i < activeball.length; i++) {
		if (activeball[i].touching(paddle))
		{
			activeball[i].hitpaddle(paddle);
		}
	}
	//now check for pickups
	for (var i = 0; i < pickups.length; i++)
	{
		if (!pickups[i].dead && pickups[i].touching(paddle))
		{
			pickups[i].kill();
			pickups[i].pickupAction(paddle);
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
			choosepickup(activebrick[j])
		}
	}
}
function choosepickup(brick)
{
	//90% chance of spawning a pickup
	if (Math.random() <= 0.9)//0.95)
	{
		var dropchoice = Math.trunc(Math.random() * 3) // number of d
		//new extendpickup(screen, activebrick[j].centre);
		switch (dropchoice) {
			case 0:
				new multipickup(screen, brick.centre);
				break;
			case 1:
				new extendpickup(screen, brick.centre);
				break;
			case 2:
				new shrinkpickup(screen, brick.centre);
				break;
					
			default:
				break;
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
		/*
		extra code to deal with killed bricks to see if they are special ones
		*/
		/*
		else 
		if (typeof activebrick[i].pickupAction === "function")
			{
				//console.log("POWER up");
				activebrick[i].activate(paddle);
			}
		*/
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