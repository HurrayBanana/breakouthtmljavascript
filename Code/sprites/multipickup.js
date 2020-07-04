class multipickup extends pickup {
    constructor(screen, start){
    
        super(screen, start, "M", "blue", "yellow");
    }

    pickupAction(paddle)
    {
        //not using paddle
        spawnBall(activeball[0]);
        spawnBall(activeball[0]);
    }

}