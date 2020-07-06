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

/*
displaces the standard brick layout into circular rotating layouts
*/
class Ultimate extends levelset{
	/*
	screen - container reference for sprite placement
	bricks - list that will hold each of the bricks for the level
	timedelay - how often to call the action subroutine
	funky - if true then rotation phase is altered so we get non circular motion
	omega - amount to adjust the phase of the rotation by each frame
	*/
	constructor(screen, bricks, timedelay, funky, omega)
	{
        super(screen, bricks,timedelay);
        this.author = "Rachel Balogun";
		this.angle = 0;
		this.funky = funky;
		this.omega = omega;
		this.startup();
	}

	/*
	layout bricks then displace using rotation code so they assume correct layout
	*/
	startup()
	{
		this.angle = 1;
		this.rows(5, 11, 0.6);
		this.action(0);
	}
	/*
	delta - fraction of a second this frame represents
	works through each brick and displaces it around a circle layout
	if funky is true then we add an additional phase offset for a weird effect
	*/
	action(delta)
	{
		for (var i = 0; i < this.bricks.length; i++) {
			if (this.funky)
				this.bricks[i].rotate(this.angle, 3.6245 * Math.sin(this.angle), -1.25 * Math.sin(this.angle + 3), 2, -50);
			else
				this.bricks[i].rotate(this.angle, 4.25 , -1.25 , 0, -50);
		}
        this.angle += this.omega * delta;
        
	}
}

/*
creates ascii character 65
using a blockmap
*/
class SpecialLevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [0,0,0,0,0,0,0],
        [0,1,2,0,1,2,0],
        [0,2,2,0,2,2,0],
        [0,2,2,0,2,2,0],
        [0,0,0,0,0,0,0],
        [0,0,0,3,0,0,0],
        [0,4,0,0,0,4,0],
        [0,0,4,1,4,0,0],
        [0,0,0,4,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,1,1,0,4,4,4],
        [0,2,0,0,0,3,0],
        [0,2,0,0,0,3,0],
    
       
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks,timedelay,depth)
	{
		//call base constructor - don't use a timer subsystem
        super(screen, bricks,timedelay,depth);
        this.author = "Rachel Balogun";
        
        //colour set first colour 0 ignored
        this.colorset = [
            "magenta",
            "orchid",
            "gold",
            "purple",
            "teal"
        ];
        //activate layout
        this.performLayout(this.layout, 1)
        this.screen.style.backgroundColor = "navy"
    }
}

/*
creates ascii character 65
using a blockmap
*/
class mushroom2 extends character{

    /* the rows and columns of colour for the block map*/
    mush = [
        [0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0],
        [0,0,0,4,4,4,1,2,2,1,4,4,4,0,0,0,0],
        [0,0,4,4,1,1,1,2,2,1,1,1,4,4,0,0,0],
        [0,4,4,2,1,1,2,2,2,2,1,1,2,4,4,0,0],
        [0,4,1,2,2,2,2,2,2,2,2,2,2,1,4,0,0],
        [4,4,1,1,2,2,1,1,1,1,2,2,1,1,4,4,0],
        [4,1,1,1,2,1,1,1,1,1,1,2,1,1,1,4,0],
        [4,1,1,1,2,1,1,1,1,1,1,2,1,1,1,4,0],
        [4,1,1,2,2,1,1,1,1,1,1,2,2,1,1,4,0],
        [4,2,2,2,2,2,1,1,1,1,2,2,2,2,2,4,0],
        [4,2,2,4,4,4,4,4,4,4,4,4,4,2,2,4,0],
        [4,4,4,4,1,1,4,1,1,4,1,1,4,4,4,4,0],
        [0,4,4,1,1,1,4,1,1,4,1,1,1,1,4,4,0],
        [0,0,4,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
        [0,0,4,4,1,1,1,1,1,1,1,1,1,4,4,0,0],
        [0,0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,0],
        
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
        super(screen, bricks, 0);
        this.author = "Joshua Fernandes";
        
        //colour set first colour 0 ignored
        this.colorset = [
            "black",
            "Linen",
            "red",
            "green"
        ];
        //activate layout
       
        this.performCustomLayout(this.mush,               //blockmap
            new vector2(50,50),     // left hand marginbottom
            new vector2 (20,20),    //spread
            new vector2 (0.5,1.25),  // scale
            true);
        this.screen.style.backgroundColor = "white"
    }
}

/*
creates two frames of animation supplied to the twostates class
*/
class mario extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,3,3,3,2,2,3,2,0,0,0],
        [3,2,3,2,2,2,3,2,2,2,0],
        [3,2,3,3,2,2,2,3,2,2,2],
        [3,3,2,2,2,2,3,3,3,3,0],
        [0,0,2,2,2,2,2,2,2,0,0],
        [0,3,3,3,1,3,3,0,0,0,0],
        [3,3,3,3,1,1,3,3,0,0,0],
        [3,3,3,1,1,2,1,1,0,0,0],
        [3,3,3,3,1,1,1,1,0,0,0],
        [1,3,3,2,2,1,1,1,0,0,0],
        [0,1,3,2,2,1,1,0,0,0,0],
        [0,0,1,1,1,3,3,3,0,0,0],
        [0,0,3,3,3,3,0,0,0,0,0],
    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1],
        [0,3,3,3,2,2,3,2,0,0,0],
        [3,2,3,2,2,2,3,2,2,2,0],
        [3,2,3,3,2,2,2,3,2,2,2],
        [3,3,2,2,2,2,3,3,3,3,0],
        [0,0,2,2,2,2,2,2,2,0,0],
        [0,0,0,3,3,1,1,3,0,0,0],
        [0,0,3,3,3,3,1,3,2,2,0],
        [0,2,2,3,3,3,3,3,2,2,2],
        [2,2,2,1,3,3,3,3,2,2,0],
        [0,3,3,1,1,1,1,1,1,0,0],
        [0,3,1,1,1,1,1,1,1,0,0],
        [3,3,1,0,0,1,1,1,0,0,0],
        [3,0,0,0,0,3,3,3,0,0,0],
        [0,0,0,0,0,0,3,3,3,0,0],
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
        super(screen, bricks, 0.5);
        this.author = "Joshua Fernandes";
        
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",
            "red",
            "BurlyWood",
            "DarkOliveGreen",
            "white"

        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        //this.flashlayout(this.layOne, 2, true)
        //this.flashlayout(this.layTwo,2, false)
    
    
        this.performCustomLayout(this.layOne,               //blockmap
                                    new vector2(50,50),     // left hand marginbottom
                                    new vector2 (20,20),    //spread
                                    new vector2 (0.5,1.25),  // scale
                                    true);

        this.performCustomLayout(this.layTwo,
                                    new vector2(50,50),
                                    new vector2 (20,20),
                                    new vector2 (0.5,1.25),
                                    false);
      
                                    
        this.leveltime = 0;
    
    

    }
    action(delta)
    
    {
        super.action(delta);
        /*
        for(var i = 0; i < this.bricks.length; i++)
        {
            this.bricks[ i ].move(+25,0);
            this.bricks[ i ].wrap();
        }
        */
    }   
    
    rawtimer(delta)
    {
        
            for(var i = 0; i < this.bricks.length; i++)
            {
                this.bricks[ i ].move(20*delta,1);
                this.bricks[ i ].wrap();
            }
        

    }
}

