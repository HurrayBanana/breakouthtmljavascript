/*
extends the character level set to enable simple 2 frame animations
*/
class twostates extends character{
    /*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
    timedelay - time between showing the frames of animation
    */
	constructor(screen, bricks, timedelay)
	{
		//call base constructor - have to do this before accessing member variables
		super(screen, bricks, timedelay);
    }

    /*
    blockmap - the array of arrays that contains the brick colours - colour 0 is treated as no brick
    size - scale to apply to the bricks
    vis - visibility (true means show, false means hide)
    Takes a colour layout blockmap and generates a set of blocks
    the number represents the colour from the current colorset array
    colour 0 is skipped in the layout so no brick at those positions
    */
    flashlayout(blockmap, size, vis)
    {
        for (var y = 0; y < blockmap.length; y++) {
            for (var x = 0; x < blockmap[y].length; x++) {
                var colour = blockmap[y][x];
                if (colour > 0)
                {

                    var b = this.setBlockAt(new vector2(x, y), 
                                    this.colorset[colour % this.colorset.length],
                                        size, this.standardmargin, this.standardspread.multiply(size), vis);
                    b.visible = vis;
                }
            }
        }
    }
    /*
    delta - fraction of a second that this update represents
    those bricks that are visibile are hidden
    those bricks that are hidden are made visible
    effectively toggles between displaying two sets of bricks, for a simple animation effect
    */
	action(delta)
	{
		super.action(delta);
		for (var i = 0; i < this.bricks.length; i++)
            this.bricks[i].visible = !this.bricks[i].visible;
    }
}
