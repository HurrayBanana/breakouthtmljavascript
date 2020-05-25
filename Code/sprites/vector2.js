//vector2 class
//provides access to 2 float values
//and some useful methods for manipulating them as a column vector
class vector2{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	//ease of meaning for when used for other things like size
	//getters
	get width() {return this.x;}
	get height() {return this.y;}
	//setters
	set width(value) {this.x = value;}
	set height(value) {this.y = value;}
	//convert to unit vector (same direction but of unit length)
	normalise()
	{
		var mag = this.magnitude
		this.x /= mag
		this.y /= mag
	}
	//produces a speed in the current direction of the vector
	strength(speed)
	{
		this.normalise();
		this.x *= speed;
		this.y *= speed;
	}
	//returns magnitude (length) of vector
	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	//multiplies the vector by the given scaler value
	multiply(scaler)
	{
		return new vector2(this.x * scaler, this.y * scaler);
	}
}