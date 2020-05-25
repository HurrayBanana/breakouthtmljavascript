//does what it says on the tin
//records an X and Y position and an indicator of side struck of a brick
//used so we can return and pass 3 pieces of information easily
class collisiondata {
	constructor(side, dx, dy)
	{
		this.side = side;
		this.dx = dx;
		this.dy = dy;
	}
}