/*
moves the 
*/
class wave extends levelset{

	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - time between tick actions
	scale - true if we want to change brick size during action, false for just wave
	*/
	constructor(screen, bricks, timedelay, scale)
	{
		super(screen, bricks, timedelay);
		this.angle = 0;
		this.scale = scale;
		this.startup();
	}
	/*
	define intial settings and alter size of bricks depending
	on whether we are going to scale or not
	*/
	startup()
	{
		this.MyColourSet();
		if (this.scale)
			this.rows(10,8,1.25);
		else
			this.rows(9, 8, 1);
		
		//force the action method to execute so that
		//the intitial position of the bricks can be changed (from the standard layout)
		this.action(0);
	}
	/*
	define colour set and background colour for level
	*/
	MyColourSet()
	{
		this.screen.style.backgroundColor = "grey";
		this.colorset = [
			"black",
			"white",
		];	
	}
	/*
	delta - fraction of second that this gameloop represents

	uses the Brick.Wave routine to offset positions of brick
	handles the scaling itself if this was requested when the level
	was constructed
	*/
	action(delta)
	{
		super.action(delta)

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