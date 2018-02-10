/*
ball class
*/
class Ball extends MovingSprite {
    constructor(screen, start, velocity, deadline) {

        var newball = document.createElement("div");
        newball.className = "ball";

        super(screen, newball, start, velocity);
		this.deadline = deadline;
    }

	//do normal update but then check for hitting sides and top
	//and kill line
    update(delta) {
        super.update(delta);
        this.bounceinside();
		if (this.bottom >= deadline)
			this.kill();
    }
	
	//calculates horizontal speed based on paddle hit position
	hitpaddle(paddle)
	{
		this.hitsprite(paddle);
		var centredistance = this.centrex - paddle.centrex;
		
		//ensure speed stays the same despite changing the horizontal velocity
		var speed = this.velocity.magnitude;
		this.velocity.x = centredistance * 5;
		this.velocity.strength(speed);
	}
}
