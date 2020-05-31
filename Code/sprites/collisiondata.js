/*
does what it says on the tin
records an X and Y position and an indicator of side struck of a brick
used so we can return and pass 3 pieces of information easily
*/
class collisiondata {
	/*
	side - side to record hit detected on
	dx - distance of collision penrtration in horizontal direction
	dy - distance of collision penrtration in vertical direction
	*/
	constructor(side, dx, dy)
	{
		this.side = side;
		this.dx = dx;
		this.dy = dy;
	}
}