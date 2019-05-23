function reposit()
{
w=$(this).width()
h=$(this).height()
wd=$("#savedBox").width()
wh=$("#savedBox").height()
console.log(w+" / "+wd);
$("#savedBox").css("left",((w*0.5)-(wd*0.5))+"px");
$("#savedBox").css("top",((h*0.5)-(wh))+"px");		
}

levelNo=1;
function nextLevel()
{
pauseGhosts=1
$("#pacImg").hide()
//playSound("deadAudio");
dir=-1
levelNo++
wellDone()
}

function savethefave()
{
if(theFile==""){alert("You need to save a quiz before you can add it to your favourites");return}
saveFave(self.location+"",theTitle)//function called from _login.inc.php.	
}

gameType=1 //1 player game
creatingGame=0
if(leaderBoard==null){leaderBoard=""}
function newGame()
{
creatingGame=1;
saveOrEdit="save";
if(authorType=="viewExisting"){authorType="new"}
$("#gameDiv").hide()
$("#qbox").val("");
$("#titleBox").val("");
$("#createDiv").show()
}

function showSamples()
{
$("#gameDiv").hide()
$("#samplesDiv").show()
}
function hideSamples()
{
$("#gameDiv").show()
$("#samplesDiv").hide()
}

function showQlist()
{
$("#gameDiv").hide()
$("#qlistDiv").show()
}
function hideQlist()
{
$("#gameDiv").show()
$("#qlistDiv").hide()
}


function editRequest()
{
if(authorType=="viewExisting")
	{
	saveOrEdit="edit";
	saveit("")
	}
else if (authorType=="administrator")
	{
	editAllowed()	
	}
}
function editAllowed()
{
	saveOrEdit="edit";
	$("#gameDiv").hide()
	$("#qbox").val(loadedData)
	$("#titleBox").val(theTitle)
	$("#createDiv").show()
	creatingGame=1
}

function hideEditScreen()
{
if(theFile!="" && authorType=="new"){authorType="viewExisting"}//user has cancelled option to create a new quiz
$("#gameDiv").show()	
$("#createDiv").hide()
creatingGame=0
}

function firstLoad()
{
console.log(1)
if(ipadUser==true)
	{
	console.log("IPAD DETECTED = ADDING FUNCTIONS IN FIRSTLOAD()");
	$('#ans1').bind(event, function(){checkAns(1)})
	$('#ans2').bind(event, function(){checkAns(2)})
	$('#ans3').bind(event, function(){checkAns(3)})
	$('#ans4').bind(event, function(){checkAns(4)})
	}
	
$('#login').css({"padding":"0px","margin":"0px","top":"auto","bottom":"0px"});
$('#loginBox').css({"top":"auto","bottom":"40px"});
$("#qbox").css("width", "90%")
if(loadedData!="")
	{
	console.log(2)
	initQs()
	}
else
	{
	console.log(3)
	//NO QUIZ CREATED - SHOW INTROBLURB
	//http://www.classtools.net/pac/201410_W6cieh
	$("#theTitleSpan").html('Arcade Game Generator!')
	$("#playSpan").html("<h2>Turn your test into an arcade game!</h2><p>Share the link with students<p>Embed it on your website<p><a href='javascript:showSamples()'>View *70+* Sample Games!</a><h3><a class='btn3' href='javascript:newGame()'>Create a new Game</a></h3>")
	
	$("#playSpan").append('<a href="//www.classtools.net" target="_top"><span align="center"><img width="50%" src="https://www.classtools.net/classtools_premium/logoTrans.gif" /></span></a>');
	}
}


gameStarted=0
document.addEventListener('touchstart', function(e) {
    var touch = e.touches[0];
	tx=touch.pageX
	ty=touch.pageY
	
	position = $("#pacImg").position();
	x = position.left 
	y = position.top 
	
	if(gameStarted==1){
		e.preventDefault();
		//oldDirection=direction;
		xdiff=Math.abs(tx - x)
		ydiff=Math.abs(ty - y)
		
		if(xdiff>ydiff)
			{
			if(tx>x){intent="right"}
			if(tx<x){intent="left"}	
			}
		else
			{
			if(ty<y){intent="up"}
			if(ty>y){intent="down"}
			}
		movePac()
		}
}, false);






