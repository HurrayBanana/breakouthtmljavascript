//holds brick row colours
var colorset = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
];

var level;					// current game level
var lastlevel = 10;			//last level of game
var levelUpdateCallBack;	//holds function reference for any callback during game update
var standardmargin = new vector2(15, 50);
var standardspread = new vector2(60, 30);

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
	//levelnum = 2; //force particular level to play for testing
    addScoreInfo(screen);
	levelUpdateCallBack = null;
    switch (levelnum) {
        case 1:
            standardRows(3);
            break;
        case 2:
            standardRows(5);
			levelUpdateCallBack = dropBlocks;
			dropdelta = 0;
            break;
        case 3:
            standardRows(7);
			levelUpdateCallBack = scrollBlocks;
            break;
		case 4:
			standardRows(8);
			levelUpdateCallBack = waveBricks;
			waveBricks(0); //just to position them
			break;
		case 5:
			customRowsScaled(10,8,1.25);
			levelUpdateCallBack = waveBricks;
			waveBricks(0); //just to position them
			break;
		case 6:
			angle = 1;
			customRows(5, 11);
			levelUpdateCallBack = rotateBricks;
			rotateBricks(0);
			break;
		case 7:
			angle = 1;
			customRows(5, 11);
			levelUpdateCallBack = rotateFunckyBricks;
			rotateBricks(0);
			break;
		case 8:
            customRows(7, 8);
			levelUpdateCallBack = phasedHide;
			phasedHide(0);
			break;
		case 9:
            customRows(7, 8);
			levelUpdateCallBack = phasedShow;
			phasedShow(0);
			break;
		case 10:
			customRowsScaled(10,8,1);
			levelUpdateCallBack = zoom;
			zoom(0);
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

function zoom(delta)
{
	for (var i = 0; i < activebrick.length; i++)
	{
		var z = (Math.sin(angle + i/10) * 0.35) + 0.9;
		activebrick[i].scale = z;
	}
	angle += 2 * delta;
}


var column = 0;
var phasetimer = 0;
function phasedShow(delta)
{
	phasetimer += delta;
	if (phasetimer >= 0.2) 
	{
		phasetimer -= 0.2
		for (var i = 0; i < activebrick.length; i++)
		{
			activebrick[i].phasedShow(15 + column * 60);
		}
		column = (column + 1) % 8;
	}
}
function phasedHide(delta)
{
	phasetimer += delta;
	if (phasetimer >= 0.2) 
	{
		for (var i = 0; i < activebrick.length; i++)
		{
			activebrick[i].phasedShow(15 + column * 60);
		}
		column = (column + 1) % 8;
	}
}

var angle = 0;
function waveBricks(delta)
{
	for (var i = 0; i < activebrick.length; i++) {
		activebrick[i].wave(angle, 100,20);
	}
	angle += 2 * delta;
}function waveBricksWithScale(delta)
{
	for (var i = 0; i < activebrick.length; i++) {
		activebrick[i].wave(angle, 10,20);
		
		var z = (Math.sin(angle + i/10) * 0.5) + 0.6;
		activebrick[i].scale = z;	
	}
	angle += 2 * delta;
}
function rotateBricks(delta)
{
	for (var i = 0; i < activebrick.length; i++) {
		activebrick[i].rotate(angle, 1.25 , -1.25 , 0, -50);
	}
	angle += 0.25 * delta;
}
function rotateFunckyBricks(delta)
{
	for (var i = 0; i < activebrick.length; i++) {
		activebrick[i].rotate(angle, 1.25 * Math.sin(angle), -1.25 * Math.sin(angle + 0.2), 0, -50);
	}
	angle += 0.25 * delta;
}


//get all blocks to move left every frame
function scrollBlocks(delta)
{
	for (var i = 0; i < activebrick.length; i++) {
		activebrick[i].scroll(-50 * delta);
	}
}

var dropdelta;
//drops all remaining blocks
function dropBlocks(delta)
{
	dropdelta += deltamilliseconds;
	if (dropdelta >= 3000)
	{
		dropdelta -= 3000;
        for (var i = 0; i < activebrick.length; i++) {
            activebrick[i].drop(20);
        }
    }
}

//code to generate level o
function standardRows(rows) {
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < 8; x++) {
			var colour = colorset[y % colorset.length];
            setBlockAt(x, y, colour, 1, standardmargin, standardspread);
        }
    }
}
//code to generate level o
function customRows(rows,cols) {
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
			var colour = colorset[y % colorset.length];
            setBlockAt(x, y, colour, 1, standardmargin, standardspread);
        }
    }
}
//code to generate level o
function customRowsScaled(rows,cols, size) {
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
			var colour = colorset[y % colorset.length];
            setBlockAt(x, y, colour, size, standardmargin, standardspread);
        }
    }
}

//Create a block element at the given x and y coords
function setBlockAt(x, y, colour, size, margin, spread) {
    var left = margin.x + x * spread.width;
    var top = margin.y + y * spread.height;

    activebrick.push(new Brick(screen, new vector2(left, top), colour, size));
}