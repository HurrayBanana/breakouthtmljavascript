/*
level base class
to bring common repeating stuff centrally together
*/
class levelset{
	/*
	// screen - container reference for sprite placement
	// bricks - list that will hold each of the bricks for the level
	// timedelay - time between tick actions
	*/
	constructor(screen, bricks, timedelay)
	{
		//force level to use global activebrick array bricks parameter passed as a null
		this.bricks = activebrick// bricks;
		this.timerdelay = timedelay;
		this.screen = screen;
		this.time = 0;					//reset level time
		this.author = "Hurray Banana";
		//default colour for background
		this.screen.style.backgroundColor = "black";
		
		//default brick colours
		this.colorset = [
			"red",
			"orange",
			"yellow",
			"green",
			"blue",
			"indigo",
			"violet"
		];	
		//distance from edges and top
		this.standardmargin = new vector2(15, 50);
		//gap between bricks (x,y)
		this.standardspread = new vector2(60, 30);
	}
	/*
	override with any time based action code
	this allows differnet level types to specify their
	own code to run without having to worry about how it's called
	*/
	action(delta){}
	rawtimer(delta){}
	/*
	call back routine will call this.action if the timerdelay has elapsed
	and reset it ready for the next elapse event
	does nothing if a timerdelay of zero has been specified
	*/
	tick(delta)
	{
		this.rawtimer(delta);
		if (this.timerdelay > 0)
		{
			this.time += delta;
			if (this.time >= this.timerdelay)
			{
				this.time -= this.timerdelay;
				this.action(delta);
			}
		}
	}
	
	/*
	rows - number of rows to have
	cols - number of columns to have
	size - scale of bricks 1 is normal size 0.5 would 50%, 1.5 would be 150%
	code to generate level in a row column format
	called from a class constructor that inherits from levelset
	in order to place the level blocks
	*/
	rows(rows, cols, size) {
		for (var y = 0; y < rows; y++) {
			for (var x = 0; x < cols; x++) {
				var colour = this.colorset[y % this.colorset.length];
				this.setBlockAt(new vector2(x, y), colour, size, this.standardmargin, this.standardspread);
			}
		}
	}	
	/*
	pos - the vector2 value that specifies the column and row number of the brick
	colour - the colour to draw the brick in
	size - the scale to draw the brick at 1 is 100% 0.5 is 50% 2 is 200%
	margin - space to leave from left and top of screen for block layout
	spread - distance between rows and columns
	
	Create a block element at the given x and y coords
	an example of modularistation, this code could easily have been 
	placed in the above function (rows) but moving it here
	makes the code more readable and then allows other routines to make
	use of it. returns the block created if you need a reference to further manipulate
	*/
	setBlockAt(pos, colour, size, margin, spread) {
		var left = margin.x + pos.x * spread.width;
		var top = margin.y + pos.y * spread.height;
		var b = new Brick(this.screen, new vector2(left, top), colour, size);
		this.bricks.push(b);
		
		return b;
	}
}