//FOR THE TWO PLAYER GAME, WHEN THEY HAVE TO HUNT A FRUIT
function questionRead()
{
pauseGhosts=0;
$("#questionDiv").hide()
}


//DETECT KEYPRESSES
//37 = left, 38 = up, 39 = right, 40 = down
speed=3//pixels per cycle
exitingCorridor=0

$(document).keydown(function(e) {
	if(exitingCorridor==1){return}
	if(creatingGame==1){return}
	oldDirection=direction;
    if(e.which==37){intent="left";}
	if(e.which==38){intent="up";}
	if(e.which==39){intent="right";}
	if(e.which==40){intent="down";}
});





opposites=new Array()
opposites["up"]="down"
opposites["down"]="up"
opposites["left"]="right"
opposites["right"]="left"




function moveGhost(num)
{
if(pauseGhosts==1)
	{return}
s=Math.floor(blockwidth/5*ghostSpeeds[num])
s=s*(1+(livesLost/30))


if(scaredCountdown!=0){s=s*0.75}//ghosts slow down in frightened mode
if(scatterCountdown!=0){s=s*1.25}//ghosts speed up in scatter mode
if($("#ghostImg"+num).attr('src')=="images/ghost_eyes.gif"){s=s*2.5}
if(s<1){s=1}

for(pixMove=1;pixMove<=s;pixMove++)
	{
	ghostCalc(num)
	
	if(gRow==row)//Hit a ghost
				{
				if(gCol==col)
					{
					if(scaredCountdown==0)//Ghosts are the hunters, not the hunted!! :(
						{
						pauseGhosts=1
						$("#pacImg").hide()
						playSound("deadAudio");
						setTimeout("displayQuestion("+livesLost+")",2000);	//preferable - ask them a question so they can carry on
						
						}
					else	//EATEN A GHOST! :)
						{
						if($("#ghostImg"+num).attr('src')!="images/ghost_eyes.gif")//and it's not already been eaten
							{
							playSound("correctAudio");
							increaseScore(50)
							$("#ghostImg"+num).attr('src',"images/ghost_eyes.gif")
							//$("#ghostImg"+num).css("left",(ghostStartingPoint[num][0])+"px");
							//$("#ghostImg"+num).css("top",(ghostStartingPoint[num][1])+"px");
							return
							}
						}
					}
				}
	
		if(ghostDirection[num]=="left"){$("#ghostImg"+num).css("left",(ghostPos.left-1)+"px");}
		if(ghostDirection[num]=="up"){$("#ghostImg"+num).css("top",(ghostPos.top-1)+"px");}
		if(ghostDirection[num]=="right"){$("#ghostImg"+num).css("left",(ghostPos.left+1)+"px");}
		if(ghostDirection[num]=="down"){$("#ghostImg"+num).css("top",(ghostPos.top+1)+"px");}
		
	}

}

