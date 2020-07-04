/*
for Computing Pre A-Level Task 3
by Theo Stewart-Grffiths
*/

class wobble extends levelset
{

	/*
	screen	- container for scene
	bricks	- list of bricks
	tick	- time taken for each tick
	rows	- number of rows
	columns	- number of columns
	scale	- the scale of the movement (1 = 100%)
	
	t		- the current 'time'
	*/
	
	t;
	
	constructor(screen, bricks, tick, rows, columns, scale)
	{
		super(screen, bricks, tick);
		this.author = "Theo Stewart-Grffiths";
		
		this.r = rows;
		this.c = columns;
		this.scale = scale;
		
		//js uses radians for trig functions
		this.w1 = Math.PI / (this.c - 1);
		this.w2 = Math.PI / (this.r - 1);
		
		//the centre point
		this.c1 = (this.c - 1) / 2;
		this.c2 = this.r / 2;
		
		//the vertical scaling factor
		this.factor = this.c / this.r;
		
		this.initialise();
	}

	//initialises the level
	initialise()
	{
		this.setColours();
		this.rows(this.r, this.c, 1);
		this.t = 0;
		this.action(0);
	}

	//sets the colour palette for this level
	setColours()
	{
		this.screen.style.backgroundColor = "grey";
		this.colorset = [ "indigo" , "orange" , "green" ];	
	}
	
	action(delta)
	{
		super.action(delta)
		{			
			for (var i = 0; i < this.bricks.length; i++) 
			{	
				//coordinate grid
				var x = i % this.c;
				var y = Math.floor(i / this.c);
				
				//vector directions from centre to this block				
				var xc = (this.c1 - x) * 10;
				var yc = (this.c2 - y) * 10;
				
				var k = Math.sin(this.t * 10) * this.scale;
				
				//move the bricks by a small amount proportional to their distance from centre
				this.bricks[i].wave(0, xc * k, yc * k);
			}
		
		//increase the time
		this.t += delta;
		}
	}
}
/*
for Computing Pre A-Level Task 3
by Theo Stewart-Grffiths
*/

class pulse extends levelset
{

	/*
	screen	- container for scene
	bricks	- list of bricks
	tick	- time taken for each tick
	minSize	- minimum size of brick
	maxSize - maximum size of brick
	
	avgSize - the average of min and max size
	t		- the current 'time'
	*/
	
	avgSize;
	t;
	
	constructor(screen, bricks, tick, minSize, maxSize)
	{
		super(screen, bricks, tick);
		this.author = "Theo Stewart-Grffiths";
		
		this.minSize = minSize;
		this.maxSize = maxSize;
		this.avgSize = (this.minSize + this.maxSize) / 2;
		this.initialise();
	}

	//initialises the level
	initialise()
	{
		this.setColours();
		this.rows(5, 8, this.avgSize);
		this.t = 0;
		this.action(0);
	}

	//sets the colour palette for this level
	setColours()
	{
		this.screen.style.backgroundColor = "black";
		this.colorset = [ "blue" , "red" ];	
	}

	//overrides the inherited function
	action(delta)
	{
		super.action(delta)
		{
			//for every brick
			for (var i = 0; i < this.bricks.length; i++) 
			{	
				//the new scale will be the sine of the current time added
				//to the index of the brick, scaled to fit the interval
				//between the average and max/min sizes and added to the average size
				//when sine theta = -1, k = minSize
				//when sine theta =  1, k = maxSize
				var k = (Math.sin(this.t + i) * (this.maxSize - this.avgSize)) + this.avgSize;
				this.bricks[i].scale = k;
			}
		}
		
		//increase the time
		this.t += delta;
	}
}
/*
for Computing Pre A-Level Task 3
by Theo Stewart-Grffiths
*/

class ripple extends levelset
{

	/*
	screen	- container for scene
	bricks	- list of bricks
	tick	- time taken for each tick
	rows	- number of rows
	columns	- number of columns
		
	t		- the current 'time'
	*/
	
	t;
	
	constructor(screen, bricks, tick, rows, columns)
	{
		super(screen, bricks, tick);
		this.author = "Theo Stewart-Grffiths";
		this.r = rows;
		this.c = columns;
		
		//js uses radians for trig functions
		this.w1 = Math.PI / (this.c - 1);
		this.w2 = Math.PI / (this.r - 1);
		
		this.initialise();
	}

	//initialises the level
	initialise()
	{
		this.setColours();
		this.rows(this.r, this.c, 1);
		this.t = 0;
		this.action(0);
	}

