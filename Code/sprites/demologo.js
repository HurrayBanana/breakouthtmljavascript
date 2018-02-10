/*
little demo sprite with flashing animation
*/
class DemoLogo extends MovingSprite {
    constructor(screen) {
        var div = document.createElement("div");
        div.id = "demo";
        super(screen, div, new vector2(0, 0));
		
		this.pos.y = -this.size.y;
		this.velocity = new vector2(0, 50);
        this.time = 0;
		//always looks better if image is on longer than off
        this.showtime = 0.6; 
		this.hidetime = 0.3;
    }
    //adjusts alpha value of sprite
	//changeing to interpolate between 0 and 1
    tick(delta) {
		super.update(delta);
		this.time += delta;
		if (this.visibility && this.time >= this.showtime)
		{
			this.time -= this.showtime;
			this.hide();
			//console.log("hide demo"); output to chrome developer console
		}
		else if (!this.visibility && this.time >= this.hidetime)
		{
			this.time -= this.hidetime;
			this.show();
			//console.log("show demo");
		}
    }

}