/* 
this is what the level does
*/
class maze extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [2,2,2,2,2,2,2,2],
        [1,0,0,0,0,0,0,1],
        [2,0,2,2,2,2,0,2],
        [1,0,1,0,0,1,0,1],
        [2,0,2,2,0,2,0,2],
        [1,0,1,1,0,1,0,1],
        [2,0,2,2,0,2,0,2],
        [1,0,1,1,0,1,0,1],
        [2,0,2,2,0,2,0,2],
        [1,0,0,0,0,1,0,1],
        [2,2,2,2,2,2,0,2],
         
    ];

    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
   constructor(screen, bricks)
   {
       //call base constructor - don't use a timer subsystem
       super(screen, bricks, 0);
       this.author = "Joe Nelson";

       //colour set first colour 0 ignored
       this.colorset = [
           "black",
           "red",
           "blue"
       ];
       //activate layout
       this.performLayout(this.layout, 1)
   }

}


/*
chance of powerups dropping from bricks
*/
class poweruplvl extends standard{

    constructor(screen, bricks, rows, cols, size)
	{
		//call base constructor - have to do this before accessing member variables
		super(screen, bricks, 8, 8, 1);
		//place a row column brick layout
		this.rows(rows, cols, size);
	}
}


/*
creates ascii character 65
using a blockmap

*/
class targetlevel extends character{

    layout = [
        [1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,1],
        [1,2,3,3,3,3,2,1],
        [1,2,3,4,4,3,2,1],
        [1,2,3,4,4,3,2,1],
        [1,2,3,3,3,3,2,1],
        [1,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
        super(screen, bricks, 0);
        this.author = "Jacob Bryant";
        
        //colour set first colour 0 ignored
        this.colorset = [
            "#000000",
            "#ffffff",
            "#2dcfb9",
            "#eb1515",
            "#ebd515"
        ];
        //activate layout
        this.performLayout(this.layout, 1)

        this.screen.style.backgroundColor = "black"
    }
}

//A two frame animation of pacman. 

class Jacob_Level extends twostates{

    //creating the shape that will be shown on the screen for the first frame
    layOne = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,4,0,0,3,4,0,0,3,4],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,4,0,0,3,4,0,0,3,4],
        [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,2,2,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    ];

    //creating the shape that will be shown on the screen for the second frame
    layTwo = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,3,4,0,0,3,4,0,0,3,4,0,0,3,4],
        [2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,3,4,0,0,3,4,0,0,3,4,0,0,3,4],
        [2,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,2,2,2,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    ];

	constructor(screen, bricks)
	{
        super(screen, bricks, 1);
        this.author = "Jacob Bryant";

        //selecting the colours for the level
        this.colorset = [
            "black",
            "#faf43c",
            "#d9d325",
            "#f291e0",
            "#c977ba"           
        ];

        //drawing the shapes from the pattern for frame one
        this.performCustomLayout(this.layOne, 
                                    new vector2(50,50), 
                                    new vector2(13,13), 
                                    new vector2(0.25, 0.625), 
                                    true); 
        
        //drawing the shapes from the pattern for frame two                            
        this.performCustomLayout(this.layTwo, 
                                    new vector2(50,50), 
                                    new vector2(13,13), 
                                    new vector2(0.25, 0.625), 
                                    false);

        this.screen.style.backgroundColor = "grey"
    }

    action(delta)
    {
        super.action(delta)
        for (var i = 0; i < this.bricks.length; i++)
        {
            this.bricks[ i ].move(52,0)
            this.bricks[ i ].wrap();
        }
    }
}

/*
creates ascii character 65
using a blockmap
*/
class myLevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [1,1,3,3,3,3,1,1],
        [1,1,3,2,2,3,1,1],
        [1,1,3,2,2,3,1,1],
        [3,3,3,2,2,3,3,3],
        [1,3,2,2,2,2,3,1],
        [1,1,3,2,2,3,1,1],
        [1,1,1,3,3,1,1,1],
        [1,1,1,3,3,1,1,1],
		[1,1,1,1,1,1,1,1],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
		super(screen, bricks, 0);
        this.author = "Hugh O'Grady";
        //colour set first colour 0 ignored
        this.colorset = [
            "black",
            "black",
            "red",
			"white",
        ];
        //activate layout
        this.performLayout(this.layout, 1)
		this.screen.style.backgroundColor = "gray";
    }
}

