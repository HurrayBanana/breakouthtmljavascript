

class falling extends character{

    rainbow = [
        [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
        [0,0,0,0,1,2,3,3,3,3,2,1,0,0,0,0],
        [0,0,0,1,2,3,4,4,4,4,3,2,1,0,0,0],
        [0,0,1,2,3,4,5,5,5,5,4,3,2,1,0,0],
        [0,1,2,3,4,5,6,6,6,6,5,4,3,2,1,0],
        [1,2,3,4,5,6,7,7,7,7,6,5,4,3,2,1],
        [2,3,4,5,6,7,0,0,0,0,7,6,5,4,3,2],
        [3,4,5,6,7,0,0,0,0,0,0,7,6,5,4,3],
        [4,5,6,7,0,0,0,0,0,0,0,0,7,6,5,4],
    ];
    /*
	// screen - container reference for sprite placement
	// bricks - list that will hold each of the bricks for the level
	// timedelay - time between tick actions
	*/
    constructor(screen, bricks, timedelay)
    {
        super(screen, bricks, timedelay);

        //set colour (first colour 0 ignored)
        this.colorset = [
            "black",
            "red",
            "orange",
            "yellow",
            "lime",
            "blue",
            "indigo",
            "violet",
        ];

        this.performCustomLayout(this.rainbow, new vector2(50,-275), new vector2(26,26), new vector2(0.5,1.25), true);
        this.direction = 1;
    }

    action(delta)
    {
        var change = false;
        for (var i = 0; i < this.bricks.length; i++)
        {
            if (!this.bricks[i].dead)
            {
                this.bricks[i].move(0,this.direction);
                if (this.bricks[i].top > 400 && this.direction > 0 || this.bricks[i].top < 10 && this.direction < 0)
                    change = true;
            }
        }

        if (change)
            this.direction *= -1;
    }

}