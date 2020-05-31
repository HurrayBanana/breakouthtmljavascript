/*
little fixed sprite with alpha animation (fade in and out)
sits at a fixed position determined in the constructor
*/
class HBLogo extends Sprite {
    /*
	screen - the html container this sprite will sit inside of (its parent)
    */
    constructor(screen) {
        var div = document.createElement("div");
        div.id = "copy";
        super(screen, div, new vector2(0, 600 - 27));

        this.alpha = 0;
        //set alpha to change 50% per second (2 secs to fade in or out)
        this.changealpha = 0.5; 
        this.container.style.opacity = this.alpha.toString();
    }
    /*
    adjusts alpha value of sprite
    changeing to interpolate between 0 and 1
    sets the css opacity attribute
    */
    tick(delta) {
        this.alpha += this.changealpha * delta;
        //if reached upper or lower limit flip fade direction
        if (this.alpha < 0.0 || this.alpha > 1)
            this.changealpha *= -1;

        this.container.style.opacity = this.alpha.toString();
    }

}