//phased not me
class phased extends levelset{

	constructor(screen, bricks, timedelay, show)
	{
		super(screen, bricks,timedelay);
		this.show = show;
		this.column = 0;
		this.startup();
	}

	startup()
	{
		this.rows(7, 8, 1);
		this.action(0);
	}
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
		{
			if (this.show)
				this.bricks[i].phasedShow(this.standardmargin.x + this.column * this.standardspread.x);
			else
				this.bricks[i].phasedHide(this.standardmargin.x + this.column * this.standardspread.x);
		}
		this.column = (this.column + 1) % 8;
	}

}