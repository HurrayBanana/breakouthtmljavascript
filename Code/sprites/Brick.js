/*
Brick class includes function for checking for collision against active balls
*/
class Brick extends Sprite {
	/*
	screen - the html container this sprite will sit inside of (its parent)
	start - the initial x and y position to render this container/sprite
			position is defined as the top left hand corner of the sprite
	col - specifies the column of the layout that this brick occupies
	size - scale to draw brick at
	*/
    constructor(screen, start, col, size) {

		//create my own container to exist inside
        var newblock = document.createElement("div");
        newblock.className ="brick"; 
        newblock.style.backgroundColor = col;

        super(screen, newblock, start, new vector2(0, 0));
		this.myscale = new vector2(size, size);
		this.scale =  size;
		this.basex = start.x;
		this.basey = start.y;
		this.phasex = start.x * 0.01;
		this.phasey = start.y * 0.01;
	}
	/*
	allballs - the array containing all the active balls
	iterates through each ball in the list to check to see if they collide with this brick
	returns either null or the ball that hit the brick
	*/
	collisioncheck(allballs)
	{
		//don't check dead bricks and only visible ones
		if (!this.dead && this.visible)
		{
			var score = 0;
			//check each active ball against the block
			for (var i = 0; i < allballs.length; i++) {
				if (!this.dead && allballs[i].touching(this)) {
					allballs[i].hitsprite(this);
					if (killbricks)
					{
						this.kill();
						return allballs[i];
					}
					else
					{
						return null;
					}
				}
			}
		}
		return null;
	}
	/*
	destorys the brick if it is outside the render area 
	of its parent container (the screen)
	*/
	killoffscreen()
	{
		if (!this.onscreen())
			this.kill();
	}
	/*
	distance - displacement to move (as a vector2 value)
	moves a brick horizontally by a number of pixels to the left
	wrapping around the screen, maybe this should be in moving sprite
	so we have a general access routine for all moving sprites
	*/
    scroll(distance) {
        this.move(distance.x, distance.y);
		this.wrap();
    }

	/*
	angle - amount in radians to rotate by
	dx - horizontal maximum offset
	dy - vertical maximum offset
	forces a wave motion on the bricks base position in a circular fashion
	really should not be here and should be implemented in the wave class
	but another example of something that worked before changes and was left
	*/
	wave(angle, dx, dy)
	{
		this.pos.x = this.basex + Math.sin(angle + this.phasey) * dx;
		this.pos.y = this.basey + Math.cos(angle + this.phasex) * dy; 
		this.render();
	}

	/*
	angle - rotation amount in radians around centre position to rotate
	sx - scale factor in horizontal position to apply
	sy - scale factor in vertical position to apply
	xoff - horizontal displacement from centre postion (horizontal radius)
	yoff - vertical displacement from centre position (vertical axis)

	ofsets base position of brick using a circular position
	really should not be here and should be implemented in the rotater class
	but another example of something that worked before changes and was left

	*/
	rotate(angle, sx, sy, xoff, yoff)
	{
		this.pos.x = 225 + xoff + Math.cos(angle + this.phasex) * this.basey * sx;
		this.pos.y = 300 + yoff + Math.sin(angle + this.phasex) * this.basey * sy; 
		this.render();
	}

	/*
	columntohide - the associated column to make not visible

	hides particular columns of bricks
	really should not be here and should be implemented in the phase class
	but another example of something that worked before changes and was left
	*/
	phasedHide(columntohide)
	{
		if (columntohide == this.basex)
			this.hide();
		else
			this.show();
	}

	/*
	columntohide - the associated column to make not visible

	shows particular columns of bricks, helper for phased levels
	again really should not be here and should be implemented in the phase class
	but another example of something that worked before changes and was left
	*/
	phasedShow(columntohide)
	{
		if (columntohide == this.basex)
			this.show();
		else
			this.hide();
	}
}