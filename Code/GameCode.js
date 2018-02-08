/*
Game code
*/
var activeball = [];		//holds active balls
var activebrick = [];		//holds active bricks	
var starttimer;				//holds reference to start timer, in case we need to abort it
var demostart;
var paddle;					//reference to the players paddle
var screen;					//reference to the html container being used for the game screen
var mode = "title"; 		//current game mode
var activeMode;				//holds the mode demo or game that needs to be active during play
var deadline = 570;			//line by which ball is killed

//first time setup of system
//gets reference to game area
//sets up timer and keyboard events
function initialise() {
    screen = document.getElementById("gameScreen");
	//gametime = 0;
	timerCallBack = timerloop;
	//starttime = Date.now();
	timeInitialise();
    //gameticker = setInterval(timer, tickdelta);
    addEventListener("keydown", move, false);
    addEventListener("keyup", stopmove, false);

    h_score = 100;
    titleScreen();
}
//sets up demo mode
function startDemo()
{
	activeMode = "demo";
	level = 1;
    c_score = 0;
	lives = 3;

    //clear(screen);
    resetGame();
}
//starts a new game
function startGame()
{
	removeResources();
	activeMode = "game";
    level = 1;
    c_score = 0;
	lives = 3;

    //clear(screen);
    resetGame();
}

//resets game components and starts current level
function resetGame() {
    clear(screen);
    activebrick = [];
    activeball = [];
	generateLevel(level);
	mode = "in between";
	delayStart();
}
//activates gameplay after 3 seconds
function delayStart()
{
    showGetReady();
    starttimer = setTimeout(startPlay, 3000);
}

//removes any graphic display and activates game mode
function startPlay() {
	timerClear();
    //gametime = 0;
	//starttime = Date.now();
    clearUI();
    mode = activeMode;
}

//game time delta recording
function timerloop()
{
    if (mode == "game")
    {
        gameLoop();
    }
	else if (mode == "demo")
	{
		demoLoop();
	}
    //any timer aware activities for all modes go here
    if (logo != null)
        logo.tick(delta);

}
//logic for demo mode
function demoLoop()
{
	if (levelUpdateCallBack != null)
		levelUpdateCallBack(delta);
	
	//move all balls
    for (var i = 0; i < activeball.length; i++) {
        activeball[i].update(delta);
    }
	brickCollisions();
	paddle.simulateplay(activeball[0]);
	paddleDemoCollisions();

	removeDeadBricks();
	removeDeadBalls();
	
	if (gametime % 10000 == 0)
	{
		level = getDemoLevel();
		mode = "in between";
		resetGame();
	}
	c_score = 0;
}
//picks a random level number
function getDemoLevel()
{
	return Math.floor(Math.random() * lastlevel) + 1;
}
//check paddle for any ball collisions
function paddleDemoCollisions()
{
	for (var i = 0; i < activeball.length; i++) {
		if (activeball[i].touching(paddle))
			activeball[i].hitsprite(paddle);
	}
}
//actions to be performed in game mode
function gameLoop()
{
	if (levelUpdateCallBack != null)
		levelUpdateCallBack(delta);
	
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
//check paddle for any ball collisions
function paddleCollisions()
{
	for (var i = 0; i < activeball.length; i++) {
		if (activeball[i].touching(paddle))
		{
			activeball[i].hitpaddle(paddle);
		}
	}
}
//get each brick to check against active game balls
function brickCollisions()
{
    //check all blocks for collision with balls
    for (var j = 0; j < activebrick.length; j++) {
		var ball = activebrick[j].collisioncheck(activeball);
		if (ball != null)
		{
			c_score += 10;
			//10% chance of spawning another ball
			if (Math.random() >= 0.90)
			{
				spawnBall(ball);
			}
		}
	}
}

//removes any destroyed blocks and checks for level end
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
//removes any dead balls and checks for all balls lost to end life
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
//short delay the start gameplay
function nextLife()
{
	mode = "in between";
	createStartBall();
	delayStart();
}
//short delay then back to title			
function gameOver()
{
	mode = "in between";
	showGameOver();
	setTimeout(titleScreen, 3000);
}
//reduces lives by 1
//and updates display
//returns number of lives for checking
function lostLife()
{
	lives -= 1;
    livesText.innerText = "LIVES " + lives;

	return lives;
}
//Removes all children of a given node
function clear(item) {
    currentImage = null;

    while (item.firstChild) {
        item.removeChild(item.firstChild);
    }
    showLogo();
}
//removes any resources that need cancelling
function removeResources()
{
	clearActiveInputs();
    clearInterval(starttimer);
	clearInterval(demostart);
    clear(screen);
}