	//sets the colour palette for this level
	setColours()
	{
		this.screen.style.backgroundColor = "black";
		this.colorset = [ "blue" , "red" ];	
	}
	
	action(delta)
	{
		super.action(delta)
		{			
			for (var i = 0; i < this.bricks.length; i++) 
			{	
				//coordinate grid
				var x = i % this.c;
				var y = Math.floor(i / this.c);
			
				//calculate scale in sine from 0 to 180 degrees
				//using w1 and w2
				var xc = Math.sin((this.w1 * x) + this.t);
				var yc = Math.sin((this.w2 * y) + this.t);

				//add the scale to this formula to prevent negative or excessive scaling
				this.bricks[i].scale = 0.5 + (0.2 * (xc + yc));
				
				//move the bricks by a small amount proportional to the scaling
				this.bricks[i].wave(this.t * 0.5, xc * 10, yc * 10);
			}
		
		//increase the time
		this.t += delta;
		}
	}
}

/*
creates two frames of animation supplied to the twostates class
*/
class invader2 extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,1,1,1,0],
        [0,1,3,3,3,1,1,3,3,3,1],
        [0,1,3,2,3,1,1,3,2,3,1],
        [0,1,3,3,3,1,1,3,3,3,1],
        [0,0,1,1,1,0,0,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1],
        [0,0,1,1,1,0,0,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        this.author = "Zak Tester";
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",  //0
            "yellow",  //1
			"blue",  //2
			"white",  //3
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        this.flashlayout(this.layOne, 0.7, true)
        this.flashlayout(this.layTwo, 0.7, false)
    }
}

/*
Produces a set of bricks that have their visibility controlled
in groups of columns
*/
class phased2 extends levelset{

	/* 
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - time between tick actions
	show - 	if false then one column at a time is hidden
			if true then one column at a time is displayed
	*/
	constructor(screen, bricks, timedelay, show)
	{
        super(screen, bricks,timedelay);
        this.author = "Zak Tester";
        
		this.show = show;
		this.column = 0;
		this.startup();
	}
	/* sets up the fixed rows and columns and calls the action
	routine to set the required visibility
	*/
	startup()
	{
		this.rows(7, 8, 1);
		this.action(0);
	}
	/*
	delta - fraction of a second this frame represents
	makes use of the phasedShow and phasedHide subroutines of Brick
	they really should be in here as they are to do with this and not bricks

	processes each brick and either hides or shows it depending on the active column
	*/
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++)
		{
			if (this.show)
				this.bricks[i].phasedShow(this.standardmargin.x + this.column * this.standardspread.x);
			else
				this.bricks[i].phasedHide(this.standardmargin.x + this.column * this.standardspread.x);
		}

		//use modulus to keep within the maximum number of columns
		this.column = (this.column + 1) % 8;
	}

}

/*
creates ascii character 65
using a blockmap
*/
class Bowlevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [1,0,0,0,0,0,0,1],
        [1,1,0,0,0,0,1,1],
        [1,2,1,0,0,1,2,1],
        [1,2,2,1,1,2,2,1],
        [1,2,2,1,1,2,2,1],
        [1,2,1,0,0,1,2,1],
        [1,1,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,1],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
        super(screen, bricks, 0);
        this.author = "Zak Tester";

        //colour set first colour 0 ignored
        this.colorset = [
            "black",	//0
            "red",   //1
            "yellow"		//2
        ];
        //activate layout
        this.performLayout(this.layout, 1)
    }
}

/*
creates ascii character 65
using a blockmap
*/
class Hlevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [2,2,2,0,0,2,2,2],
        [2,1,2,0,0,2,1,2],
        [2,1,2,0,0,2,1,2],
        [2,1,2,1,1,2,1,2],
        [2,1,2,2,2,2,1,2],
        [2,1,2,0,0,2,1,2],
        [2,1,2,0,0,2,1,2],
        [2,2,2,0,0,2,2,2],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
        super(screen, bricks, 0);
        this.author = "Zak Tester";
        
        //colour set first colour 0 ignored
        this.colorset = [
            "black",	//0
            "purple",   //1
            "cyan"		//2
        ];
        //activate layout
        this.performLayout(this.layout, 1)
    }
}

class mushroom extends character
{

