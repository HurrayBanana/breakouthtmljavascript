class Block extends Sprite {
    constructor(screen, startx, starty, col) {

        var newblock = document.createElement("div");
        newblock.className ="block"; 
        newblock.style.backgroundColor = col;

        super(screen, newblock, startx, starty);
    }
	collisioncheck()
	{
		var score = 0;
	    //remove any blocks moved off screen
        if (this.onscreen()) {
            //check each active ball against the block
            for (var i = 0; i < ball.length; i++) {
                if (!this.dead && ball[i].touching(this)) {
					ball[i].hitsprite(this);
                    this.kill();
                    score += 10;
                }
            }
        }
        else
        {
            this.kill();
        }
		return score;
	}
    drop(distance) {
        this.move(0, distance);
    }
	
	
}