/*
creates two frames of animation supplied to the twostates class
*/
class myLevel2 extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [1,3,2,2,2,2,2,2,3,3,1],
        [1,3,2,2,2,2,2,2,3,1,0],
        [0,1,3,2,2,2,2,2,3,1,0],
        [0,1,3,2,2,2,2,2,3,1,0],
        [0,1,1,3,3,3,2,3,1,0,0],
        [0,0,0,1,1,3,3,3,1,0,0],
        [0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
    ];
    //blockmap for animation frame 2
    layTwo= [
        [1,3,2,2,2,2,2,2,3,3,1],
        [1,3,2,2,2,2,2,2,3,1,0],
        [0,1,3,2,2,2,2,2,3,1,0],
        [0,1,3,2,2,2,2,2,3,1,0],
        [0,1,1,3,3,3,2,3,1,0,0],
        [0,0,0,1,1,3,3,3,1,0,0],
        [0,0,0,0,0,1,1,1,0,0,0],
        [4,4,4,4,4,4,4,4,4,4,4],
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        this.author = "Hugh O'Grady";
        
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",
            "red",
			"yellow",
			"orange",
			"blue",
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        this.flashlayout(this.layOne, 0.7, true)
        this.flashlayout(this.layTwo, 0.7, false)
    }
}

/*
creates two frames of animation supplied to the twostates class
*/
class myLevel3 extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [1,1,1,1,1,1,1,1,],
        [1,1,0,0,0,0,1,1,],
        [1,1,0,0,0,0,1,1,],
        [1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,],
    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
	    [0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        this.author = "Hugh O'Grady";
        
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",
            "blue",
			"white",
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        this.flashlayout(this.layOne, 1.0, true)
        this.flashlayout(this.layTwo, 0.3, false)
    }
}

/*
creates two frames of animation supplied to the twostates class
*/
class myLevel4 extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [1,1,1,1,1,1,1,1,],
        [1,1,0,0,0,0,1,1,],
        [1,1,0,0,0,0,1,1,],
        [1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,],
    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,2],
	    [0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        this.author = "Hugh O'Grady";
        
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",
            "blue",
			"white",
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        this.flashlayout(this.layOne, 1.0, true)
        this.flashlayout(this.layTwo, 0.3, false)
    }
}


/*
creates two frames of animation supplied to the twostates class
*/
class butterfly extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [0,0,0,0,0,0,0,0,0,0,0],
		[0,1,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,1,0,0,0],
		[0,1,1,1,0,0,1,1,1,0,0],
		[1,2,3,1,1,1,1,3,2,1,0],
		[1,3,2,3,1,1,3,2,3,1,0],
		[1,2,3,1,1,1,1,3,2,1,0],
		[0,1,1,3,1,1,3,1,1,0,0],
		[1,2,2,3,1,1,3,2,2,1,0],
		[1,2,2,1,0,0,1,2,2,1,0],
		[0,1,1,0,0,0,0,1,1,0,0],
    ];
    //blockmap for animation frame 2
    layTwo= [
	
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,1,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,1,0,0,0],
		[0,1,1,1,0,0,1,1,1,0,0],
		[1,2,3,1,1,1,1,3,2,1,0],
		[1,3,2,3,1,1,3,2,3,1,0],
		[1,2,3,1,1,1,1,3,2,1,0],
		[0,1,1,3,1,1,3,1,1,0,0],
		[1,2,2,3,1,1,3,2,2,1,0],
		[1,2,2,1,0,0,1,2,2,1,0],
		[0,1,1,0,0,0,0,1,1,0,0],
		
		

       
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        this.author = "Harriet Lepar";
        
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black",
            "cyan",
			"white",
			"purple",
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        
	
		this.performCustomLayout(this.layOne, 
									new vector2 (50,0),//number of pixels from the left hand side. 
									new vector2 (30,30),//25 x 25 bricks.
									new vector2 (0.1,1),// scale so 50% less than the standard measurements, and 25% more in height. 
									true); // true means the image can be seen, so the animation starts with this. 
							
							
							
		this.performCustomLayout(this.layTwo, 
									new vector2 (200,150),//same as above
									new vector2 (30,30),
									new vector2 (0.1,1),// 90% less, 100% more.
									false);// false means the image can't be seen, so the layout one transitions into this one. 
							
							
							
    }
	
	
		/*action(delta)
		{
			super.action(delta); 							// calling an action from another .js file.
			for (var i = 0; i < this.bricks.length; i++)	//for each brick there is..
			{												 
				this.bricks[i].move(-25,0); 					//move them 25 pixels to the left. Use positive for right.
				this.bricks[i].wrap();
			}

		}
	
	*/
	
	
	
}

/*
I volunteer for a young girls charity called Girls Brigade
in Hextable, and for one of my custom layouts, I created
the logo for the charity. 
*/
class gblogo extends character{

    /* the rows and columns of colour for the block map*/
    awesomeness = [
        [0,0,0,0,0,4,4,0,0,0,0,0,0],
		[0,0,0,0,4,4,4,4,0,0,0,0,0],
		[0,0,0,4,4,4,4,4,4,0,0,0,0],
		[0,0,0,0,4,4,4,4,0,0,0,0,0],
		[0,0,0,0,2,2,2,2,0,0,0,0,0],
		[0,0,0,2,4,4,4,4,2,0,0,0,0],
        [0,0,2,1,1,3,3,1,1,2,0,0,0],
		[0,2,1,1,1,3,3,1,1,1,2,0,0],
		[0,2,1,1,1,3,3,1,1,1,2,0,0],
		[0,2,3,3,3,3,3,3,3,3,2,0,0],
		[0,2,3,3,3,3,3,3,3,3,2,0,0],
		[0,2,1,1,1,3,3,1,1,1,2,0,0],
		[0,2,1,1,1,3,3,1,4,1,2,0,0],
		[0,2,1,1,1,3,3,1,1,4,2,0,0],
		[0,2,1,1,1,4,4,1,1,4,2,0,0],
		[0,0,2,4,4,4,4,4,4,2,0,0,0],
	    [0,0,0,2,2,4,4,2,2,0,0,0,0],	
		[0,0,0,0,2,2,2,2,0,0,0,0,0],
		
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
		super(screen, bricks, 0);
        this.author = "Harriet Lepar";
        //colour set first colour 0 ignored
        this.colorset = [
			"black",
			"red",
            "midnightblue",
            "white",
			"yellow",
			
        ];
        //activate layout
        //this.performLayout(this.layout, 1)
		
		this.performCustomLayout(this.awesomeness, 
									new vector2 (100,50),//same as above
									new vector2 (26,26),
									new vector2 (0.5,1.25),
									true);
		
		
		this.screen.style.backgroundColor = "rosybrown"
    }
}