function ghostCalc(num)
{
	flag=0
//$("#coOrds").html("ScaredCoundown: "+scaredCountdown+" | ScatterCountdown: "+scatterCountdown+" | "+biscuitsLeft)
	ghostPos = $("#ghostImg"+num).position()
	gRow=Math.round(ghostPos.top/blockwidth)
	gCol=Math.round((ghostPos.left-offsetH)/blockwidth)
	gx = ghostPos.left % blockwidth
	gy = ghostPos.top % blockwidth
	
	if(gx===0 && gy===0)//in a full square. Could feasibly change direction along another plane now.
	{
	if(scaredCountdown!=0)
		{
		//$("#coOrds").html($("#ghostImg"+num).attr('src'))
		scaredCountdown--
		
		if(scaredCountdown==0)
			{
			$("#ghostImg1").attr('src',"images/ghost1.gif")
			$("#ghostImg2").attr('src',"images/ghost2.gif")
			$("#ghostImg3").attr('src',"images/ghost3.gif")
			$("#ghostImg4").attr('src',"images/ghost4.gif")
			}
		else if($("#ghostImg"+num).attr('src')=="images/ghost_eyes.gif")
			{
			flag=1
			prow=11
			pcol=10//middle of maze
			}
		else
			{
			prow=row
			pcol=col
			}
		}
	
	else if(scatterCountdown==0)//normal chase mode
		{
		prow=row
		pcol=col
		}
	else	//scatter mode
		{
		scatterCountdown--
		if(scatterCountdown==0)
			{
			temp=50+(Math.floor(Math.random()*100));
			temp2=10000+(Math.floor(Math.random()*10000));
			setTimeout("scatterCountdown="+temp,temp2);//set up next scatter movement
			}
		prow=scatterTarget[num][0]
		pcol=scatterTarget[num][1]
		}
		
		if(num==3)
		{
		$("#coOrds").html(prow+" "+pcol)
		}
		
			opt=new Array()
			poss=new Array()
			if(map[gRow-1][gCol]>0)
				{
				poss.push("up")
				if(gRow>prow){opt.push("up")}
				}
			if(map[gRow+1][gCol]>0)
				{
				poss.push("down")
				if(gRow<prow){opt.push("down")}
				}
			if(map[gRow][gCol+1]>0)
				{
				poss.push("right")
				if(gCol<pcol){opt.push("right")}
				}
			if(map[gRow][gCol-1]>0)
				{
				poss.push("left")
				if(gCol>pcol){opt.push("left")}
				}
			
			if(scaredCountdown!=0 && flag==0)
			{opt=new Array()}//we don't want the optimum moves - ie moving TOWARDS pacman - so let's forget them.
			
			else if(opt.length==1 && opt[0]==opposites[ghostDirection[num]])
				{
				opt=new Array()
				if(num==3){$("#coOrds").html("One optimum move, but a reverse")}
				}//There's one optimum move, but it's a reverse move, so not allowed; again, let's forget the optimums.
			
			
			if(opt.length>=1)//There's at least one possible optimum move, so let's choose one of them (as long as it isn't a reverse move)
				{
				ghostDirection[num]=opposites[ghostDirection[num]]
				temp=ghostDirection[num]
				while(ghostDirection[num]==temp)
					{
					ghostDirection[num]=opt[Math.floor(Math.random()*opt.length)]
					}
				if(num==3){$("#coOrds").html("Several optimum moves - chose "+ghostDirection[num])}
				}
			else//No optimum moves. So find out what's possible, and choose one at random.
				{
				if(poss.length==1){ghostDirection[num]=poss[0];
				if(num==3){$("#coOrds").html("No optimum move; choosing only option")}
				}	//only one way out, so ghost has to choose it.
				else//If more than one direction possible, choose one at random that *isn't* a reverse move
					{
					ghostDirection[num]=opposites[ghostDirection[num]]
					temp=ghostDirection[num]
					while(ghostDirection[num]==temp)
						{
						if(num==3){$("#coOrds").html("No optimum move; choosing from several options "+flag)}
						ghostDirection[num]=poss[Math.floor(Math.random()*poss.length)]
						}
					}
				}
	}
	
	
	
}

function dead()
{
$("#coOrds").html("HIT!!!");
playSound("askQAudio");
if(gameStarted==1){clearInterval(timer);}
$("#gameOverQ").html(q[0])
$("#gameOverQ").fadeIn(1000);
$("#scoreSpan").html(score);	
$("#gameOverAns").html(correctAns)
$("#gameOverAns").fadeIn(3000,
        function() {
            blinker($("#gameOverAns"))
            });
$("#gameOverDiv").show()
levelNo=1
if(score>highscore){setTimeout("submitScore()",5000);}
else{setTimeout("showLeaderboard()",5000);}
}