    mushroomlay = [
        [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,2,3,3,2,1,1,1,0,0,0,0],
        [0,0,0,1,1,2,2,2,3,3,2,2,2,1,1,0,0,0],
        [0,0,1,1,3,2,2,3,3,3,3,2,2,3,1,1,0,0],
        [0,0,1,2,3,3,3,3,3,3,3,3,3,3,2,1,0,0],
        [0,1,1,2,2,3,3,2,2,2,2,3,3,2,2,1,1,0],
        [0,1,2,2,2,3,2,2,2,2,2,2,3,2,2,2,1,0],
        [0,1,2,2,2,3,2,2,2,2,2,2,3,2,2,2,1,0],
        [0,1,2,2,3,3,2,2,2,2,2,2,3,3,2,2,1,0],
        [0,1,3,3,3,3,3,2,2,2,2,3,3,3,3,3,1,0],
        [0,1,3,3,1,1,1,1,1,1,1,1,1,1,3,3,1,0],
        [0,1,1,1,1,2,2,1,2,2,1,2,2,1,1,1,1,0],
        [0,0,1,1,2,2,2,1,2,2,1,2,2,2,1,1,0,0],
        [0,0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
        [0,0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];



    constructor(screen, bricks, timedelay, toplimit, bottomlimit, pixelstep)
    {
        super(screen, bricks, timedelay);
        this.author = "Ralph McSweeney";
        this.colorset = [
            "blue",
            "black",
            "white",
            "green"
        ];
        
        this.screen.style.backgroundColor = "blue";
        this.direction = pixelstep;
        this.performCustomLayout(this.mushroomlay, 
            new vector2 (20, 30),
            new vector2(26, 26),
            new vector2 (0.5, 1.25),
            true);
            
    }

}

class pokeball extends character
{

    pokeball = [
        [0,0,0,0,0,2,2,2,2,0,0,0],
        [0,0,0,2,2,1,2,2,2,2,2,0],
        [0,0,0,2,1,1,1,2,2,2,2,0],
        [0,0,2,2,2,1,2,2,2,2,2,2],
        [0,0,2,2,2,2,0,0,2,2,2,2],
        [0,0,0,2,2,0,1,1,0,2,2,0],
        [0,0,1,0,0,0,1,1,0,0,0,1],
        [0,0,0,1,1,1,0,0,1,1,1,0],
        [0,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,1,1,1,1,0,0,0],
    ];



    constructor(screen, bricks, timedelay, toplimit, bottomlimit, pixelstep)
    {
        super(screen, bricks, timedelay);
        this.author = "Ralph McSweeney";

        this.colorset = [
            "black",
            "red",
            "white",
        ];
        
        this.screen.style.backgroundColor = "forestgreen";
        this.direction = pixelstep;
        this.performCustomLayout(this.pokeball, 
            new vector2 (50, 30),
            new vector2(26, 26),
            new vector2 (0.5, 1.25),
            true);
            
    }

}

class jumpman extends twostates{

    layOne = [
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
    ];

    layTwo = [
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,1,0,1,0,1,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,1,0,0,0],
        [0,0,1,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
    ];


	constructor(screen, bricks)
	{

        super(screen, bricks, 0.4);
        this.author = "Ralph McSweeney";
        
        this.colorset = [
            "black",
            "black",
        ];

        this.screen.style.backgroundColor = "Beige";
        this.flashlayout(this.layOne, 0.7, true)
        this.flashlayout(this.layTwo, 0.7, false)
    }



}


class smilie extends twostates{

    layOne = [
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,1,2,2,0,0,0,2,2,1,0],
        [0,1,2,3,0,0,0,3,2,1,0],
        [1,0,0,0,0,1,0,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,1,1],
        [0,1,1,1,0,0,0,1,1,1,0],
        [0,0,1,1,1,1,1,1,1,0,0],
        [0,0,0,0,1,1,1,0,0,0,0],
    ];

    layTwo = [
        [0,4,4,4,0,0,0,4,4,4,0],
        [0,4,2,2,0,0,0,2,2,4,0],
        [0,4,2,3,0,0,0,3,2,4,0],
        [4,0,0,0,0,4,0,0,0,0,4],
        [4,4,0,0,0,0,0,0,0,4,4],
        [0,4,4,4,0,0,0,4,4,4,0],
        [0,0,4,4,4,4,4,4,4,0,0],
        [0,0,0,0,4,4,4,0,0,0,0],
    ];


	constructor(screen, bricks)
	{

        super(screen, bricks, 1);
        this.author = "Ralph McSweeney";
        
        this.colorset = [
            "black",
            "purple",
            "white",
            "blue",
            "grey"
        ];

        this.screen.style.backgroundColor = "Aqua";
        this.flashlayout(this.layOne, 0.7, true)
        this.flashlayout(this.layTwo, 0.7, false)
    }



}