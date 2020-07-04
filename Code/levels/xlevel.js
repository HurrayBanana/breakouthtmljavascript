/*
creates ascii character 65
using a blockmap
*/
class xlevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [1,1,1,0,0,1,1,1],
        [1,2,1,0,0,1,2,1],
        [0,1,2,1,1,2,1,0],
        [0,0,1,2,2,1,0,0],
        [0,0,1,2,2,1,0,0],
        [0,1,2,1,1,2,1,0],
        [1,2,1,0,0,1,2,1],
        [1,1,1,0,0,1,1,1],
        [1,1,1,0,0,1,1,1],
        [1,2,1,0,0,1,2,1],
        [0,1,2,0,0,2,1,0],
        [0,0,1,0,0,1,0,0],
        [0,0,1,0,0,1,0,0],
        [0,1,2,0,0,2,1,0],
        [1,2,1,0,0,1,2,1],
        [1,1,1,0,0,1,1,1],
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
            "black", 
            "yellow"
        ];
        //activate layout
        this.performLayout(this.layout, 1)
		
		this.screen.style.backgroundColor = "grey";
    }
}

