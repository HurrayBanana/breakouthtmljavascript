//wavey davey
class wave extends levelset{

	constructor(screen, bricks, timedelay, scale)
	{
		super(screen, bricks,timedelay);
		this.angle = 0;
		this.scale = scale;
		this.startup();
	}

	startup()
	{
		if (this.scale)
			this.rows(10,8,1.25);
		else
			this.rows(9, 8, 1);
		
		this.action(0);
	}
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++) {
			this.bricks[i].wave(this.angle, 10,20);
			
			if (this.scale)
			{
				var z = (Math.sin(this.angle + i/10) * 0.5) + 0.6;
				this.bricks[i].scale = z;	
			}
		}
		this.angle += 2 * delta;
	}
}