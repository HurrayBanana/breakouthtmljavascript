/*
displaces the standard brick layout into circular rotating layouts
*/
class rotator extends levelset{
	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - how often to call the action subroutine
	funky - if true then rotation phase is altered so we get non circular motion
	omega - amount to adjust the phase of the rotation by each frame
	*/
	constructor(screen, bricks, timedelay, funky, omega)
	{
		super(screen, bricks,timedelay);
		this.angle = 0;
		this.funky = funky;
		this.omega = omega;
		this.startup();
	}

	/*
	layout bricks then displace using rotation code so they assume correct layout
	*/
	startup()
	{
		this.angle = 1;
		this.rows(5, 11, 1);
		this.action(0);
	}
	/*
	delta - fraction of a second this frame represents
	works through each brick and displaces it around a circle layout
	if funky is true then we add an additional phase offset for a weird effect
	*/
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