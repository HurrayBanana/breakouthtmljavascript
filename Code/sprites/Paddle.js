class Paddle extends MovingSprite {
    constructor(screen, start) {
        var paddle = document.createElement("div");
        paddle.id = "paddle";

        super(screen, paddle, start, new vector2(0, 0));
    }
    moveleft(x) {
        if (this.left - x >= 0){
            super.move(-x, 0);
        }
    }
    moveright(x) {
        if ( this.right + x  <= this.screensize.x) {
            super.move(x, 0);
        }
    }
	simulateplay(ball)
	{
		var savex = this.pos.x;
		this.pos.x = ball.centrex - this.size.x/2;//width/2;
		//don't let move off screen
		if (this.left < 0 || this.right > this.screensize.x)//screenwidth)
			this.pos.x = savex;
		else
			this.render();
	}
}