/*
creates ascii character 65
using a blockmap
*/
class hlevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [0,2,1,0,0,1,2,0],
		[0,1,2,0,0,2,1,0],
		[0,2,1,0,0,1,2,0],
		[0,1,2,0,0,2,1,0],
		[0,2,1,0,0,1,2,0],
		[0,1,2,0,0,1,1,0],
		[0,2,2,1,1,2,2,0],
		[0,1,1,2,2,1,1,0],
		[0,2,2,1,1,2,2,0],
		[0,1,2,0,0,2,1,0],
		[0,2,1,0,0,1,2,0],
		[0,1,2,0,0,2,1,0],
		[0,2,1,0,0,1,2,0],
		[0,1,2,0,0,2,1,0],
		[0,2,1,0,0,1,2,0],
		[0,1,2,0,0,2,1,0],
        
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
		super(screen, bricks, 0);
        this.author = "Harriet Lepar";
        //colour set first colour 0 ignored
        this.colorset = [
		
            "white",
            "red",
            "white",
			
        ];
        //activate layout
        this.performLayout(this.layout, 1)
		this.screen.style.backgroundColor = "cornflowerblue"
    }
}


/*
creates two frames of animation supplied to the twostates class
*/
class link extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
        [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
        [0,0,1,0,3,2,2,2,2,2,2,3,0,1,0,0],
        [0,0,1,0,2,2,2,2,2,2,2,2,0,1,0,0],
        [0,0,1,1,2,1,3,1,1,3,1,2,1,1,0,0],
        [0,0,1,1,2,1,2,1,1,2,1,2,1,1,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,0,0,3,3,1,1,2,2,1,1,3,3,3,2,0],
        [0,2,2,2,2,1,1,1,1,1,1,3,3,2,2,2],
        [2,2,1,2,2,2,3,3,3,3,3,3,3,1,2,2],
        [2,1,1,1,2,2,2,2,2,3,3,3,1,1,1,2],
        [2,2,1,2,2,2,1,1,2,2,2,2,2,1,1,1],
        [2,2,1,2,2,2,1,2,2,3,3,3,3,3,1,0],
        [2,2,2,2,2,2,1,3,3,3,3,3,0,0,0,0],
        [0,1,1,1,1,1,2,0,0,2,2,2,0,0,0,0],
        [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0],



    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
        [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
        [0,0,1,0,3,2,2,2,2,2,2,3,0,1,0,0],
        [0,0,1,0,2,2,2,2,2,2,2,2,0,1,0,0],
        [0,0,1,1,2,1,3,1,1,3,1,2,1,1,0,0],
        [0,0,1,1,2,1,2,1,1,2,1,2,1,1,0,0],
        [0,0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,0,2,3,3,1,1,2,2,1,1,3,3,3,2,0],
        [2,2,2,2,3,1,1,1,1,1,1,3,3,2,2,2],
        [2,2,1,3,3,3,3,3,3,3,3,3,3,1,2,2],
        [1,1,1,1,3,3,2,2,2,3,3,3,1,1,1,2],
        [0,1,1,1,2,2,2,3,2,2,2,2,2,1,1,1],
        [0,1,1,1,3,3,2,2,2,3,3,3,3,3,1,0],
        [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
        [0,0,0,0,2,2,2,0,0,2,2,2,0,0,0,0],
        [0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0],

    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 1);
        this.author = "Harvey Pickett";
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "black", // 0 
            "burlywood", // 1
            "sienna", // 2
            "darkgreen", // 3
            "white", // 4

        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
        this.performCustomLayout(this.layOne, 
                                    new vector2(50,50),  
                                    new vector2(26,26), 
                                    new vector2(0.5, 1.25), 
                                    true);

        this.performCustomLayout(this.layTwo, 
                                    new vector2(50,50),  
                                    new vector2(26,26), 
                                    new vector2(0.5, 1.25), 
                                    false);


    }
    
    action(delta)
    {
        super.action(delta);
            /*
            for (var i = 0; i < this.bricks.length; i++)
            {
                this.bricks[ i ].move(25,0,);
                this.bricks [ i ].wrap();
            }
            */
    }
    
    rawtimer(delta)
    {
        for (var i = 0; i < this.bricks.length; i++)
        {
            this.bricks[ i ].move(25 * delta,0,);
            this.bricks [ i ].wrap();
        }
    }
}

/*
creates ascii character 65
using a blockmap
*/
class customlevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [1,0,1,2,2,3,0,3],
        [1,0,1,2,0,3,3,3],
        [1,1,1,2,2,0,3,0],
        [1,0,1,2,0,0,3,0],
        [1,0,1,2,2,0,3,0],
        [0,4,0,5,0,6,0,7],
        [4,0,4,5,0,6,0,7],
        [4,4,4,5,0,6,0,7],
        [4,0,4,5,0,6,0,0],
        [4,0,4,5,5,6,6,7],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
		super(screen, bricks, 0);
        this.author = "Grace Bazneh";
        //colour set first colour 0 ignored
        this.colorset = [
            "black", //0
            "#FFA8D3", //1
            "#FFBB7D", //2
            "#FFFF84", //3
            "#72FE95", //4
            "#75D6FF", //5
            "#C79BF2", //6
            "#FFFFFF" //7        
        ];
        //activate layout
        this.performLayout(this.layout, 1)

        this.screen.style.backgroundColor = "#BCB4F3";
    }
}

