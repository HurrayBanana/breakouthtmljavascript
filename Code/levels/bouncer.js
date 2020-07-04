class bouncer extends character{


	rainbow = [
	[0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
	[0,0,0,0,1,2,3,3,3,3,2,1,0,0,0,0],
	[0,0,0,1,2,3,4,4,4,4,3,2,1,0,0,0],
	[0,0,1,2,3,4,5,5,5,5,4,3,2,1,0,0],
	[0,1,2,3,4,5,6,6,6,6,5,4,3,2,1,0],
	[1,2,3,4,5,6,7,7,7,7,6,5,4,3,2,1],
	[2,3,4,5,6,7,0,0,0,0,7,6,5,4,3,2],
	[3,4,5,6,7,0,0,0,0,0,0,7,6,5,4,3],
	[4,5,6,7,0,0,0,0,0,0,0,0,7,6,5,4],
	
	
	];


	constructor(screen, bricks, timedelay, toplimit, bottomlimit, pixelstep)
	{
		super(screen, bricks, timedelay);
		
		this.colorset = [
			"black",
			"red",
			"orange",
			"yellow",
			"lime",
			"blue",
			"indigo",
			"violet",
		];
		
		this.screen.style.backgroundColor = "cadetblue";
		this.direction = pixelstep;
		this.botlimit = bottomlimit;
		this.toplimit = toplimit;
		this.performCustomLayout(this.rainbow,
								new vector2(50, 75),	//margin
								new vector2(26,26),		//spacing
								new vector2(0.5, 1.25),	//scaling
								true);
	}
	
	action(delta)
	{
		var change = false;
		
		for (var i = 0; i < this.bricks.length; i++)
		{
			if (!this.bricks[i].dead)
			{
				this.bricks[i].move(0, this.direction);
				
				if (this.bricks[i].bottom > this.botlimit && this.direction > 0 || 
					this.bricks[i].top < this.toplimit && this.direction < 0)
					change = true;
			}
		}
		//all bricks now moved check for direction change
		if (change)
		{
			 this.direction *= -1;
		}
		
		
	}
	
}








