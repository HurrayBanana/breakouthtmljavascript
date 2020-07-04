class pickup extends MovingSprite {
    constructor(screen, start, letter, backcolor, textcolor) {

		    //create my own container to exist inside
        var pick = document.createElement("div");
        pick.className = "pickup";
        pick.style.backgroundColor = backcolor;
        pick.style.color = textcolor;

        //var velocity = new vector2(0,50);
        super(screen, pick, start, new vector2(0,100+Math.random() * 30));

        //create another element to sit inside the pickup to scroll
        this.label = document.createElement("div");
        this.label.className = "pickupLabel";
        this.label.innerText = letter;

        pick.appendChild(this.label);
        
        this.offy = 0;
        pickups.push(this);
    }

    update(delta) {
      super.update(delta);

      this.offy++;
      if (this.offy > 20) this.offy = -20;

      this.label.style.top = this.offy +"px";

      //kill if offscreen
      if (!this.onscreen())
        this.kill();
    }
}