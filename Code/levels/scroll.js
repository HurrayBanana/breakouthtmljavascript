//scrolly mcscrollface
class scroll extends levelset{
	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - how often to call the action subroutine
	offset - amount to move in pixeks per second
	*/
	constructor(screen, bricks, timedelay, offset)
	{
		super(screen, bricks,timedelay);
		this.offset = offset;
		this.rows(7, 8, 1);
	}
	/*
	delta - fraction of a second this frame represents
	move bricks by the amount given in offset
	use the delta amount to get a fraction of a second for this movement
	so it moves in pixels per second
	*/
	action(delta)
	{
		super.action(delta);
		for (var i = 0; i < this.bricks.length; i++)
			this.bricks[i].scroll(this.offset.multiply(delta));
	}
}
