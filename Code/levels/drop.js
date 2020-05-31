/*
drop layout causes bricks to fall after a timer elapses
*/
class drop extends levelset{

	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	rows - number of rows to render
	cols - number of columns to render
	timedelay - time between brick drops
	depth - distance to drop
	*/
	constructor(screen, bricks, rows, cols, timedelay, depth)
	{
		super(screen, bricks,timedelay);
		this.depth = depth;
		this.rows(rows, cols, 1);
	}

	/*
	drop bricks by depth amount and then kill any that moved off screen
	*/
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
		{
			this.bricks[i].move(0, this.depth);
			this.bricks[i].killoffscreen();
		}
        
	}
}