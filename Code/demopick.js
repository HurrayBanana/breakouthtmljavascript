//demo picking class for cleaner code
class demopick{
	constructor(levelcount)
	{
		this.numberOfPicks = levelcount;
		this.demopicks = new Array(this.numberOfPicks);
		this.clearDemoPicks();
	}
	//picks a random level number that has not been picked recently
	get nextlevel()
	{
		this.picked++;
		if (this.picked == this.numberOfPicks)
			this.clearDemoPicks();
		
		var pick = Math.floor(Math.random() * this.numberOfPicks);
		
		while (this.demopicks[pick])
			pick = Math.floor(Math.random() * this.numberOfPicks);
		
		this.demopicks[pick] = true;
		return pick + 1;
	}
	//allow all levels to be picked again
	clearDemoPicks()
	{
		this.picked = 0;
		for (var i = 0; i < lastlevel; i++)
			this.demopicks[i] = false;
	}
}