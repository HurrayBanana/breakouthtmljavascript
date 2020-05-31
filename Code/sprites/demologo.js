/*
little demo sprite with flashing animation
*/
class DemoLogo extends MovingSprite {
	/*
	screen - the html container this sprite will sit inside of (its parent)
	*/
    constructor(screen) {
        var div = document.createElement("div");
		div.id = "demo";
		
		//must call super class before accessing any attributes
        super(screen, div, new vector2(0, 0));
		
		//place just off the top of the screen
		this.pos.y = -this.size.y;
		//fixed verlocity to move down the screen
		this.velocity = new vector2(0, 50);
        this.time = 0;
		//always looks better if image is on longer than off
        this.showtime = 0.6; 
		this.hidetime = 0.3;
	}
	/*
    adjusts alpha value of sprite
	changeing to interpolate between 0 and 1
	*/
    tick(delta) {
		super.update(delta);
		this.time += delta;
		//if visible, has showtime elapsed
		if (this.visibility && this.time >= this.showtime)
		{
			//reset counter and hide 
			this.time -= this.showtime;
			this.hide();
			//console.log("hide demo"); output to chrome developer console
		}
		//if not visible, has hide time elapsed
		else if (!this.visibility && this.time >= this.hidetime)
		{
			//reset counter and then show
			this.time -= this.hidetime;
			this.show();
			//console.log("show demo");
		}
    }
}