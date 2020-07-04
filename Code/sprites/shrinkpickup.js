class shrinkpickup extends pickup {
    constructor(screen, start, col, size, power) {

		//create my own container to exist inside
        super(screen, start, "S", "yellow", "black");
        //this.velocity.y = 120;
    }

    pickupAction(paddle)
    {
        //50% normal size paddle
        paddle.scaleTo(new vector2(0.5,1));
    }

}