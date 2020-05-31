/*
ball class, based on moving sprite
*/
class Ball extends MovingSprite {
	/*
	screen - the html container this sprite will sit inside of (its parent)
	start - the initial x and y position to render this container/sprite
			position is defined as the top left hand corner of the sprite
	velocity - initial vector2 velocity of the ball
	deadline - distance towards bottom of screen that will cause the ball to die
	*/
    constructor(screen, start, velocity, deadline) {

		//create my own container to exist inside
        var newball = document.createElement("div");
        newball.className = "ball";

        super(screen, newball, start, velocity);
		this.deadline = deadline;
    }
	/*
	do normal sprite updates but then check for hitting sides and top
	and kill line
	*/
    update(delta) {
		super.update(delta);
		
		//call bounceinside of inherited class movingsprite
		this.bounceinside();
		
		//check for going lower than paddle
		if (this.bottom >= deadline)
			this.kill();
    }
	/*
	calculates horizontal speed based on paddle hit position
	allows player to control the ball based on where they hit it on the paddle
	*/
	hitpaddle(paddle)
	{
		this.hitsprite(paddle);
		var centredistance = this.centrex - paddle.centrex;
		
		//ensure speed stays the same despite changing the horizontal velocity
		var speed = this.velocity.magnitude;
		this.velocity.x = centredistance * 5;

		//call vector2.strenth
		this.velocity.strength(speed);
	}
}