/*
creates two frames of animation supplied to the twostates class
*/
class movinglevel extends twostates{
    //blockmap for animation frame 1
    layOne = [
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,0,0,0,0,0,0,0],
        [0,4,1,1,4,0,0,0,0,0,0,0],
        [0,1,3,3,1,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,0,0,0,0,0,0,0],
        [1,2,2,2,2,1,0,0,0,0,0,0],
        [1,2,2,2,2,1,0,0,0,0,0,0],
        [1,1,1,1,1,1,0,0,0,0,0,0],
        [0,3,0,0,3,0,0,0,0,0,0,0],
        
        
    ];
    //blockmap for animation frame 2
    layTwo= [
        [0,3,0,0,3,0,0,0,0,0,0,0],
        [5,5,5,5,5,5,0,0,0,0,0,0],
        [5,2,2,2,2,5,0,0,0,0,0,0],
        [5,2,2,2,2,5,0,0,0,0,0,0],
        [0,5,5,5,5,0,0,0,0,0,0,0],
        [0,0,5,5,0,0,0,0,0,0,0,0],
        [0,5,5,5,5,0,0,0,0,0,0,0],
        [0,5,3,3,5,0,0,0,0,0,0,0],
        [0,4,5,5,4,0,0,0,0,0,0,0],
        [0,5,5,5,5,0,0,0,0,0,0,0],
        [0,0,5,5,0,0,0,0,0,0,0,0],
        
    ];
    layThree= [
        [0,0,0,0,0,0,0,3,0,0,3,0],
        [0,0,0,0,0,0,1,1,1,1,1,1],
        [0,0,0,0,0,0,1,2,2,2,2,1],
        [0,0,0,0,0,0,1,2,2,2,2,1],
        [0,0,0,0,0,0,0,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,1,0],
        [0,0,0,0,0,0,0,1,3,3,1,0],
        [0,0,0,0,0,0,0,4,1,1,4,0],
        [0,0,0,0,0,0,0,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,1,1,0,0],
    ];
    layFour= [
        [0,0,0,0,0,0,0,0,5,5,0,0],
        [0,0,0,0,0,0,0,5,5,5,5,0],
        [0,0,0,0,0,0,0,4,5,5,4,0],
        [0,0,0,0,0,0,0,5,3,3,5,0],
        [0,0,0,0,0,0,0,5,5,5,5,0],
        [0,0,0,0,0,0,0,0,5,5,0,0],
        [0,0,0,0,0,0,0,5,5,5,5,0],
        [0,0,0,0,0,0,5,2,2,2,2,5],
        [0,0,0,0,0,0,5,2,2,2,2,5],
        [0,0,0,0,0,0,5,5,5,5,5,5],
        [0,0,0,0,0,0,0,3,0,0,3,0],
    ];

    /*
	screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks) //timedelay, toplimit, bottomlimit, pixelstep)
	{
		//call base constructor - animate once a second
        super(screen, bricks, 0.7);
        this.author = "Grace Bazneh";
        //set coloour (first colour 0 ignored)
        this.colorset = [
            "cyan", //0
            "black", //1
            "white", //2
            "#FFAB60", //3
            "#2F74D0", //4
            "#FFFF84" //5
        ];
        //generate two sets of bricks for flashing so only one
        //set on at once (does animation)
        //shrink as there are more than a width's amount of bricks
       
       // this.flashlayout(this.layOne, 0.65, true) +
        
        //this.flashlayout(this.layOne, 0.5, false)
        //this.flashlayout(this.layTwo, 0.5, true)
      
        //  this.flashlayout(this.layTwo, 0.65, false) +
       
       //  this.flashlayout(this.layThree, 0.65, true) +
       
       //this.flashlayout(this.layThree, 0.5, false)
        //this.flashlayout(this.layFour, 0.5, true)
       
       // this.flashlayout(this.layFour, 0.66, false) +
       
       //this.direction = pixelstep;
    
       this.performCustomLayout(this.layOne, new vector2(50,50), new vector2(26,26), new vector2(0.55, 1.28), true);
       this.performCustomLayout(this.layTwo, new vector2(50,50), new vector2(26,26), new vector2(0.55, 1.28), false);
       this.performCustomLayout(this.layThree, new vector2(120,50), new vector2(26,26), new vector2(0.55, 1.28), true);
       this.performCustomLayout(this.layFour, new vector2(120,50), new vector2(26,26), new vector2(0.55, 1.28), false);
       
       this.framecount = 0;

       this.screen.style.backgroundColor = "#62D0FF";
    }
    action(delta)
    {
        super.action(delta);
        /*
        for(var i = 0; i < this.bricks.length; i++)
        {
           this.bricks[i].move(17,0);
           this.bricks[i].wrap();
           //this.bricks[i].scroll(this.offset.multiply(delta));
           //this.bricks[i].wrap();
        }
*/
    }

    rawtimer(delta)
    {
        this.framecount++;
        if (this.framecount >= 2)
        {
            this.framecount = 0.5;
            
            for(var i = 0; i < this.bricks.length; i++)
            {
                this.bricks[i].move(4.5,0);
                this.bricks[i].wrap();
           
             }
        }
    
    }
}


/*
creates ascii character 65
using a blockmap
*/
class clevel extends character{

    /* the rows and columns of colour for the block map*/
    layout = [
        [0,0,0,1,1,1,0,0],
        [0,0,1,2,2,2,0,0],
        [0,1,2,0,0,0,0,0],
        [0,1,2,0,0,0,0,0],
        [0,1,2,0,0,0,0,0],
        [0,0,1,2,2,2,0,0],
        [0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0],
    ];
    
    /*
    screen - container reference for sprite placement
    bricks - list that will hold each of the bricks for the level
    */
	constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
        super(screen, bricks, 0);
        this.author = "Callum Tooke";
        //colour set first colour 0 ignored
        this.colorset = [
            "black",
            "red",
            "blue"
        ];
        //activate layout
        this.performLayout(this.layout, 1)
		
		this.screen.style.backgroundColor = "orange";
    }
}

class bars extends character{
	
