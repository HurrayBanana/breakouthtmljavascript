/*
provides a extensions to the sprite class to allow velocities
*/
class MovingSprite extends Sprite {
	/*
	screen - the html container this sprite will sit inside of (its parent)
	container - the html container that will be used to represent this sprite
	start - the initial x and y position to render this container/sprite
			position is defined as the top left hand corner of the sprite
	velocity - a vector2 value that specifies the speed in the x and y direction
			of the sprite in pixels per second (100,100) would travel diagonally
			down the screen to the right 100 pixels in 1 second
	*/
    constructor(screen, container, start, velocity){//startx, starty, xvel, yvel) {
		//call constructor off base class
        super(screen, container, start);
		this.velocity = velocity;
		this.change = new vector2(0, 0);
    }

	/*
	delta - fraction of a second that this update needs to adjust the sprites 
			position by
	updates the position of the sprite for the portion of a second given by the delta value
	*/
    update(delta) {
		//store for previous position
		this.change.x = this.velocity.x * delta;
		this.change.y = this.velocity.y * delta;

        this.pos.x += this.change.x;
        this.pos.y += this.change.y;
		
		//update css information
		this.render();
	}
	/*
	makes the sprite change horizontal direction at the same speed(*-1)
	*/
    reflectx() { this.velocity.x = -this.velocity.x; }
	/*
	makes the sprite change vertical direction at the same speed(*-1)
	*/
    reflecty() { this.velocity.y = -this.velocity.y; }
	/*
	changes the direction of travel in both horizontal and vertical directions
	*/
    reflect() {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = -this.velocity.y;
    }
	/*
	move back horizontally by the distance we travelled in the previous frame
	we need to do this to back a sprite out from a collision that occurred
	*/
	backx()
	{
		this.pos.x -= this.change.x;
	}
	/*
	move back vertically by the distance we travelled in the previous frame
	we need to do this to back a sprite out from a collision that occurred
	*/
	backy()
	{
		this.pos.y -= this.change.y;
	}
	/*
	move back to the position in the previous frame
	we need to do this to back a sprite out from a collision that occurred
	otherwise we might still be colliding after we change direction and would
	be constantly stuck inside another sprite
	*/
	back()
	{
		this.pos.x -= this.change.x;
		this.pos.y -= this.change.y;
	}
	/*
	collisiondata - details of the side and penetration distance from collision detection
	move the sprite by the distance specified in the collision data given
	*/
	resolvecollision(collisiondata)
	{
		this.move(collisiondata.dx, collisiondata.dy);
	}
	/*
	checks to see if we are at the limits of the screen and causes sprite
	to reflect either horizontally or vertically
	does not check for bottom of screen as we want to kill ball in that case
	*/
    bounceinside() {
        if (this.pos.x < 0 || (this.right) >= this.screensize.width)
		{
			this.backx();
            this.reflectx();
		}
        if (this.pos.y < 0 || this.bottom >= this.screensize.height)
		{
			this.backy();
            this.reflecty();
		}
    }
	/*
	item - the sprite to check collision with
	determines if this sprite collided with the given one
	if it did it determines whether it should bounce vertically or horizontally
	*/
	hitsprite(item) {
		var collisiondata = this.closestside(item);
		this.resolvecollision(collisiondata);
		
		//left and right are side 0 and 1, 2 and 3 are top and bottom
		//so we can do a simple logic test for vertical or horizontal
		if (collisiondata.side > 1)
			this.reflecty();
		else
			this.reflectx();
	}

}