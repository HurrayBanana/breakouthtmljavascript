/*
creates ascii character 65
using a blockmap
*/
class alevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [0,0,0,1,1,0,0,0],
        [0,0,1,2,2,1,0,0],
        [0,1,2,0,0,2,1,0],
        [0,1,2,0,0,2,1,0],
        [0,1,2,2,2,2,1,0],
        [0,1,1,1,1,1,1,0],
        [0,1,1,0,0,1,1,0],
        [0,1,1,0,0,1,1,0],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
		super(screen, bricks, 0);
        //colour set first colour 0 ignored
        this.colorset = [
            "black",
            "purple",
            "cyan"
        ];
        //activate layout
        this.performLayout(this.layout, 1)
    }
}