	rainbow = [
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	[0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
	
	
	];
	
	
	
	constructor(screen, bricks, timedelay, toplimit, bottomlimit, pixelstep)
	{
		super(screen, bricks, timedelay);
		this.author = "Callum Tooke";
		this.colorset = [
		    "black",
			"red",
			"yellow",
			"orange",
 
 
		
		];
	     
		this.direction = pixelstep;
		this.performCustomLayout(this.rainbow,
		                        new vector2(50, 75),
								new vector2(26,26),
								new vector2(0.5,1.25),
								true);
	}
	
}


class balloons extends twostates{
    layOne = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,4,4,4,5,5,5,4,4,4,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,4,5,5,5,5,5,5,5,5,5,4,0,0,0,0,0,0],
    [0,0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0,0],
    [0,0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0,0],
    [0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0],
    [0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0],
    [0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0],
    [0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0],
    [0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0],
    [0,0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0,0],
    [0,0,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,4,0,0,0,0,0],
    [0,0,0,0,0,0,4,5,5,5,5,5,5,5,5,5,4,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,4,4,5,5,5,5,5,4,4,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,4,5,5,5,4,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,4,5,5,5,4,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0],	

];

layTwo= [

    [0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],	
    [0,0,0,1,6,6,1,1,6,6,1,0,0,0,0,0,0,1,1,1,0,0,0],	
    [0,0,0,1,6,3,6,6,3,3,6,1,0,0,0,1,1,6,6,6,1,1,0],	
    [0,0,0,1,6,3,3,3,3,3,6,1,0,0,1,6,6,3,3,3,6,1,0],	
    [0,0,1,6,3,3,3,3,3,3,3,6,1,0,1,6,3,3,3,3,6,1,0],	
    [0,0,1,6,3,3,3,3,3,3,3,6,1,0,1,6,3,3,3,3,6,1,0],	
    [0,0,0,1,6,3,3,3,3,3,3,3,6,1,6,3,3,3,3,6,1,0,0],
    [0,0,0,0,1,6,3,3,3,3,3,3,3,6,3,3,3,3,6,1,0,0,0],
    [0,0,0,0,1,1,6,3,3,3,3,3,3,3,3,3,3,6,1,0,0,0,0],
    [0,0,1,1,6,3,3,3,3,3,3,3,3,3,3,3,3,6,1,1,0,0,0],
    [0,1,6,6,3,3,0,0,0,3,0,0,0,3,0,0,0,3,6,6,1,0,0],
    [1,6,3,3,3,3,0,3,0,3,0,3,0,3,0,3,0,3,3,3,6,1,0],
    [1,6,3,3,3,3,0,0,0,3,0,3,0,3,0,0,0,3,3,3,3,6,1],
    [0,1,6,3,3,3,0,3,3,3,0,3,0,3,0,3,3,3,3,3,3,6,1],
    [0,0,1,6,3,3,0,3,3,3,0,0,0,3,0,3,3,3,3,3,6,1,0],
    [0,0,0,1,6,3,3,3,3,3,3,3,3,3,3,3,3,3,6,6,1,0,0],
    [0,0,0,0,1,6,3,3,3,3,3,3,3,3,3,3,3,6,1,6,1,0,0],
    [0,0,0,0,1,6,3,3,3,3,3,3,3,3,3,3,3,3,6,1,0,0,0],
    [0,0,1,1,6,3,3,3,3,3,3,3,3,3,3,3,3,3,6,1,0,0,0],
    [0,1,6,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6,1,0,0],
    [0,1,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6,1,0],
    [1,6,3,3,3,3,3,3,3,3,3,6,3,3,3,3,3,3,3,3,6,1,0],
    [1,6,3,3,3,3,3,3,3,6,6,1,6,3,3,3,3,3,3,3,3,6,1],
    [1,6,3,3,3,3,3,3,6,1,1,0,1,6,3,3,3,3,3,3,3,6,1],
    [0,1,6,3,3,3,6,6,1,1,0,0,0,1,6,3,3,3,3,3,3,6,1],
    [0,0,1,6,6,6,1,1,0,0,0,0,0,0,1,6,6,3,3,3,3,6,1],
    [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,6,6,6,6,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
constructor(screen, bricks)

    {
    
    super(screen, bricks, 1);
    this.author = "Beatrice Manicardi";
   
    this.colorset = [
        "black",   //0
        "firebrick",    //1
        "blue",    //2
        "yellow",   //3
        "white",   //4
        "darkmagenta", //5
        "orange", //6
    ];

    
    this.performCustomLayout(this.layOne,               //blockmap to use
                                new vector2(150,100),     //lefthand margin
                                 new vector2(10,10),	    //spread between bricks		
                                new vector2(0.1,0.5),  //scale
                                true);                  //visibility
                                
    this.performCustomLayout(this.layTwo,
                                 new vector2(150,125),
                                 new vector2(10,10),
                                 new vector2(0.1,0.5),
                                 false);
                                 
    this.framecount = 0;							 
}
action(delta)
{
    super.action(delta);
    /*for (var i = 0; i  < this.bricks.length; i++)
    {
        this.bricks[i].move(-30,0)
        this.bricks[i].wrap();
    }*/
}
rawtimer(delta)
{
    this.framecount++;
    
    if (this.framecount >= 2)
    {
        this.framecount = 0;
        for (var i = 0; i  < this.bricks.length; i++)
        {
            this.bricks[i].move(100*delta,0);
            this.bricks[i].wrap();
        }
    }
}
}


class supermario extends character {
	
	mushroom = [
	[0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0],
	[0,0,0,0,4,4,1,1,1,1,1,1,4,4,0,0,0,0],
	[0,0,0,4,1,1,3,3,3,3,2,2,1,1,4,0,0,0],
	[0,0,4,1,2,2,3,3,3,3,2,2,2,2,1,4,0,0],
	[0,4,1,2,2,3,3,3,3,3,3,2,2,2,2,1,4,0],
	[0,4,1,2,3,3,2,2,2,2,3,3,2,2,2,1,4,0],
	[4,1,3,3,3,2,2,2,2,2,2,3,3,3,3,3,1,4],
	[4,1,3,3,3,2,2,2,2,2,2,3,3,2,2,3,1,4],
	[4,1,2,3,3,2,2,2,2,2,2,3,2,2,2,2,1,4],
	[4,1,2,2,3,3,2,2,2,2,3,3,2,2,2,2,1,4],
	[4,1,2,2,3,3,3,3,3,3,3,3,3,2,2,3,1,4],
	[4,1,2,3,3,1,1,1,1,1,1,1,1,3,3,3,1,4],
	[0,4,1,1,1,2,2,1,2,2,1,2,2,1,1,1,4,0],
	[0,0,4,1,2,2,2,1,2,2,1,2,2,2,1,4,0,0],
	[0,0,4,1,2,2,2,2,2,2,2,2,2,2,1,4,0,0],
	[0,0,0,4,1,2,2,2,2,2,2,2,2,1,4,0,0,0],
	[0,0,0,0,4,1,1,1,1,1,1,1,1,4,0,0,0,0],
	[0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0],
	
	];
	
	constructor(screen, bricks, timedelay, toplimit, bottomlimit, pixelstep)
	{
		super(screen, bricks, timedelay)
        this.author = "Beatrice Manicardi";
		
		this.colorset = [
		  "pink",
		  "black",
		  "white",
		  "red",
		  "green",
	    ];
		this.screen.style.backgroundColor = "darkslateblue";
		this.direction = pixelstep;
		this.botlimit = bottomlimit;
		this.toplimit = toplimit;
		this.performCustomLayout(this.mushroom,
		                           new vector2(120,75),
								   new vector2(16,16),
								   new vector2(0.3,0.75),
								   true);
	}
	action(delta)
	{
		var change = false;
		
		for (var i = 0; i < this.bricks.length; ++i)
		{
			if (!this.bricks[i].dead)
			{
				this.bricks[i].move(0,this.direction);
				if (this.bricks[i].bottom>this.botlimit && this.direction>0 || 
					this.bricks[i].top< this.toplimit && this.direction< 0)
					change = true;
			}
		}
		//all bricks now moved check for direction change 
		if (change)
		{
			this.direction*= -1;
		}
	}
}


class monsters extends twostates{ 

    layOne = [
		
	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
	    [0,0,1,2,2,1,0,0,0,0,0,0,0,1,2,2,1,0,0],
        [0,1,2,2,1,0,0,1,1,1,1,1,0,0,1,2,2,1,0],
        [0,1,2,2,1,1,1,5,2,2,2,5,1,1,1,2,2,1,0],
        [0,0,1,2,2,2,2,5,5,5,5,5,2,2,2,2,1,0,0],
        [0,0,0,1,5,2,2,5,5,5,5,5,2,2,5,1,0,0,0],
        [0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0],
        [0,0,0,1,5,7,7,5,5,5,5,7,7,5,5,1,0,0,0],
        [0,0,1,5,3,7,7,3,5,5,3,7,7,3,5,5,1,0,0],
        [0,0,1,5,3,3,3,3,5,5,3,3,3,3,5,5,1,0,0],
        [0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0],
	    [0,0,1,5,5,5,5,5,4,4,4,4,5,5,5,5,1,0,0],
	    [0,1,5,5,5,5,5,5,5,4,4,5,5,5,5,5,5,1,0],
	    [0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0],
        [0,1,5,5,5,4,5,5,5,5,5,5,5,4,5,5,5,1,0],
        [0,1,5,5,5,5,4,4,4,4,4,4,4,5,5,5,5,1,0],
        [0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0],
        [0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0],
        [0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0],
        [0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0],
        [0,0,0,0,1,1,5,5,5,5,5,5,5,1,1,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],	

    ];
	
    layTwo = [
		
		
	    [0,0,0,0,0,0,7,0,0,0,0,0,7,0,0,0,0,0,0],
	    [0,0,0,0,0,0,7,6,6,6,6,6,7,0,0,0,0,0,0],
	    [0,0,0,0,0,0,6,6,3,3,3,6,6,0,0,0,0,0,0],
	    [0,0,0,0,0,6,6,3,3,3,3,3,6,6,0,0,0,0,0],
        [0,0,0,0,6,6,3,3,3,4,3,3,3,6,6,0,0,0,0],
        [0,0,0,0,6,6,3,3,4,7,4,3,3,6,6,0,0,0,0],
        [0,0,0,6,6,6,3,3,4,7,4,3,3,6,6,6,0,0,0],
        [0,0,6,6,6,6,3,3,3,4,3,3,3,6,6,6,6,0,0],
        [0,0,6,6,6,6,6,3,3,3,3,3,6,6,6,6,6,0,0],
        [0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0],
        [0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0],
        [6,6,6,6,6,6,6,6,7,7,7,6,6,6,6,6,6,6,6],
        [6,6,6,6,6,6,6,7,7,7,7,7,6,6,6,6,6,6,6],
	    [6,6,0,6,6,6,7,3,3,3,3,3,7,6,6,6,0,6,6],
	    [6,6,0,6,6,6,6,6,6,6,6,6,6,6,6,6,0,6,6],
	    [6,6,0,0,6,6,6,6,6,6,6,6,6,6,6,0,0,6,6],
        [6,6,0,0,0,6,6,6,6,6,6,6,6,6,0,0,0,6,6],
        [6,6,0,0,0,6,6,6,6,6,6,6,6,6,0,0,0,6,6],
        [6,6,0,0,0,6,6,0,0,0,0,0,6,6,0,0,0,6,6],
        [6,6,6,0,0,6,6,0,0,0,0,0,6,6,0,0,6,6,6],
        [6,6,6,6,0,6,6,0,0,0,0,0,6,6,0,6,6,6,6],
        [6,0,0,0,0,6,6,0,0,0,0,0,6,6,0,0,0,0,6],
        [0,0,0,0,6,6,6,6,0,0,0,6,6,6,6,0,0,0,0],
        [0,0,0,6,0,6,6,0,6,0,6,0,6,6,0,6,0,0,0],	

    ];
    

   
	constructor(screen, bricks, timedelay, toplimit, bottomlimit, pixelstep)
	
	{
		
        super(screen, bricks, timedelay);
        this.author = "Beatrice Manicardi";
        
       
        this.colorset = [
           "black", //0
		   "dimgray",  //1
		   "darkmagenta",  //2
		   "white",  //3
		   "dodgerblue",  //4
		   "aqua",  //5
		   "chartreuse",  //6
		   "black",  //7
		   "saddlebrown", //8
        ];
        this.screen.style.backgroundColor = "floralwhite";
		this.direction = pixelstep;
		this.botlimit = bottomlimit;
		this.toplimit = toplimit;
		
		this.performCustomLayout(this.layOne,               //blockmap to use
		                            new vector2(0,100),     //lefthand margin
                             		new vector2(15,15),	    //spread between bricks		
									new vector2(0.28,0.7),  //scale
									true);                  //visibility
									
		this.performCustomLayout(this.layTwo,
		                             new vector2(200,100),
									 new vector2(15,15),
									 new vector2(0.28,0.7),
									 false);		                 
									

									 
	}							 
    action(delta)
	{
		var change = false;
		
		for (var i = 0; i < this.bricks.length; ++i)
		{
			this.bricks[i].move(0,this.direction);
			if (this.bricks[i].bottom>this.botlimit && this.direction>0 || 
			    this.bricks[i].top< this.toplimit && this.direction< 0)
				change = true;
		}
	
		if (change)
		{
			this.direction*= -1;
		}	
	}	
	action(delta)
	{
		super.action(delta);
		for (var i = 0; i  < this.bricks.length; i++)
	   {
			this.bricks[i].move(0,0)
			this.bricks[i].wrap();
		}
	}
}

/*
creates ascii character 65
using a blockmap
*/
class blevel extends character{

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
        this.author = "Arista Ajidele";
        //colour set first colour 0 ignored
        this.colorset = [
            "black",
            "green",
            "yellow"
        ];
        //activate layout
        this.performLayout(this.layout, 1)

        this.screen.style.backgroundColor = "magenta";
    }
}

