/*
Produces a set of bricks that have their visibility controlled
in groups of columns
*/
class phased extends levelset{

	/* 
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - time between tick actions
	show - 	if false then one column at a time is hidden
			if true then one column at a time is displayed
	*/
	constructor(screen, bricks, timedelay, show)
	{
		super(screen, bricks,timedelay);
		this.show = show;
		this.column = 0;
		this.startup();
	}
	/* sets up the fixed rows and columns and calls the action
	routine to set the required visibility
	*/
	startup()
	{
		this.rows(7, 8, 1);
		this.action(0);
	}
	/*
	delta - fraction of a second this frame represents
	makes use of the phasedShow and phasedHide subroutines of Brick
	they really should be in here as they are to do with this and not bricks

	processes each brick and either hides or shows it depending on the active column
	*/
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
		{
			if (this.show)
				this.bricks[i].phasedShow(this.standardmargin.x + this.column * this.standardspread.x);
			else
				this.bricks[i].phasedHide(this.standardmargin.x + this.column * this.standardspread.x);
		}

		//use modulus to keep within the maximum number of columns
		this.column = (this.column + 1) % 8;
	}

}