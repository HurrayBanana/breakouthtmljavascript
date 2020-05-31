/*
Manages the logic for generating the current level, 
creating the intial ball and paddle and
moving to the next one or ending the game
*/
var level;					// current game level
var lastlevel = 13;			//last level of game (ought to use some form of automatic method for doing this)
var activelevel;			//holds reference to current level object

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
*/
function generateLevel(levelnum) {
	//comment this line out if normal play required
	//levelnum = 7	; //force particular level to play for testing
    addScoreInfo(screen);
	levelUpdateCallBack = null;
    switch (levelnum) {
        case 1:
			activelevel = new standard(screen, activebrick, 3, 8, 1.2);
            break;
        case 2:
			activelevel = new drop(screen, activebrick, 3, 10, 2.5, 10);
            break;
        case 3:
			activelevel = new scroll(screen, activebrick, 0, new vector2(-50,0));
            break;
		case 4:
			activelevel = new wave(screen, activebrick, 0.01, false); 
			break;
		case 5:
			activelevel = new wave(screen, activebrick, 0.01, true); 
			break;
		case 6:
			activelevel = new rotator(screen, activebrick, 0.01, false, 0.3);
			break;
		case 7:
			activelevel = new rotator(screen, activebrick, 0.01, true, 0.35);
			break;
		case 8:
			activelevel = new phased(screen, activebrick, 0.3, false);
			break;
		case 9:
			activelevel = new phased(screen, activebrick, 0.3, true);
			break;
		case 10:
			activelevel = new zoom(screen, activebrick, 0.02);
			break;
        case 11:
			activelevel = new scroll(screen, activebrick, 0.01, new vector2(100,0));
			break;
		case 12:
			activelevel = new alevel(screen, activebrick);
			break;
		case 13:
			activelevel = new invader(screen, activebrick, 2);
			break;
		default:
			//generate a tall standard if we have an erroneous level number
			//rather than fall over
			activelevel = new standard(screen, activebrick, 12, 8, 1.2);
			break;
		}
    createStartBall();
    paddle = new Paddle(screen, new vector2(210, 550));
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