class c_level extends character {

    rainbow = [
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,1,2,3,3,3,3,0,0,0,0,0,0],
    [0,0,0,1,2,3,4,4,4,4,0,0,0,0,0,0],
    [0,0,1,2,3,4,5,5,5,5,0,0,0,0,0,0],
    [0,1,2,3,4,5,6,6,6,6,0,0,0,0,0,0],
    [1,2,3,4,5,6,7,7,7,7,0,0,0,0,0,0],
    [2,3,4,5,6,7,0,0,0,0,0,0,0,0,0,0],
    [3,4,5,6,7,0,0,0,0,0,0,0,0,0,0,0],
    [4,5,6,7,0,0,0,0,0,0,0,0,0,0,0,0],
        
    ];

    constructor(screen, bricks, timedelay, toplimit, bottomlimit, speed, pixelstep)
    {
        super(screen, bricks, timedelay);
        this.author = "Arista Ajidele";

        this.colorset = [
            "black",
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "indigo",
            "violet",

        ];
        this.bottomlimit = bottomlimit;
        this.screen.style.backgroundColor = "black";
        this.direction = pixelstep;
        this.performCustomLayout(this.rainbow,
                                 new vector2(50,75), // margin
                                 new vector2(26,26), // spacing
                                 new vector2(0.5,1.25), // scales
                                 true);

                                
    }

    action(delta)
    {
        var change = false;

        for(var i = 0; i < this.bricks.length; i++) {
            this.bricks[i].move(0, this.direction);
            if(this.bricks[i].bottom > this.bottomlimit && this.direction > 0) {
                change = true;
            }

            // all bricks now moved check for direction change
        }
    }

}