tx=0
ty=0
function movePac()
{
if(pauseGhosts==1){intent="";return}
if(intent==""){return}


loop=Math.floor(blockwidth/5); 

position = $("#pacImg").position(); 
row=Math.round(position.top/blockwidth)
col=Math.round(((position.left)-offsetH)/blockwidth)
if(map[row][col]==1){loop=Math.ceil(loop*0.5);}
//slow down pac when he's eating

//how many pixels to move each time - i.e. speed of pacman

for(looper=0;looper<=loop;looper++)
	{
		position = $("#pacImg").position(); 
		row=Math.round(position.top/blockwidth)
		col=Math.round(((position.left)-offsetH)/blockwidth)
		x = position.left % blockwidth
		y = position.top % blockwidth
		
		if(looper==0)
			{
			for(ghosts=1;ghosts<=4;ghosts++)
				{
				moveGhost(ghosts);
				}
			}
			
		changeDirAttempted=0
		
		if(x===0 && y===0)//in a full square. Could feasibly change direction along another plane now.
			{
			if(map[row][col]==1)//Eating a biscuit
				{
				biscuitsLeft--
				if(biscuitsLeft==0){nextLevel()}
				map[row][col]=2
				$("#"+row+"_"+col).attr("src","images/blank.jpg")
				playSound("eatingAudio")
				increaseScore(5)
				}
			
			if(map[row][col]>=81 && map[row][col]<=84)//Eating some fruit (81 apple, 82 cherries, 83 orange, 84 strawberry)
				{
				$("#fruit"+map[row][col]).attr("src","images/blank.jpg")
				playSound("fruitAudio")
				increaseScore(20)
				
				if(gameType==1)//ONE PLAYER - TIME TO GOBBLE GHOSTS
				{
				scaredCountdown=200
				//scatterCountdown=0//scatter mode should cease
				$("#ghostImg1, #ghostImg2, #ghostImg3, #ghostImg4").attr('src',"images/ghost5.gif")
				}
				
				
				else//TWO PLAYER FORMAT - EATING FRUIT MEANS ANSWERING QUESTIONS
					{
					if(fruitTypes[correctFruit]==map[row][col]){displayQuestion(3)}
					else{alert("Incorrect!");dead()}
					}
				map[row][col]=2//blank space replaces it
				}
			
			if(map[row][col]==-1)//exiting a corridor
				{
				exitingCorridor=1;
				intent=direction
				if(col==0 && intent=="left")//extreme left; needs to reappear on the right
					{$("#pacImg").css("left",(((map[0].length-1)*blockwidth)+offsetH)+"px");return}
				if(col==map[0].length-1 && intent=="right")//extreme right; needs to reappear on the left
					{$("#pacImg").css("left",offsetH+"px");return}
				}
			else
				{
				exitingCorridor=0;
				}
			
		
		oldDirection=direction;
		if(direction!=intent){
				direction=intent;
				changeDirAttempted=1
				}
			}
		
		if(direction=="left" || direction=="right"){t=x}
		if(direction=="up" || direction=="down"){t=y}
		
		if(t===0)//arrived in a full square
				{
				if(isBlocked()){
					direction=oldDirection;
					if(changeDirAttempted==0){return}
					if(isBlocked()){return}
					}
				}
		
		
		if(changeDirAttempted==1)
			{
			$("#pacImg").removeClass()
			if(direction=="left"){$("#pacImg").attr("src","images/pacman.gif");}
			if(direction=="right"){$("#pacImg").attr("src","images/pacman.gif");$("#pacImg");$("#pacImg").addClass('flip-horizontal');}
			if(direction=="up"){$("#pacImg").attr("src","images/pacmanV.gif");}
			if(direction=="down"){$("#pacImg").attr("src","images/pacmanV.gif");$("#pacImg");$("#pacImg").addClass('flip-vertical');}
			}
		
		if(direction=="left"){$("#pacImg").css("left",(position.left-1)+"px");}
		if(direction=="up"){$("#pacImg").css("top",(position.top-1)+"px");}
		if(direction=="right"){$("#pacImg").css("left",(position.left+1)+"px");}
		if(direction=="down"){$("#pacImg").css("top",(position.top+1)+"px");}
	}

}


fruitTypes=new Array()
fruitTypes["apple"]=81
fruitTypes["cherries"]=82
fruitTypes["orange"]=83
fruitTypes["strawberry"]=84



function isBlocked()
{
row=Math.round(position.top/blockwidth)
col=Math.round((position.left)-offsetH)/blockwidth

if(direction=="left"){
	if(map[row][col-1]==0){direction="";return true}
	else{return false}
	}

if(direction=="right"){
	if(map[row][col+1]==0){direction="";return true}
	else{return false}
	}

if(direction=="up"){
	if(map[row-1][col]==0){direction="";return true}
	else{return false}
	}

if(direction=="down"){
	if(map[row+1][col]==0){direction="";return true}
	else{return false}
	}
	
}

