function wellDone()
{	
$("#wellDoneWrapper").show()
speed=10;
pausebeforebounce=2000
temp="";
maxw=$("#wellDoneWrapper").width()
maxh=$("#wellDoneWrapper").height()
steps=50
inc=maxw/steps

//blocksize=maxw-(steps*inc)

startx=(maxw/2)+(blockwidth/2)
starty=(maxh/2)+(blockwidth/2)

for(x=0;x<steps;x++)
	{
	temp+="<div id='test"+x+"'></div>"	
	}
$("#wellDoneWrapper").html(temp);
colors="mauve*red*green*white*yellow*blue*purple*black*orange*brown"
colors=colors.split("*");
n=steps
makesqr()
}

function makesqr()
{
temp=colors.shift();
colors.push(temp)
if(n==-10)//reached outerlimit; starts to shrink back in
	{
	$('#mappy').empty()
	colors="none*none*none"
	colors=colors.split("*");
	dir=1
	setTimeout("mk2()",pausebeforebounce);return
	}
setTimeout("mk2()",speed);
}

function mk2()
{
//$("#test"+n).css("background",colors[Math.floor(Math.random()*colors.length)])
	$("#test"+n).css("background",colors[0])
	$("#test"+n).css("position","absolute");
	blockw=maxw-(n*inc)
	blockh=maxh-(n*inc)
	$("#test"+n).css("width",   blockw+"px"); //200 -(0) = 200 - (20*10)
	$("#test"+n).css("height",blockh+"px");//",h-(n*breadth)+"px");
	$("#test"+n).css("left", startx-(blockw/2)+"px")
	position1 = $("#test"+n).position();
	
	$("#test"+n).css("top",starty-(blockh/2)+"px");
	
	
	$("#test"+n).css("z-index",100+n);
	n+=dir;
	if(n==steps)
		{
		nextQ()
		}
	else
		{
		makesqr()
		}
}


function nextQ()
{
		$("#wellDoneWrapper").hide()
		if(gameStarted==1){clearInterval(timer);}
		//init()
		displayQuestion(999)//special format for 'new level'
		pauseGhosts=0;
}

