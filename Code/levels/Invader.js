/*
creates two frames of animation supplied to the twostates class
*/
class invader extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [0,0,1,0,0,0,0,0,1,0,0],
        [0,0,0,1,0,0,0,1,0,0,0],
        [0,0,1,1,1,1,1,1,1,0,0],
        [0,1,1,0,1,1,1,0,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,1,0,1],
        [0,0,0,1,1,0,1,1,0,0,0],
    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,0,1,0,0,0,0,0,1,0,0],
        [1,0,0,1,0,0,0,1,0,0,0],
        [1,0,1,1,1,1,1,1,1,0,1],
        [1,1,1,0,1,1,1,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,0,1,0,0,0,0,0,1,0,0],
        [0,1,0,0,0,0,0,0,0,1,0],
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",
            "cyan",
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        this.flashlayout(this.layOne, 0.7, true)
        this.flashlayout(this.layTwo, 0.7, false)
    }
}

