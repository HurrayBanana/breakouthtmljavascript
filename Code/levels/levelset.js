//level base class
// to bring common repeating stuff centrally together
class levelset{
	constructor(screen, bricks, timedelay)
	{
		this.bricks = bricks;
		this.timerdelay = timedelay;
		this.screen = screen;
		this.time = 0;

		this.colorset = [
			"red",
			"orange",
			"yellow",
			"green",
			"blue",
			"indigo",
			"violet"
		];	
		this.standardmargin = new vector2(15, 50);
		this.standardspread = new vector2(60, 30);
	}
	//override with any time based action code
	action(delta){}
	//call back routine
	tick(delta)
	{
		this.time += delta;
		if (this.time >= this.timerdelay)
		{
			this.time -= this.timerdelay;
			this.action(delta);
		}
	}
	//code to generate level
	rows(rows, cols, size) {
		for (var y = 0; y < rows; y++) {
			for (var x = 0; x < cols; x++) {
				var colour = this.colorset[y % this.colorset.length];
				this.setBlockAt(new vector2(x, y), colour, size, this.standardmargin, this.standardspread);
			}
		}
	}	
	//Create a block element at the given x and y coords
	setBlockAt(pos, colour, size, margin, spread) {
		var left = margin.x + pos.x * spread.width;
		var top = margin.y + pos.y * spread.height;

		this.bricks.push(new Brick(this.screen, new vector2(left, top), colour, size));
	}
}