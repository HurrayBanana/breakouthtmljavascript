var starttime;				//holds milliseconds from when game started
var delta;					//holds the delta for the current frame available globally as a fraction of a seoond
var deltamilliseconds;		//holds delta in milliseconds form
var gametime = 0;			//current game time in milliseconds elapsed
var gameticker;				//holds reference to game timer
var tickdelta = 20;			//time interval for game ticks
var timerCallBack = null;	//call back routine executed by timer

function timeInitialise()
{
	gameticker = setInterval(timer, tickdelta);
	timerClear();
}
//sets timer values to zero
function timerClear()
{
    gametime = 0;
	starttime = Date.now();
}
//record time delta and call any set callback
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