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
	
		this.performCustomLayout(this.layOne,  					//blockmap to use
									new vector2(50,50),			//left hand marginBottom		
									new vector2(26,26), 		//spread between bricks	
									new vector2(0.5, 1.25), 	//scale
									true);						//show this set
									
		this.performCustomLayout(this.layTwo,
									new vector2(50,50),
									new vector2(26,26),
									new vector2(0.5, 1.25),
									false);
		this.leveltime = 0;
		
    }
	
	action(delta)
	{
		super.action(delta);
		/*
		for (var i = 0; i < this.bricks.length; i++)
		{
			this.bricks[ i ].move(25,0);
			this.bricks[ i ].wrap();
		}
		*/
	}
	
	rawtimer(delta)
	{
			
		for (var i = 0; i < this.bricks.length; i++)
		{
			this.bricks[ i ].move(50 * delta,0);
			this.bricks[ i ].wrap();
		}
	}
	
}

