var starttime;				//holds milliseconds from when game started
var delta;					//holds the delta for the current frame available globally as a fraction of a seoond
var deltamilliseconds;		//holds delta in milliseconds form
var gametime = 0;			//current game time in milliseconds elapsed
var gameticker;				//holds reference to game timer
var tickdelta = 20;			//time interval for game ticks
var timerCallBack = null;	//call back routine executed by timer

/*
sets up the intial game timer, only setup once
*/
function timeInitialise()
{
	gameticker = setInterval(timer, tickdelta);
	timerClear();
}
/*
sets timer values to zero and records current time
*/
function timerClear()
{
    gametime = 0;
	starttime = Date.now();
}
/*
generates the time delta (number of milliseconds this game update has taken)
and calls the timerCallBack subroutine if it has a valid
subroutine reference
*/
function timer()
{
	var currenttime = Date.now();
	deltamilliseconds = (currenttime - starttime)
	delta = deltamilliseconds / 1000;
	starttime = currenttime;
	//console.log(delta);
    //keep track of milliseconds elapsed
    gametime += deltamilliseconds;
	
	if (timerCallBack != null)
		timerCallBack();
}