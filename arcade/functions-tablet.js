ipadUser=false
var ua = navigator.userAgent; 
console.log("BROWSER = "+ua)
if(ua.indexOf("SAMSUNG")!=-1)
	{
	ua=ua.split("SAMSUNG")
		{
		ua=ua.join("iPad");	
		}
	}
var event = (ua.match(/iPad/i)) ? 'touchstart' : 'click'; 
if(ua.indexOf("iPad")!=-1)
{
console.log("b")
ipadUser=true
}


  try {  
    document.createEvent("TouchEvent");  
	  console.log("c")
   //ipadUser=true; - disabled as causing problems...?
  } catch (e) {  
   //nothing to do 
  }  
