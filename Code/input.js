// JavaScript source code
var leftrepeat = null;
var rightrepeat = null;

//callback for left key held
function moveLeft() {
    paddle.moveleft(200 * delta); // mulitplying by delta gives a relative value of 200 pixels per second
}
//callback for right key held
function moveRight() {
    paddle.moveright(200 * delta);
}
//clears any moving inputs
function clearActiveInputs()
{
	clearInterval(leftrepeat);
	clearInterval(rightrepeat);
}

//keydown listener, looks for game keys and checks mode
function move(e) {
    switch (e.keyCode) {
		case 27:
			if (mode == "game" || mode=="demo")
				titleScreen();
			break;
		case 49:
			if (mode != "game" )//|| mode=="demo")
				startGame();
			break;
        case 37:
            if (mode == "game" && !leftrepeat) {
                moveLeft();
                leftrepeat = setInterval(moveLeft, 20);
            }
            break;
        case 39:
            if (mode == "game" && !rightrepeat) {
                moveRight();
                rightrepeat = setInterval(moveRight, 20);
            }
            break;
    }
}

//keyup event listener cancels the repeat of move events
function stopmove(e) {
	//only allow this code to function if game is active
	if (mode == "game")
	{
		switch (e.keyCode) {
			case 37:
				clearInterval(leftrepeat);
				leftrepeat = null;
				break;
			case 39:
				clearInterval(rightrepeat);
				rightrepeat = null;
				break;
		}
    }
}