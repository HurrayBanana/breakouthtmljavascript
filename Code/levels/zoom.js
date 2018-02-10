//zoomer
class zoom extends levelset{

	constructor(screen, bricks, timedelay)
	{
		super(screen, bricks,timedelay);
		this.angle = 0;
		this.startup();
	}

	startup()
	{
		this.rows(10, 8, 1);
		this.action(0);
	}
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
		{
			var z = (Math.sin(this.angle + i/10) * 0.35) + 0.9;
			this.bricks[i].scale = z;
		}
		this.angle += 2 * delta;
	}
}