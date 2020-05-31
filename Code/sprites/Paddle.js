/*
implements a paddle sprite that is an extension of MovingSprite
includes methods for logic control of the paddle for demo mode
*/
class Paddle extends MovingSprite {
    /*
    screen - the html container this sprite will sit inside of (its parent)
	start - the initial x and y position to render this container/sprite
			position is defined as the top left hand corner of the sprite
    */
    constructor(screen, start) {
		//create my own container to exist inside
        var paddle = document.createElement("div");
        paddle.id = "paddle";

        super(screen, paddle, start, new vector2(0, 0));
    }
    /*
    x - amount to move to the left (subtract from) of current position
    makes the paddle move by the specified value in x
    but makes sure it does not move off screen
    */
    moveleft(x) {
        if (this.left - x >= 0){
            this.move(-x, 0);
        }
    }
    /*
    x - amount to move to the right (add to) of current position
    makes the paddle move by the specified value in x
    but makes sure it does not move off screen
    */
    moveright(x) {
        if ( this.right + x  <= this.screensize.x) {
            this.move(x, 0);
        }
    }
    /*
    ball - the ball sprite to centre the paddle around
    Tracks the position of the given sprite
    This is an example of code that was written before some functions were
    added to the sprite class, if it was re-written to take advantage of them
    it would have slightly simpler code, but it works so is left as is
    */
   simulateplay(ball)
	{
		var savex = this.pos.x;
		this.pos.x = ball.centrex - this.size.x/2;
		//don't let move off screen
		if (this.left < 0 || this.right > this.screensize.x)
			this.pos.x = savex;
		else
			this.render();
	}
}