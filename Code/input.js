// JavaScript source code
var leftrepeat = null;			//holds a timer object for allowing a key to be held rather than pressed
var rightrepeat = null;			//holds a timer object for allowing a key to be held rather than pressed
const KEY_LEFT = 37;			//defines a readable constant to represent the left cursor key code
const KEY_RIGHT = 39;			//defines a readable constant to represent the right cursor key code
const KEY_D1 = 49;				//defines a readable constant to represent the 1 key code
const KEY_ESCAPE = 27;			//defines a readable constant to represent the escpae key code


/*
updates the paddle position to move left at 200 pixels per second
we do this by mulitplying the 200 by the fraction of a second (delta)
that this portion of the game loop has taken (approx 20 milliseconds)
*/
function moveLeft() {
    paddle.moveleft(200 * delta); // mulitplying by delta gives a relative value of 200 pixels per second
}
/*
updates the paddle position to move right at 200 pixels per second
we do this by mulitplying the 200 by the fraction of a second (delta)
that this portion of the game loop has taken (approx 20 milliseconds)
*/
function moveRight() {
    paddle.moveright(200 * delta);
}
/*
clears any timer intervals that enabled key repeat (holding down a key)
this is called if a key is released
*/
function clearActiveInputs()
{
	clearInterval(leftrepeat);
	clearInterval(rightrepeat);
}

/*
keydown keyboard listener, looks for game keys and checks mode
this is called by chrome whenever it detects a keydown event
we look to see if any keys we are interested in were pressed and take
appropriate action
*/
function move(e) {
    switch (e.keyCode) {
		case KEY_ESCAPE:
			if (mode == "game" || mode=="demo")
				titleScreen();
			break;
		case KEY_D1:
			if (mode != "game" )
				startGame();
			break;
        case KEY_LEFT:
            if (mode == "game" && !leftrepeat) {
                moveLeft();
                leftrepeat = setInterval(moveLeft, 20);
            }
            break;
        case KEY_RIGHT:
            if (mode == "game" && !rightrepeat) {
                moveRight();
                rightrepeat = setInterval(moveRight, 20);
            }
            break;
    }
}

/*
keyup event listener cancels the repeat of move events
listens to keys being released
*/
function stopmove(e) {
	//only allow this code to function if game is active
	if (mode == "game")
	{
		switch (e.keyCode) {
			case KEY_LEFT:
				clearInterval(leftrepeat);
				leftrepeat = null;
				break;
			case KEY_RIGHT:
				clearInterval(rightrepeat);
				rightrepeat = null;
				break;
		}
    }
}