//Call this to initialise questions.
function initQs()
	{
	qlist="";qlistprintable="";qlistprintable2=""
	entries=loadedData.split("\n");
	for(n=0;n<entries.length;n++)
		{
		if(entries[n].indexOf("*")==-1)
			{
			entries.splice(n, 1);	
			}	
		}
	possAnswers=""
	bingoAnswers=""
	for(n=0;n<entries.length;n++)
		{
		t=entries[n].split("*");
		qlist+=t[0]+" | ";
		qlistprintable+="<p>"+(n+1)+". "+t[0]+"</p>";
		qlistprintable2+="<p>"+(n+1)+". "+t[0]+"<br><b>"+t[1]+"</b></p>";
		bingoAnswers+=t[1]+"||"
		for(z=1;z<t.length;z++)
			{
			possAnswers+=t[z]+"||";	
			}
		}
	possAnswers=possAnswers.split("||");
	bingoAnswers=bingoAnswers.split("||");
	shuffleQs()
	
	if(theTitle.indexOf("questions)")!=-1)
		{
		theTitle=theTitle.split("(");
		theTitle=theTitle[0]
		}
	$("#theTitleSpan").html(theTitle+"<br>(<a href='javascript:showem()'>"+entries.length+" questions</a>)");
	rotateText()
	}

function showem()
{
$("#qlistDiv").html("<h2 align='center'>"+theTitle+"</h2><h3 align='center'>("+entries.length+" questions)</h3>"+qlist+"<h3 align='center'><a href='javascript:hideQlist()'>CLOSE</a></h3>")
showQlist()
}

function displayQuestion(nq)//asks a specified number of questions.
{
if(nq==999)
	{nq=2+livesLost;introStem="To proceed to the next level, "}//"New Level" format;
else{introStem="To gain an extra life, "}
numberOfQs=nq
$("#introDiv").hide();
direction="";intent="";exitingCorridor=0;pauseGhosts=1;
q=entries[qcounter].split("*");	
qcounter++;if(qcounter>=entries.length){qcounter=0}//loop through questions
$("#questionSpan").html(q[0])
if(nq==1)//i.e. One question left
	{$("#qintro").html("Before proceeding to the game, you must answer this question correctly!")}
else
	{
	if(nq>=0){$("#qintro").html(introStem+"you must answer <span style='color:red'>"+numberString[nq-1].toUpperCase()+"</span> more questions correctly!")}
	}
correctAns=q[1]+""
console.log(correctAns)
usedAnswers=correctAns+"*"
while(q.length<5)
	{
	q[q.length]=randomAnswer()
	}
shuffle();//Shuffle answers
if(gameType==2)//two player format
{
$("#ans1").html(q[1])
$("#ans2").html(q[2])
$("#ans3").html(q[3])
$("#ans4").html(q[4])
}

else
{
$("#ans1").html("<a href='javascript:console.log(990);checkAns(1)'>"+q[1]+"</a>")
$("#ans2").html("<a href='javascript:console.log(990);checkAns(2)'>"+q[2]+"</a>")
$("#ans3").html("<a href='javascript:console.log(990);checkAns(3)'>"+q[3]+"</a>")
$("#ans4").html("<a href='javascript:console.log(990);checkAns(4)'>"+q[4]+"</a>")


}

if(q[1]==correctAns){correctFruit="apple"}
if(q[2]==correctAns){correctFruit="cherries"}
if(q[3]==correctAns){correctFruit="orange"}
if(q[4]==correctAns){correctFruit="strawberry"}
$("#questionDiv").show()

}




function shuffle()
{
for(n=0;n<50;n++)
	{
	rand1=Math.ceil(Math.random()*4)
	rand2=Math.ceil(Math.random()*4)
	temp=q[rand1]
	q[rand1]=q[rand2]
	q[rand2]=temp
	}
}

function checkAns(n)
{
if(numberOfQs==0){return}
console.log(q[n]+" "+correctAns)
if(q[n]==correctAns)
	{
	playSound("correctAudio")
	console.log(111);
		
	increaseScore(200)//important score goes up. This stops init() from thinking it's a fresh game and thereby asking a question again.
	
	numberOfQs--
	if(numberOfQs==0)
		{
		console.log("ZERO")
		pauseGhosts=0;
		livesLost++//so more questions asked next time.
		$('#questionDiv').hide()
		if(gameStarted==1){clearInterval(timer);}
		init()
		//loadlevel()
		//looper=setInterval("checkIfFalling();moveGuardians();reduceAirGauge()",50)		
		}
	else
		{
		console.log(222);
		displayQuestion(numberOfQs)	
		}
	
	}
else
	{
	dead()
	}
}
