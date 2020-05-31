/*
demo picking class for cleaner code
manages its own resources to make sure it picks a unique level
each time the demo plays.
*/
class demopick{
	/*
	levelcount - maximum number of levels to pick from
	*/
	constructor(levelcount)
	{
		this.numberOfPicks = levelcount;
		this.demopicks = new Array(this.numberOfPicks);
		this.clearDemoPicks();
	}
	/*
	picks a random level number that has not been picked recently
	there are loads of ways pf doing this, the method I chose here
	keeps an array of boolean values which are set to true if that level
	number is picked.
	the array is reset if we have chosen from all the avalible levels
	(again loads of ways of checking for this)
	*/
	get nextlevel()
	{
		//check to see if we have exhausted all level choices
		this.picked++;
		if (this.picked == this.numberOfPicks)
			this.clearDemoPicks();
		
		var pick = Math.floor(Math.random() * this.numberOfPicks);
		
		while (this.demopicks[pick])
			pick = Math.floor(Math.random() * this.numberOfPicks);
		
		//log this level as picked
		this.demopicks[pick] = true;
		return pick + 1;
	}
	/*
	resets the picked array so we can pick from all levels again
	*/
	clearDemoPicks()
	{
		this.picked = 0;
		for (var i = 0; i < lastlevel; i++)
			this.demopicks[i] = false;
	}
}