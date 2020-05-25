/*
little fixed sprite with alpha animation
*/
class HBLogo extends Sprite {
    constructor(screen) {
        var div = document.createElement("div");
        div.id = "copy";
        super(screen, div, new vector2(0, 600 - 27));

        this.alpha = 0;
        this.changealpha = 0.5; 
        this.container.style.opacity = this.alpha.toString();
    }
    //adjusts alpha value of sprite
    //changeing to interpolate between 0 and 1
    //sets the css opacity attribute
    tick(delta) {
        this.alpha += this.changealpha * delta;
        if (this.alpha < 0.0 || this.alpha > 1)
            this.changealpha *= -1;

        this.container.style.opacity = this.alpha.toString();
    }

}