function addFruits()
{
maxH=map.length-1;
maxW=map[0].length-1;
fruits=new Array()
fruits[1]="apple"
fruits[2]="cherries"
fruits[3]="orange"
fruits[4]="strawberry"

amountOfFruits=5-levelNo;
if(amountOfFruits<1){amountOfFruits==1}

for(n=1;n<=amountOfFruits;n++)//fruits decreased from 4 in level 1, down to 1 by level 4 onwards.
	{
	r=0;c=0
	while(map[r][c]!=1 && map[r][c]!=2)
		{
		r=Math.floor(Math.random()*maxH)
		c=Math.floor(Math.random()*maxW)	
		}
	map[r][c]=80+n//fruit
	xpos=(c*blockwidth)+offsetH
	ypos=r*blockwidth
	$('#mappy').append("<img style='position:absolute;width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='fruit8"+n+"' src='images/fruits/"+fruits[n]+".gif' />")
	}
}

function getMap()
{


x = (levelNo+2) % 3	//3 maps, change final number to reflect how many there are.

if(x==0)
	{
	map    = [
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
	[-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,-1],
	[-1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,-1],
	[-1,-1,-1,-1, 0, 1, 0, 1, 1, 1,93, 1, 1, 1, 0, 1, 0,-1,-1,-1,-1],
	[-1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0,-1],
	[-1, 1, 1, 1, 1, 1, 1, 1, 0,92,94,91, 0, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,-1],
	[-1,-1,-1,-1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,-1,-1,-1,-1],
	[-1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,-1],
	[-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,-1],
	[-1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,-1],
	[-1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0,-1],
	[-1, 0,33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
	]
	}

else if(x==1)
	{
	map    = [
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
   	[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
	[-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,-1],
	[-1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,-1],
	[-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0,-1],
	[-1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0,-1],
	[-1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0,-1],
	[-1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0,-1],
	[-1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0,-1],
	[-1, 0, 1, 1, 1, 1, 0, 1, 0, 0,91, 0, 0, 1, 0, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 1, 1, 0,94,93,92, 0, 1, 1, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0,-1],
	[-1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0,-1],
	[-1,-1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0,-1,-1],
	[-1,-1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0,-1,-1],
	[-1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,-1],
	[-1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,-1],
	[-1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,-1],
	[-1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0,33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
	]
	}
	
else
	{
	map    = [	
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
   	[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
	[-1, 0,33, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,-1],
	[-1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,-1],
	[-1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,-1],
	[-1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,-1],
	[-1,-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1,-1],
	[-1,-1, 0, 1, 0, 0, 0, 1, 0, 0,91, 0, 0, 1, 0, 0, 0, 1, 0,-1,-1],
	[-1,-1, 0, 1, 0, 1, 1, 1, 0,94,93,92, 0, 1, 1, 1, 0, 1, 0,-1,-1],
	[-1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,-1],
	[-1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,-1],
	[-1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,-1],
	[-1,-1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,-1,-1],
	[-1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,-1],
	[-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1],
	[-1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,-1],
	[-1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
	[-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
	]
	}
}


function init() {
gameStarted=1 
getMap()
$("#introDiv, #gameOverDiv, #questionDiv, #highScoreDiv").hide();
	scatterCountdown=100
	scaredCountdown=0   
	ghostDirection=new Array()
	ghostDirection[1]="";
	ghostDirection[2]="";
	ghostDirection[3]="";
	ghostDirection[4]="";
	direction="";intent=""  
    height = map.length;
    width  = map[0].length; 
	$('#mappy').empty()
	$("#pacImg").show()
	setTimeout("drawMap()",10)//bug fix...
	theSpeed=30-(livesLost);if(theSpeed<10){theSpeed=10}
	timer=setInterval("movePac()",theSpeed) //- activate to ensure that pacman moves even when keys not being pressed
};



highscore=0;
score=0
function showIntro()
{
score=0
increaseScore(0)
gameStarted=0
livesLost=2//Initial amount of questions to ask after life lost (increases after each subsequent life lost).
playSound("themeAudio")
getMap()
h=$(window).height()/map.length;
blockwidth=Math.floor(h)-2
if(blockwidth % 2 !==0){blockwidth--}

ghostInit()
w=$(window).width()/3
offsetH=w-(map[0].length*blockwidth)/2
offsetH=Math.floor(offsetH/blockwidth)*blockwidth
pauseGhosts=0;
w=blockwidth*(map[0].length-2)
h=blockwidth*(map.length-2)
resizeOverlays()
$("#introDiv").show()	
$("#gameOverDiv").hide()
$("#highScoreDiv").hide()

if(premiumUser==1 || createdByPremiumUser==1)
	{removAds()}	
}
function ghostInit()
{
scatterTarget=new Array()
scatterTarget[1]=[-10000,-10000]
scatterTarget[2]=[-10000,10000]
scatterTarget[3]=[10000,-10000]
scatterTarget[4]=[10000,10000]
ghostSpeeds=new Array()
ghostSpeeds[1]=0.2
ghostSpeeds[2]=0.4
ghostSpeeds[3]=0.6
ghostSpeeds[4]=0.75 //These can be any speeds, these ones seem ok.
}
	
//DRAW THE MAP.

function drawMap()
{	
z=map[0].length*blockwidth;
$('#mappy').hide()
xpos=0;
ghostStartingPoint=new Array();
ghostStartingPoint[1]=new Array;
ghostStartingPoint[2]=new Array;
ghostStartingPoint[3]=new Array;
ghostStartingPoint[4]=new Array;

biscuitsLeft=0
colors="*CornflowerBlue*GreenYellow*DeepPink*cyan*Magenta*red*blue*yellow*Fuchsia*green*white*DarkOrchid"
colors=colors+colors+colors+colors+colors //to make sure we don't run out!
colors=colors.split("*")
for(rows=0;rows<height;rows++)
	{
	ypos=rows*blockwidth
	for(cols=0;cols<width;cols++)
		{
		xpos=(cols*blockwidth)+offsetH
		ids=rows+"_"+cols;
		if(map[rows][cols]==0)
			{
			//$('#mappy').append("<img style='position:absolute;z-index=1;width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='"+ids+"' src='images/block.jpg' />")
			$('#mappy').append("<span style='position:absolute;z-index=1;background:"+colors[levelNo]+";width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='"+ids+"'> </span>")
			}
		else if(map[rows][cols]==-1)
			{$('#mappy').append("<img style='position:absolute;z-index:98;width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='"+ids+"' src='images/blank.jpg' />")}
		else if(map[rows][cols]==33)
			{$('#mappy').append("<img style='position:absolute;z-index:97;width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='pacImg' src='images/pacman.gif' />")}
		else if(map[rows][cols]>90)
			{
			z=(map[rows][cols]-90);
			$('#mappy').append("<img style='position:absolute;z-index:99;width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='ghostImg"+z+"' src='images/ghost"+z+".gif' />")
			ghostStartingPoint[z][0]=xpos;
			ghostStartingPoint[z][1]=ypos;
			}
		else
			{
			biscuitsLeft++
			$('#mappy').append("<img style='position:absolute;width:"+blockwidth+"px;height:"+blockwidth+"px;left:"+xpos+"px;top:"+ypos+"px' id='"+ids+"' src='images/biscuit.jpg' />")
			}
		}
	}
addFruits()
$('#mappy').fadeIn(500);
biscuitsLeft-=4;//to reduce spots taken by fruits.
}

function resizeOverlays()
{	
$("#questionDiv, #introDiv, #gameOverDiv, #wellDoneWrapper, #highScoreDiv, #samplesDiv, #qlistDiv, #createDiv, #ad").css("top",blockwidth);
$("#questionDiv, #introDiv, #gameOverDiv, #wellDoneWrapper, #highScoreDiv, #samplesDiv, #qlistDiv, #createDiv" ).css("left",blockwidth+offsetH);
console.log($("#introDiv").width())
$("#ad").css("left",(blockwidth*2)+offsetH+w+50);
$("#questionDiv, #introDiv, #gameOverDiv, #wellDoneWrapper, #highScoreDiv, #samplesDiv, #qlistDiv, #createDiv" ).width(w+50);
$("#questionDiv, #introDiv, #gameOverDiv, #wellDoneWrapper, #highScoreDiv, #samplesDiv, #qlistDiv, #createDiv" ).height(h);	
}

function blinker(selector){
    $(selector).animate({opacity:0}, 50, "linear", function(){
        $(this).delay(600);
        $(this).animate({opacity:1}, 50, function(){
        blinker(this);
        });
        $(this).delay(600);
    });
}
	

function increaseScore(n)
{
score+=n
$("#scoreDiv").html("YOUR SCORE: "+score+" | HIGH SCORE: "+highscore+" | <a style='color:white' href='javascript:showLeaderboard()'>VIEW LEADERBOARD</a>");	

}
