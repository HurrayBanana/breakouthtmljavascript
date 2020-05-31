/*
zoomer provides a scaling effect to the bricks
without altering their screen position
uses a fixed number of rows and columns
*/
class zoom extends levelset{

	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - time between tick actions
	*/
	constructor(screen, bricks, timedelay)
	{
		super(screen, bricks,timedelay);
		this.angle = 0;
		this.startup();
	}
	/*
	sets the zoom data and then forces the action method to run to reposition all the bricks
	placed in a separate routine instead of constructor for clarity
	*/
	startup()
	{
		this.rows(10, 8, 1);
		this.action(0);
	}
	/*
	alters the scale of each brick according to a sine wave
	whose period is controlled by the value of angle
	which is updated by the the time period delta (values are in radians)
	*/
	action(delta)
	{
		super.action(delta)
		for (var i = 0; i < this.bricks.length; i++)
		{
			//scale range 0.9 +- 0.35
			var z = (Math.sin(this.angle + i/10) * 0.35) + 0.9;
			this.bricks[i].scale = z;
		}
		this.angle += 2 * delta;
	}
}