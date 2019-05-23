// JavaScript Document
activityRoot="http://www.classtools.net/arcade/"
silentsave=0;
authorType="new";
loadedData="";
saveOrEdit="save";
premiumUserName="NONE"
function saveit(dataToSave)
{
numberOfQs=dataToSave.split("\n").length
//Is it new (authorType=="new")?
	//YES > 
	if(authorType=="new")
		{
		//Ask for a new password.
		apprise("<span align='center'>Provide a password<br>(so you can edit this later):</span>",
			{'input':true}, 
			function(pw) 
				{
				if(pw==false){apprise("A password must be provided");return}
				correctPW=pw;
									//Send to save.php.
					$.ajax({ url: 'save.php',
					 data: {
							content:pw+"\n*****\n"+dataToSave,
							theTitle:theTitle,
							numberOfQs:numberOfQs
							},
					dataType: 'json',
					type: 'post',
					async:false,
					success: function(data) 
						{
						/*apprise("Successfully saved.<br>Your template will now be loaded at its unique address.<br><b>Be sure to make a note of it!</b>",
						{'animate':true},
						function()
							{
							document.reloader.action=activityRoot+data.theURL;
							document.reloader.pw.value=correctPW;
							document.reloader.submit();
							}
							);*/
						document.reloader.action=activityRoot+data.theURL;
						document.reloader.pw.value=correctPW;
						$("#savedBoxNAME").html("<h3>Successfully saved!</h3><br>Your template will now be loaded at this unique address:<p><br><b>"+activityRoot+data.theURL+"</b><p><br>Be sure to make a note of it!")
						$("#savedBoxOK").html("<p><input type='button' class='but' value='OK' onClick='javascript:document.reloader.submit()' /></p>");
						reposit()
						$("#savedBox").show();
						}
					});
				}
		);
		}

	//NO > 
		//	Are we dealing with an 'author viewer' already? (authorType=="administrator")
		if(authorType=="administrator")
			{
			//YES > Resave and give a message.	
				$.ajax({ url: 'save.php',
				 data: {
						content:correctPW+"\n*****\n"+dataToSave,
						folder: theFolder,
						file: theFile,
						theTitle:theTitle,
						numberOfQs:numberOfQs
						},
				dataType: 'json',
				type: 'post',
				async:false,
				success: function(data) 
					{
					if(silentsave!=1)
					//RESAVED to = http://www.classtools.net/brainybox/"+data.theURL
						{
						//apprise("Successfully resaved",{'animate':true});
						$("#savedBoxNAME").html("<h3>Successfully resaved!</h3>")
						$("#savedBoxOK").html("<p><input type='button' class='but' value='OK' onClick='javascript:$(\"#savedBox\").hide()' /></p>");
						reposit()
						$("#savedBox").show();
						
						}
					silentsave=0;
					hideEditScreen();
					return true;
					}
				});
			}	
			//NO (i.e. authorType=="viewExisting") > 
			if(authorType=="viewExisting")
				{
				//Ask for the password for this template.
				
				apprise("The unlock the template at this URL, please provide the password:",
						{'input':true}, 
						function(pw) 
							{
							//CheckPW using Ajax.
							checkpw(pw,"save");	
							}
						);
				}
}

function checkpw(pw,func)
{
$.ajax({ url: 'pwcheck.php',
					 data: {
							pw:pw,
							folder: theFolder,
							file: theFile
							},
					dataType: 'json',
					type: 'post',
					async:false,
					success: function(data) 
						{
						//If incorrect, give error message and return
						if(data.theMess=="failure")
							{apprise("Incorrect password");return;}
						else
							{
							correctPW=pw
							authorType="administrator";
							//If correct, give success message.
							apprise("Correct!",{'animate':true},
							function(r)
								{
								if(saveOrEdit=="save"){save();}
								if(saveOrEdit=="edit")
									{
									editAllowed()
									}
								}
							);	
							}
						}
					});
}