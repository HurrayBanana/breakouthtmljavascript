//scrolly mcscrollface
class scroll extends levelset{

	constructor(screen, bricks, timedelay, offset)
	{
		super(screen, bricks,timedelay);
		this.offset = offset;
		this.rows(7, 8, 1);
	}

	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
			this.bricks[i].scroll(this.offset.multiply(delta));
	}
}