var level;					// current game level
var lastlevel = 11;			//last level of game
var activelevel;			//holds reference to current level object

//sets next level or quits to title if finished levels
function nextLevel() {
    level++;
    if (level > lastlevel)
        titleScreen();
    else
        resetGame();
}

//draw requirements for current level
function generateLevel(levelnum) {
	//levelnum = 1	; //force particular level to play for testing
    addScoreInfo(screen);
	levelUpdateCallBack = null;
    switch (levelnum) {
        case 1:
			activelevel = new standard(screen, activebrick, 3,8,1.2);
            break;
        case 2:
			activelevel = new drop(screen, activebrick, 2.5, 10);
            break;
        case 3:
			activelevel = new scroll(screen, activebrick, 0, new vector2(-50,0));
            break;
		case 4:
			activelevel = new wave(screen, activebrick, 0, false); 
			break;
		case 5:
			activelevel = new wave(screen, activebrick, 0, true); 
			break;
		case 6:
			activelevel = new rotator(screen, activebrick, 0, false, 0.3);
			break;
		case 7:
			activelevel = new rotator(screen, activebrick, 0, true, 0.35);
			break;
		case 8:
			activelevel = new phased(screen, activebrick, 0.3, false);
			break;
		case 9:
			activelevel = new phased(screen, activebrick, 0.3, true);
			break;
		case 10:
			activelevel = new zoom(screen, activebrick, 0);
			break;
        case 11:
			activelevel = new scroll(screen, activebrick, 0, new vector2(100,0));
            break;
    }
    createStartBall();
    paddle = new Paddle(screen, new vector2(210, 550));
}

//creates the basic ball that starts the game, or after life lost
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

function spawnBall(brick)
{
	//2 axis directions
	var direction = new vector2(Math.random() - 0.5, Math.random() - 0.5);
	//speed between 200 and 400
	direction.strength(200 + Math.random() * 200);
	activeball.push(new Ball(screen, brick.centre, direction, deadline));
}
