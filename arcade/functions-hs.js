//call 'submitScore' with score as the variable; use highscore as the variable for keeping track of the highest score this session.
playerName="";
legendName="NONE"
score1=0
silentHSB=false
minimumHS=0;//can be changed within the game
function submitScore()
{
console.log("MIN = "+minimumHS);
highscore=score
console.log(score)
	//Submit to HS board for consideration
if(score>minimumHS)
		{
		console.log(28);
			if(playerName=="")
				{
				if(ipadUser==true)
					{
					var person = prompt("Please enter your name", "Harry Potter");
					if (person != null) 
						{
						playerName=person
						submitScore2();return
						}
					}
				else
					{
					console.log(27);	
					apprise("<span align='center'>Provide your name for the leaderboard!</span>",
						{'input':true}, 
						function(temp) 
							{
							if(temp!=false){playerName=temp}
							submitScore2();return
							}
						);
					}
				}
			else
			{
			submitScore2();return
			}
		}
else{submitScore2();return}

}

function readTopScorer()
{
		$.ajax({ url: '//www.classtools.net/arcade/highscores.php',
					 data: {
							thePlayer : "READONLY",
							theFolder : theFolder,
							theFile : theFile,
							theGame : theGame
							},
					dataType: 'json',
					type: 'post',
					async:false,
					success: function(data) 
						{	
						topScorer=data.leaderboard
						if(topScorer!=false)
							{
							console.log(topScorer+" = topscorer");
							topScorer=topScorer.split("||");//O=score of the highscorer if you decide to use it.
							legendName=topScorer[1];
							displayTopScorer()//defined in the manic game in index.php
							}
						}
				});
}


function submitScore2()
{
console.log(8)
		$.ajax({ url: '//www.classtools.net/arcade/highscores.php',
					 data: {
							thePlayer : playerName,
							theScore : score,
							theFolder : theFolder,
							theFile : theFile,
							theGame : theGame
							},
					dataType: 'json',
					type: 'post',
					async:false,
					success: function(data) 
						{	
						if(ipadUser==false && score1!=999)
							{
							//apprise("Successfully saved to Leaderboard!</b>",
								//{'animate':true},
								//function(){
										leaderBoard=data.leaderboard;
										leaderBoard=leaderBoard.split("\n");
										leaderBoard.reverse();
										console.log("ASDFAS")
										if(silentHSB==false){showLeaderboard()}
									//	}
								//);
							}
						else
							{
							leaderBoard=data.leaderboard;
							leaderBoard=leaderBoard.split("\n");
							leaderBoard.reverse();
							if(silentHSB==false){showLeaderboard()}
							}
						}
				});
}


maxDisplay=21
function showLeaderboard()
{
temp="<table class='hTable' border=1 padding='3' align='center' width='95%'>"
$("#highScoreDiv").show()
maxi=leaderBoard.length;if(maxi>maxDisplay){maxi=maxDisplay}
for(n=1;n<maxi;n++)
	{
	t=leaderBoard[n].split("||");
	thenm=t[1];if(thenm==playerName){thenm="<span style='font-weight:bold;color:red'>"+thenm+"</span>"}
	temp+="<tr><td>"+t[0]+"</td><td>"+thenm+"</td></tr>"	
	if(n==1){topScorer=t[1];legendName=topScorer;console.log(topScorer)}
	}
minimumHS=parseInt(t[0])
temp+="</tr></table>";
$("#hsSpan").html(temp);
console.log("done")
//$("#hTable, #hTable td, #hTable tr").css({"border-collapse":"collapse","border":"1px grey solid"})	
}

