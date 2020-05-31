/*provides a way of rendering the layout of the bricks using
an array of array of colours (effectively a 2d array)
this will not work directly need to inherit/extend in with another class
and provide a blockmap and call this.performLayout
*/
class character extends levelset{

    /*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
    timedelay - time between tick actions
    */
	constructor(screen, bricks, timedelay)
	{
		//call base constructor - have to do this before accessing member variables
		super(screen, bricks, timedelay);
    }
    
    /*
    takes a blockmap (array of array of integers)
    and draws to the screen values of < 0 are skipped
    integer is used for colour
    */
    performLayout(blockmap, size)
    {
        for (var y = 0; y < blockmap.length; y++) {
            for (var x = 0; x < blockmap[y].length; x++) {
                var colour = blockmap[y][x];
                if (colour > 0)
                {
                    this.setBlockAt(new vector2(x, y), 
                                    this.colorset[colour % this.colorset.length],
                                     size, this.standardmargin, this.standardspread);
                }
            }
        }
    }

    /*example of a blockmap
    place a row column brick layout
    0 means no brick, other numbers indicate colour number

    layout = [
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,2,2,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
        [0,0,1,1,1,1,0,0],
    ];
    */
}