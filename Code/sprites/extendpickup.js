class extendpickup extends pickup {
    constructor(screen, start){
    
        super(screen, start, "E", "purple", "white");
    }

    pickupAction(paddle)
    {
        //200% paddle
        paddle.scaleTo(new vector2(2,1));
    }

}