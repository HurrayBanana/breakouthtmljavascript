/*
Brick class includes function for checking for collision against active balls
*/
class Brick extends Sprite {
    constructor(screen, start, col, size) {

        var newblock = document.createElement("div");
        newblock.className ="brick"; 
        newblock.style.backgroundColor = col;

        super(screen, newblock, start, new vector2(0, 0));
		this.myscale = new vector2(size, size);
		this.basex = start.x;
		this.basey = start.y;
		this.phasex = start.x * 0.01;
		this.phasey = start.y * 0.01;
    }
	//checks brick against all active balls
	//returns either null or ball hit
	collisioncheck(allballs)
	{
		//don't check dead bricks
		if (!this.dead)
		{
			var score = 0;
			//check each active ball against the block
			for (var i = 0; i < allballs.length; i++) {
				if (!this.dead && allballs[i].touching(this)) {
					allballs[i].hitsprite(this);
					this.kill();
					return allballs[i];
				}
			}
		}
		return null;
	}
	killoffscreen()
	{
		if (!this.onscreen())
			this.kill();
	}
	//moves a brick horizontally by a number of pixels to the left
	//wrapping around the screen
    scroll(distance) {
        this.move(distance.x, distance.y);
		this.wrap();
    }
	//forces a wave motion on the bricks base position
	wave(angle, dx, dy)
	{
		this.pos.x = this.basex + Math.sin(angle + this.phasey) * dx;
		this.pos.y = this.basey + Math.cos(angle + this.phasex) * dy; 
		this.render();
	}
	//ofsets base position of brick using a circular position
	rotate(angle, sx, sy, xoff, yoff)
	{
		this.pos.x = 225 + xoff + Math.cos(angle + this.phasex) * this.basey * sx;
		this.pos.y = 300 + yoff + Math.sin(angle + this.phasex) * this.basey * sy; 
		this.render();
	}
	//hides particular columns of bricks
	phasedHide(columntohide)
	{
		if (columntohide == this.basex)
			this.hide();
		else
			this.show();
	}
	//shows particular columns of bricks
	phasedShow(columntohide)
	{
		if (columntohide == this.basex)
			this.show();
		else
			this.hide();
	}
}