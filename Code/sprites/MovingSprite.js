/*
provides a class for a sprite with a velocity
*/
class MovingSprite extends Sprite {
    constructor(screen, container, start, velocity){//startx, starty, xvel, yvel) {

        super(screen, container, start);
		this.velocity = velocity;
		this.change = new vector2(0, 0);
    }

    update(delta) {
		//store for previous position
		this.change.x = this.velocity.x * delta;
		this.change.y = this.velocity.y * delta;

        this.pos.x += this.change.x;
        this.pos.y += this.change.y;
		
		this.render();
    }
    reflectx() { this.velocity.x = -this.velocity.x; }
    reflecty() { this.velocity.y = -this.velocity.y; }
    reflect() {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = -this.velocity.y;
    }
	backx()
	{
		this.pos.x -= this.change.x;
	}
	backy()
	{
		this.pos.y -= this.change.y;
	}
	back()
	{
		this.pos.x -= this.change.x;
		this.pos.y -= this.change.y;
	}
	resolvecollision(collisiondata)
	{
		this.move(collisiondata.dx, collisiondata.dy);
	}
	//bounce of sides and top
    bounceinside() {
        if (this.pos.x < 0 || (this.right) >= this.screensize.width)
		{
			this.backx();
            this.reflectx();
		}
        if (this.pos.y < 0)
		{
			this.backy();
            this.reflecty();
		}
    }
	//general code for hitting and bouncing correctly of another sprite				
	hitsprite(item) {
		var collisiondata = this.closestside(item);
		this.resolvecollision(collisiondata);
		
		if (collisiondata.side > 1)
			this.reflecty();
		else
			this.reflectx();
	}

}