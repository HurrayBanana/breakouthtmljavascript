/*
a class that takes a container to positioned within another container
this is a static construct, contains functions and properties
*/
class Sprite {
	/*
	screen - the html container this sprite will sit inside of (its parent)
	container - the html container that will be used to represent this sprite
	start - the initial x and y position to render this container/sprite
			position is defined as the top left hand corner of the sprite
	*/
    constructor(screen, container, start) {
		//add sprite to screen
        this.screen = screen;
        this.screen.appendChild(container);
        
		this.screensize = new vector2(screen.clientWidth, screen.clientHeight);
		
        this.dead = false;
        this.container = container;

		this.pos = start;
        
		//represents the rendering order in html, smaller first larger last
		this.z = 0;
		
		this.size = new vector2(this.container.clientWidth, this.container.clientHeight);

		this.myscale = new vector2(1, 1);
		
		this.defaultdisplay = this.container.style.display;
		this.visibility = true;

		//set the css to position this sprite
		this.render();
    }

	/*
	determines the left hand side of the sprite
	which is its x position
	*/
    get left() { return this.pos.x;}
	/*
	determines the top of the sprite
	which is its y position
	*/
    get top() { return this.pos.y;}
	/*
	determines the right hand side of the sprite
	which is its left hand edge plus its width
	*/
	get right() { return this.pos.x + this.size.width;}
	/*
	determines the bottom of the sprite
	which is its top edge plus its height
	*/
    get bottom() { return this.pos.y + this.size.height;}

	/*
	determines the horizontal centre of the sprite
	which is it's left position plus half its width
	*/
	get centrex() { return this.pos.x + this.size.width/2;}
	/*
	determines the vertical centre of the sprite
	which is it's top position plus half its height
	*/
    get centrey(){ return this.pos.y + this.size.height/2;}
	/*
	calculates the centre of the sprite in pixels and returns
	a vector2 object
	*/
	get centre() { return new vector2(this.centrex, this.centrey);}
	
	/*
	gets sprites current visibility setting
	*/
	get visible() {return this.visibility;}
	/*
	state - true if we wish to show a sprite, false to hide
	quicky sets the visiblity of a sprite
	*/
	set visible(state) {
		if (state)
			this.show();
		else
			this.hide();
	}
	/*
	gets the average scale of a sprite
	by combining the x and y scales
	which is ok if you want to keep aspect ratios
	*/
	get scale() { return (this.myscale.x + this.myscale.y)/2;}
	/*
	newscale - a single value to set the scale factor for the sprite
	a value of 1 (100%) is draw at size container
	<1 0.5 would be 50%
	>1 2.5 would be 250%
	could write another routine to allow scaling in either axis independantly
	*/
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
	/*
	vectorScale - an x and y indepedant scale values for the sprite
	takes a 2d vector with a separate scale component for the x and y axis
	*/
	scaleTo(vectorScale)
	{
		this.myscale.x = vectorScale.x;
		this.myscale.y = vectorScale.y;

		this.container.style.transform = "scale(" + vectorScale.x + "," + vectorScale.y + ")";
        
		//get width and height metrics
		this.size.x = this.container.getBoundingClientRect().width;
        this.size.y = this.container.getBoundingClientRect().height;

		//adjust z order based on scale
		this.container.style.zIndex = (100 * vectorScale.x).toString();
	}
	/*
	changes the css to force the browser to not render the sprites container
	*/
	hide()
	{
		this.container.style.display = "none";
		this.visibility = false;
	}
	/*
	changes the css to force the browser to render the sprites container
	*/
	show()
	{
		this.container.style.display = this.defaultdisplay;
		this.visibility = true;
	}
	
	/*
	updates the css for the position data of the sprite
	organised in pixels (hence the px in the css data)
	*/
	render()
	{
        this.container.style.left = this.pos.x + "px";
        this.container.style.top = this.pos.y + "px";
	}
	/*
	positions this sprite to the given x,y location
	call render to update css
	*/
	moveto(x,y)
	{
        this.pos.x = x;
        this.pos.y = y;
		this.render();
	}
	/*
	move sprite by an x,y offset
	call render to update the css
	*/
    move(x, y) {
        this.pos.x += x;
        this.pos.y += y;
		this.render();
    }
	/*
	other - the sprite we want to check for overlap
	returns true if this sprite and the given and another sprite are overlapping
	otherwise it returns false
	*/
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
	/*
	removes sprite from screen and marks as dead
	ready to be picked up by the remove subroutines in GameCode.js
	*/
    kill() {
		//be careful if double killed then don't try and remove again
		if (!this.dead)
		{
			this.dead = true;
			this.screen.removeChild(this.container);
		}
    }
	/*
	determines if a sprite is within the screen boundary
	returning true if it is or false if it is not
	*/
    onscreen()
    {
        return !(this.left >= this.screensize.width  ||
                this.right <= 0 ||
                this.top >= this.screensize.height  ||
                this.bottom <= 0
                    );
	}
	/*
    determines (or attempts) to find nearest side
    0 - left
    1 - right
    2 - top
    3 - bottom
	if number > 1 vertical otherwise horizontal
	this is easier to do the shorter the time delta is
	always prone to errors in determining this sort of AABB collision
	there are many numerical ways of doing this
	*/
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
	/*
	wrap sprite around both axis of screen of outside
	like the asteroids in the classic arcade game move
	*/
	wrap()
	{
		this.wrapx();
		this.wrapy();
	}
	/*
	wrap in x axis, if a sprite goes off left or right of screen (its parent container)
	it is repositioned on the opposite side of the screen
	*/
	wrapx()
	{
		//if the right hand edge of the sprite is less than the left edge of screen
		//then position its left edge to the right hand side of the screen
		if (this.right < 0)
			this.pos.x += this.screensize.width + this.size.width;
		//if the left hadn edge is off the right hand side of the screen then
		//position it so its right hand edge is to the left of the screen
		else if (this.left >= this.screensize.width)
			this.pos.x -= this.screensize.width + this.size.width;
	}
	/*
	wrap in y axis, if a sprite goes off top or bottom of screen (its parent container)
	it is repositioned on the opposite side of the screen
	*/
	wrapy()
	{
		//if the bottom of the sprite is above the top of the screen
		//drop down by the height of the screen and the height of the sprite
		//top of the sprite will then be just below screen
		if (this.bottom < 0)
			this.pos.y += this.screensize.height + this.size.height;
		//if the top of the spriet has gone past the bottom of the screen
		//move up by the screen height and height of sprite
		//bottom of sprite will just be off the top of the screen
		else if (this.top >= this.screensize.height)
			this.pos.y -= this.screensize.height + this.size.height;
	}
}