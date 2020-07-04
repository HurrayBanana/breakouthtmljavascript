/*
Manages the logic for generating the current level, 
creating the intial ball and paddle and
moving to the next one or ending the game
*/
var level;					// current game level
var lastlevel = 23;			//last level of game (ought to use some form of automatic method for doing this)
var activelevel;			//holds reference to current level object


/*
2d array of constructors and a sub array pf parameters
*/
var levelarray = [
];

/*
Builds all the levels into a ragged 2d array of constructors and parameters
*/
function createLevelset()
{
	var lev = 1;
	levelarray[lev++] = [standard, [screen, null, 10, 8, 1]];
	levelarray[lev++] = [drop,[screen, null, 5, 8, 0.1, 1]];
	levelarray[lev++] = [scroll,[screen, null, 0.01, new vector2(-50,0)]];
	levelarray[lev++] = [wave,[screen, null, 0.01, false]];
	levelarray[lev++] = [wave,[screen, null, 0.01, true]];
	levelarray[lev++] = [rotator,[screen, null, 0.01, false, 0.3]];
	levelarray[lev++] = [rotator,[screen, null, 0.01, true, 0.35]];
	levelarray[lev++] = [phased,[screen, null, 0.3, false]];
	levelarray[lev++] = [ phased,[screen, null, 0.3, true]];
	levelarray[lev++] = [ zoom,[screen, null, 0.02]];
	levelarray[lev++] = [ scroll,[screen, null, 0.01, new vector2(100,0)]];
	levelarray[lev++] = [ alevel,[screen, null]];
	levelarray[lev++] = [ invader,[screen, null, 2]];
	levelarray[lev++] = [ wave,[screen, null, 0.01, true]]; 
	levelarray[lev++] = [ xlevel,[screen, null]];
	levelarray[lev++] = [ bouncer,[screen, null, 0.02, 10, 500, 1]];
	levelarray[lev++] = [ pulse,[screen, null, 0.02, 0.1, 0.9]];
	levelarray[lev++] = [ ripple,[screen, null, 0.02, 5, 8]];
	levelarray[lev++] = [ wobble,[screen, null, 0.02, 5, 8, 1]];
	levelarray[lev++] = [ Hlevel,[screen, null]];
	levelarray[lev++] = [ Bowlevel,[screen, null]];
	levelarray[lev++] = [ phased2,[screen, null, 0.5, false]];
	levelarray[lev++] = [ invader2,[screen, null, 2]];
	levelarray[lev++] = [ pokeball,[screen, null, 0.02, 10, 400, 1]];
	levelarray[lev++] = [ smilie,[screen, null, 2]];
	levelarray[lev++] = [ jumpman,[screen, null, 2]];
	levelarray[lev++] = [ mushroom,[screen, null, 0.02, 10, 400, 1]];

}

/*
updates the level counter and either resets the game to start the level
or ends it if we have completed all levels
this could easily be changed to generate an endless
number of random levels like demo mode does
remember to update the value of lastlevel when you add extra levels
*/
function nextLevel() {
    level++;
    if (level > lastlevel) // change the value of lastlevel on line 7 if you add more levels
        titleScreen();
    else
        resetGame();
}

/*
draw all UI requirements for current level
as passed in levelnum
completely replaced switch with array of constrcutors and parameters stored in levelarray
*/
function generateLevel(levelnum) {
	//comment this line out if normal play required
	levelnum = 20	; //force particular level to play for testing
    addScoreInfo(screen);
	levelUpdateCallBack = null;
	activelevel = Reflect.construct(levelarray[levelnum][0], levelarray[levelnum][1]);
    createStartBall();
	paddle = new Paddle(screen, new vector2(210, 550));
	showCredits(activelevel.author, activelevel.constructor.name);
}

/*
called to create the basic ball that starts the game, or after life lost
*/
function createStartBall()
{
	//avoid mostly vertical ball play
	var velo = Math.random() * 0.30;
	if (Math.random() >= 0.5)
		velo = 1 - velo;

	var direction = new vector2(velo, -velo*0.8);
	//speed of 300 pixels per sec
	direction.strength(300);
	activeball.push(new Ball(screen, new vector2(250, 500), direction, deadline));
}
/*
spawns a ball at a given brick position if we have destroyed a special brick
as determined by GameCode.brickCollisions()
*/
function spawnBall(brick)
{
	//2 axis directions
	var direction = new vector2(Math.random() - 0.5, Math.random() - 0.5);
	//speed between 200 and 400
	direction.strength(200 + Math.random() * 200);
	activeball.push(new Ball(screen, brick.centre, direction, deadline));
}
