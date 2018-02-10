//rotate me do
class rotator extends levelset{

	constructor(screen, bricks, timedelay, funky, omega)
	{
		super(screen, bricks,timedelay);
		this.angle = 0;
		this.funky = funky;
		this.omega = omega;
		this.startup();
	}

	startup()
	{
		this.angle = 1;
		this.rows(5, 11, 1);
		this.action(0);
	}
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++) {
			if (this.funky)
				this.bricks[i].rotate(this.angle, 1.25 * Math.sin(this.angle), -1.25 * Math.sin(this.angle + 0.2), 0, -50);
			else
				this.bricks[i].rotate(this.angle, 1.25 , -1.25 , 0, -50);
		}
		this.angle += this.omega * delta;
	}
}