/*
Produces a set of bricks that have their visibility controlled
in groups of columns
*/
class plevel extends levelset{

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
        this.author = "Arista Ajidele";
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

class Amelie extends character{
  
  
    A = [
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
    
        constructor(screen, bricks, timedelay, toplimit, bottomlimit, speed, pixelsteps)
        {
            super(screen, bricks, timedelay);
            this.author = "Amielie Graham";
            this.colorset = [
                "black",
                "violet",
                "green",
                "purple", 
                "blue",
                "indigo",
                "red",
                "yellow",
            ];

            this.direction = pixelsteps;
            this.botlimit = bottomlimit;
            this.toplimit = toplimit;
            this.performCustomLayout(this.A,
                                    new vector2(50,75),     //margin
                                    new vector2(26,26),     //spacing
                                    new vector2(0.5,1.25),  //scaling 
                                    true);

        }
      action(delta)
  {
      var change = false 
  
      for(var i = 0; i < this.bricks.length; i++)
      {
          if(!this.bricks[i].dead
              )
          { 
          this.bricks[i].move(0, this.direction);
          if (this.bricks[i].bottom > this.bottomlimit && this.direction > 0 ||
              this.bricks[i].top < this.toplimit && this.direction < 0)
          change = true;
          }
      }
  
      if (change)
      {
          this.direction *= - 1;
      }
  }
  }
  
class lightning extends character{
  
  
    lightning = [
        [0,0,0,0,0,0,0,0,0,1,6,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,6,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,6,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,6,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,6,6,6,6,6,6,6,0,0],
        [0,0,0,0,1,1,1,1,1,1,1,6,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,6,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,6,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,6,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,6,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,6,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
    
    constructor(screen, bricks, timedelay, toplimit, bottomlimit, speed, pixelsteps)
    {
        super(screen, bricks, timedelay);
        this.author = "Amielie Graham";

        this.colorset = [
            "black",
            "violet",
            "green",
            "purple", 
            "blue",
            "indigo",
            "red",
            "orange",
        ];

        this.screen.style.backgroundcolor = "aqua";
        this.direction = pixelsteps;
        this.botlimit = bottomlimit;
        this.toplimit = toplimit;
        this.performCustomLayout(this.lightning,
                                new vector2(50,75),     //margin
                                new vector2(26,26),     //spacing
                                new vector2(0.5,1.25),  //scaling 
                                true);

    }
    action(delta)
    {
        var change = false 

        for(var i = 0; i < this.bricks.length; i++)
        {
            if(!this.bricks[i].dead
                )
            { 
            this.bricks[i].move(0, this.direction);
            if (this.bricks[i].bottom > this.bottomlimit && this.direction > 0 ||
                this.bricks[i].top < this.toplimit && this.direction < 0)
            change = true;
            }
        }

        if (change)
        {
            this.direction *= - 1;
        }
    }
  }
  
  