//drop
class drop extends levelset{

	constructor(screen, bricks, timedelay, depth)
	{
		super(screen, bricks,timedelay);
		this.depth = depth;
		this.rows(5, 8, 1);
	}

	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
		{
			this.bricks[i].move(0, this.depth);
/* 			if (this.bricks[i].top > 500)
				this.bricks[i].kill();
 */			this.bricks[i].killoffscreen();
		}
        
	}
}