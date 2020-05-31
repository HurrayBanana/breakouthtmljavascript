/*
Creates a standard row colum brick layout, with no actions
*/
class standard extends levelset{
	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	rows - number of rows to render
	cols - number of columns to render
	size - percentage brick size
	*/
	constructor(screen, bricks, rows, cols, size)
	{
		//call base constructor - have to do this before accessing member variables
		super(screen, bricks, 0);
		//place a row column brick layout
		this.rows(rows, cols, size);
	}
}