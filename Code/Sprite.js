/*
collision data for a sprite to sprite collision
*/
class collisiondata {
	constructor(side, dx, dy)
	{
		this.side = side;
		this.dx = dx;
		this.dy = dy;
	}
}
/*
a container for a html container to positioned within another container
this is a static construct, contains functions and properties
*/
class Sprite {
    constructor(screen, container, start) {
		//add sprite to screen
        this.screen = screen;
        this.screen.appendChild(container);
        
		this.screensize = new vector2(screen.clientWidth, screen.clientHeight);
		
        this.dead = false;
        this.container = container;

		this.pos = start;
        
		this.z = 0;
		
		this.size = new vector2(this.container.clientWidth, this.container.clientHeight);

		this.myscale = new vector2(1, 1);
		
		this.defaultdisplay = this.container.style.display;
		this.visibility = true;
		this.render();
    }

    get left() { return this.pos.x;}//this.x; }
    get top() { return this.pos.y;}//this.y; }
    get right() { return this.pos.x + this.size.width;}//this.x + this.width; }
    get bottom() { return this.pos.y + this.size.height;}//this.y + this.height; }

    get centrex() { return this.pos.x + this.size.width/2;}//this.x + this.width / 2; }
    get centrey(){ return this.pos.y + this.size.height/2;}//this.y + this.height / 2; }
	get centre() { return new vector2(this.centrex, this.centrey);}
	
	get visible() {return this.visibility;}
	set visible(state) {
		if (state)
			this.show();
		else
			this.hide();
	}
	get scale() { return (this.myscale.x + this.myscale.y)/2;}
	set scale(newscale)
	{
		this.myscale.x = newscale;
		this.myscale.y = newscale;

		this.container.style.transform = "scale(" + newscale + "," + newscale + ")";
        
		//get width and height metrics
		this.size.x = this.container.getBoundingClientRect().width;
        this.size.y = this.container.getBoundingClientRect().height;

		//adjust z order based on scale
		this.container.style.zIndex = (100 * newscale).toString();
	}
	
	hide()
	{
		this.container.style.display = "none";
		this.visibility = false;
	}
	show()
	{
		this.container.style.display = this.defaultdisplay;
		this.visibility = true;
	}
	
	//set render position
	render()
	{
        this.container.style.left = this.pos.x + "px";//this.x + "px";
        this.container.style.top = this.pos.y + "px";//this.y + "px";
	}
	moveto(x,y)
	{
        this.pos.x = x;
        this.pos.y = y;
		this.render();
	}
	//move sprite by an x,y offset
    move(x, y) {
        this.pos.x += x;
        this.pos.y += y;
		this.render();
    }
	//returns true if his and another sprite are overlapping
    touching(other) {
		//no collisions if either this or other hidden
		if (!other.visible || !this.visible)
			return false;
        //check to see if we are to the left
        if (this.right < other.left) return false;
        //check to see if we are right
        if (this.left > other.right) return false;
        //check to see if above
        if (this.bottom < other.top) return false;
        //check to see if below
        if (this.top > other.bottom) return false;
        return true;
    }
	//removes sprite from screen and marks as dead
    kill() {
        this.dead = true;
        this.screen.removeChild(this.container);
    }
	//determines if a sprite is within the screen boundary
    onscreen()
    {
        return !(this.left >= this.screensize.width  ||
                this.right <= 0 ||
                this.top >= this.screensize.height  ||
                this.bottom <= 0
                    );
    }
    //determines (or attempts) to find nearest side
    //0 - left
    //1 - right
    //2 - top
    //3 - bottom
    //if number > 1 vertical otherwise horizontal
    closestside(other)
    {
        //calculate collision offset distances
        var distance = []
        distance.push (Math.abs(this.left - other.right));
        distance.push (Math.abs(this.right - other.left));
        distance.push (Math.abs(this.top - other.bottom));
        distance.push (Math.abs(this.bottom - other.top));

        var smallest = 0;
        for (var i = 1; i < 4; i++) {
            if (distance[i] < distance[smallest])
                smallest = i;
        }
		
		if (smallest > 1)
		{
			return new collisiondata(smallest, 0, -distance[smallest]);
		}
		else
		{
			return new collisiondata(smallest, -distance[smallest], 0);
		}
    }
	//wrap sprite around both axis of screen of outside
	wrap()
	{
		this.wrapx();
		this.wrapy();
	}
	//wrap in x axis
	wrapx()
	{
		if (this.right < 0)
			this.pos.x += this.screensize.width + this.size.width;// -1;
		else if (this.left >= this.screensize.width)
			this.pos.x -= this.screensize.width + this.size.width;
	}
	//wrap in y axis
	wrapy()
	{
		if (this.bottom < 0)
			this.pos.y += this.screensize.height + this.size.height;
		else if (this.top >= this.screensize.height)
			this.pos.y -= this.screensize.height + this.size.height;
	}
}