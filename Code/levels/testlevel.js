class testlevel extends character{



    constructor(screen, bricks)
	{
		//call base constructor - don't use a timer subsystem
		super(screen, bricks, 0);
        //colour set first colour 0 ignored
        this.colorset = [
            "grey",
            "purple",
            "cyan"
        ];
/*
        //activate layout
        bricks.push(new bonusBrick(screen,
                    new vector2(300,200),"gray",1,
                    extendpickup));

        bricks.push(new bonusBrick(screen,
            new vector2(300,50),"cyan",1,
            shrinkpickup));
*/
/*
        //activate layout
        bricks.push(new shrinkbrick(screen,
            new vector2(350,50),
            "purple",1,"extend"));
*/
        for (var i = 0; i < 5; i++)
            bricks.push(new Brick(screen,
                new vector2(50 * i,100),
                "white",1));
    }


    rawtimer(delta)
	{

	}
}