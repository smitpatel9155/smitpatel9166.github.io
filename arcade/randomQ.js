
function randomAnswer()
{
t=correctAns
if(t.indexOf(",")!=-1){t=t.split(",");t=t.join("");correctAns=t;q[1]=t;usedAnswers=correctAns+"*"}

if($.isNumeric(t))//If the answer is a number, then generate another random one for the same sort of size.
	{
	rand=-10+(Math.floor(Math.random()*20))
	ans=Math.abs(Math.floor(parseFloat(t)+rand))
	ans+=Math.floor(Math.random()*10)	
	while(usedAnswers.indexOf(ans+"*")!=-1)
		{
		rand=-10+(Math.floor(Math.random()*20))
		ans=Math.abs(Math.floor(parseFloat(t)+rand))
		ans+=Math.floor(Math.random()*10)	
		}
	usedAnswers+=ans+"*"
	return ans	
	}

numberInsideQuestion=false
for(var n=0;n<9;n++)
	{if(correctAns.indexOf(n)!=-1){numberInsideQuestion=true}}

correctAns2=correctAns+" ";
	changed=0
	temp=correctAns2.split(" ");
	for(n=0;n<temp.length;n++)
		{
		if(temp[n].indexOf(",")!=-1){t=temp[n].split(",");temp[n]=t.join("");}
		//If answer CONTAINS a number, replace it with a similar one
		if($.isNumeric(temp[n]))
			{
			changed=1;
			rand=-10+(Math.floor(Math.random()*20))
			ans=Math.abs(Math.floor(parseFloat(temp[n])+rand))
			ans+=Math.abs(Math.floor(Math.random()*10))
			temp[n]=ans
			}
		//If answer contains a month, change it.
		if($.inArray(temp[n],months)!=-1)
			{
			changed=1;
			ans=months[Math.floor(Math.random()*months.length)]
			temp[n]=ans	
			}
		
		
		if($.inArray(temp[n],countries)!=-1)
			{
			changed=1;
			ans=countries[Math.floor(Math.random()*countries.length)]
			temp[n]=ans	
			}
		if($.inArray(temp[n],days)!=-1)
			{
			changed=1;
			ans=days[Math.floor(Math.random()*days.length)]
			temp[n]=ans	
			}
		if($.inArray(temp[n],mfnames)!=-1)
			{
			changed=1;
			ans=mfnames[Math.floor(Math.random()*mfnames.length)]
			temp[n]=ans	
			}
			
		if($.inArray(temp[n],ffnames)!=-1)
			{
			changed=1;
			ans=ffnames[Math.floor(Math.random()*ffnames.length)]
			temp[n]=ans	
			}
			
		if($.inArray(temp[n],colours)!=-1)
			{
			changed=1;
			ans=colors[Math.floor(Math.random()*colours.length)]
			temp[n]=ans	
			}

		}
	if(changed==1)
		{
		if(usedAnswers.indexOf(temp.join(" "))!=-1)
			{
			randomAnswer()	
			}
		else
			{
			usedAnswers+=temp.join(" ")+"*";return temp.join(" ")
			}
		
		}
	

//As a last resort, just choose a random possible answer from the database.
		rand=Math.floor(Math.random()*possAnswers.length)
		counter=0;
		while(usedAnswers.indexOf(possAnswers[rand])!=-1 || $.isNumeric(possAnswers[rand]))
			{
			rand=Math.floor(Math.random()*possAnswers.length)
			counter++
			if(counter==20){break}	
			}
			
		counter=0
		while((numberInsideQuestion==false && isNumberInside(possAnswers[rand])==true) || usedAnswers.indexOf(possAnswers[rand])!=-1)
			{
			rand=Math.floor(Math.random()*possAnswers.length)	
			counter++
			if(counter=20){break}		
			}
			
		usedAnswers+=possAnswers[rand]+"*"
		return possAnswers[rand]
}

function isNumberInside(str)
{
for(n=0;n<9;n++)
	{
	if(str.indexOf(n)!=-1){return true}	
	}
return false	
}


function shuffleQs()
{
for(n=0;n<500;n++)
	{
	rand1=Math.floor(Math.random()*entries.length)
	rand2=Math.floor(Math.random()*entries.length)
	temp=entries[rand1]
	entries[rand1]=entries[rand2]
	entries[rand2]=temp
	}
}


numberString="one*two*three*four*five*six*seven*eight*nine*ten*eleven*twelve*thirteen*fourteen*fifteen*sixteen*seventeen*eighteen*nineteen*twenty"
numberString=numberString.split("*")

qcounter=0;
months="January*February*March*April*May*June*July*August*September*October*November*December"
months=months.split("*")

days="Monday*Tuesday*Wednesday*Thursday*Friday*Saturday*Sunday"
days=days.split("*")

countries="Afghanistan*Albania*Algeria*Andorra*Angola*Argentina*Armenia*Australia*Austria*Azerbaijan*Bahamas*Bahrain*Bangladesh*Barbados*Belarus*Belgium*Belize*Benin*Bhutan*Bolivia*Bosnia Herzegovina*Botswana*Brazil*Brunei*Bulgaria*Burkina*Burundi*Cambodia*Cameroon*Canada*Cape Verde*Central African Rep*Chad*Chile*China*Colombia*Comoros*Congo*Congo {Democratic Rep}*Costa Rica*Croatia*Cuba*Cyprus*Czech Republic*Denmark*Djibouti*Dominica*Dominican Republic*East Timor*Ecuador*Egypt*El Salvador*Equatorial Guinea*Eritrea*Estonia*Ethiopia*Fiji*Finland*France*Gabon*Gambia*Georgia*Germany*Ghana*Greece*Grenada*Guatemala*Guinea*Guinea-Bissau*Guyana*Haiti*Honduras*Hungary*Iceland*India*Indonesia*Iran*Iraq*Ireland*Israel*Italy*Ivory Coast*Jamaica*Japan*Jordan*Kazakhstan*Kenya*Kiribati*Korea North*Korea South*Kosovo*Kuwait*Kyrgyzstan*Laos*Latvia*Lebanon*Lesotho*Liberia*Libya*Liechtenstein*Lithuania*Luxembourg*Macedonia*Madagascar*Malawi*Malaysia*Maldives*Mali*Malta*Marshall Islands*Mauritania*Mauritius*Mexico*Micronesia*Moldova*Monaco*Mongolia*Montenegro*Morocco*Mozambique*Myanmar*Namibia*Nauru*Nepal*Netherlands*New Zealand*Nicaragua*Niger*Nigeria*Norway*Oman*Pakistan*Palau*Panama*Papua New Guinea*Paraguay*Peru*Philippines*Poland*Portugal*Qatar*Romania*Russian Federation*Rwanda*St Kitts & Nevis*St Lucia*Saint Vincent & the Grenadines*Samoa*San Marino*Sao Tome & Principe*Saudi Arabia*Senegal*Serbia*Seychelles*Sierra Leone*Singapore*Slovakia*Slovenia*Solomon Islands*Somalia*South Africa*South Sudan*Spain*Sri Lanka*Sudan*Suriname*Swaziland*Sweden*Switzerland*Syria*Taiwan*Tajikistan*Tanzania*Thailand*Togo*Tonga*Trinidad & Tobago*Tunisia*Turkey*Turkmenistan*Tuvalu*Uganda*Ukraine*United Arab Emirates*United Kingdom*United States*Uruguay*Uzbekistan*Vanuatu*Vatican City*Venezuela*Vietnam*Yemen*Zambia*Zimbabwe"
countries=countries.split("*");

mfnames="Aaron*Abel*Abner*Abraham*Adam*Adrian*Alan*Albert*Alexander*Alfred*Algernon*Alister*Alonso*Alphonso*Alvin*Ambrose*Amos*Andrew*Angus*Anselm*Anthony*Archibald*Arnold*Arthur*Augustus*Augustine*Austin*Avery*Baldwin*Barrett*Bartholomew*Basil*Benedict*Benjamin*Bennet*Bernard*Bert*Bertram*Bertrand*Blake*Bradford*Bradley*Brady*Brandon*Brenton*Bret*Brian*Broderick*Bruce*Bruno*Burton*Byron*Caleb*Calvin*Cameron*Carey*Carl*Carol*Casey*Caspar*Cassius*Cecil*Cedric*Charles*Chester*Christian*Christopher*Clarence*Clare*Clark*Claude*Clayton*Clement*Clifford*Clinton*Clive*Clyde*Cody*Colin*Conrad*Corey*Cornelius*Craig*Curtis*Cyril*Cyrus*Dale*Daniel*Darrell*David*Dean*Dennis*Derek*Desmond*Dexter*Dominic*Don*Donald*Donovan*Dorian*Douglas*Doyle*Drew*Duane*Dudley*Duke*Duncan*Dustin*Dwight*Dylan*Earl*Edgar*Edward*Edwin*Elbert*Elijah*Elliot*Ellis*Elmer*Elton*Elvin*Elvis*Elwood*Emery*Emil*Emmanuel*Eric*Ernest*Ervin*Ethan*Eugene*Eustace*Evan*Everard*Everett*Fabian*Felix*Ferdinand*Fergus*Floyd*Ford*Francis*Franklin*Frederick*Fred*Gabriel*Garrett*Geoffrey*George*Gerald*Gilbert*Glenn*Graham*Grant*Gregory*Griffith*Harold*Harris*Harvey*Henry*Herbert*Herman*Horace*Howard*Hubert*Hugh*Humphrey*Ian*Ignatius*Immanuel*Irvin*Isaac*Isidore*Ivor*Jack*Jacob*James*Jason*Jasper*Jefferson*Jeffrey*Jeremy*Jerome*Jesse*John*Jonathan*Joseph*Joshua*Julian*Justin*Karl*Keith*Kelly*Kelvin*Kendall*Kendrick*Kenneth*Kent*Kevin*Kristopher*Kurt*Kyle*Lambert*Lamont*Lancelot*Laurence*Lee*Leo*Leonard*Leopold*Leroy*Leslie*Lester*Lewis*Lincoln*Lindon*Lindsay*Linus*Lionel*Llewellyn*Lloyd*Logan*Lonnie*Louis*Lowell*Lucian*Luke*Luther*Lyle*Lynn*Malcolm*Manuel*Marion*Mark*Marshall*Martin*Marvin*Matthew*Matthias*Maurice*Maximilian*Maxwell*Maynard*Melvin*Merlin*Merrill*Michael*Miles*Milton*Mitchell*Monroe*Montague*Montgomery*Morgan*Mortimer*Morton*Moses*Murray*Nathan*Neal*Nelson*Nevill*Newton*Nicholas*Nigel*Noah*Noel*Norbert*Norris*Norman*Norton*Oliver*Orson*Orville*Oscar*Oswald*Owen*Patrick*Paul*Percival*Perry*Peter*Philip*Quentin*Quincy*Ralph*Randall*Randolph*Raphael*Raymond*Reginald*Rene*Reuben*Reynold*Richard*Rick*Robert*Roderic*Rodney*Roger*Roland*Rolph*Roman*Ronald*Ron*Roscoe*Ross*Roy*Rudolph*Russell*Ryan*Samson*Samuel*Sanford*Saul*Scott*Sean*Sebastian*Seth*Seymour*Shannon*Sheldon*Shelley*Sidney*Silas*Silvester*Simeon*Simon*Solomon*Stacy*Stanley*Stephen*Stuart*Terence*Thaddeus*Theodore*Timothy*Thomas*Tobias*Todd*Tracy*Travis*Tristram*Troy*Tyler*Ulysses*Uriah*Valentine*Valerian*Vernon*Victor*Vincent*Virgil*Wallace*Walter*Warren*Wayne*Wesley*Wilbur*Wiley*Wilfred*Willard*William*Willis*Wilson*Winfred*Winston*Woodrow*Xavier*Zachary"
mfnames=mfnames.split("*")

ffnames="Abigail*Ada*Adelaide*Adele*Adeline*Adrienne*Agatha*Agnes*Aileen*Alberta*Alexandra*Alexis*Alfreda*Alice*Alison*Althea*Amabel*Amanda*Amber*Amelia*Amy*Anastasia*Andrea*Angela*Anita*Anna*Annabel*Annette*Antoinette*Antonia*Arabella*Arlene*Ashley*Audrey*Augusta*Augustina*Aurora*Barbara*Beatrice*Belinda*Belle*Berenice*Bertha*Betty*Beverly*Blanche*Bonnie*Brenda*Brett*Bridget*Brittany*Camille*Candace*Caren*Carla*Carlotta*Carmen*Carol*Caroline*Cassandra*Catherine*Cecilia*Celeste*Celestine*Celia*Celine*Charity*Charlotte*Cheryl*Christine*Clara*Clarice*Claudia*Clemency*Clementine*Colleen*Constance*Cora*Cordelia*Corinne*Cornelia*Courtney*Crystal*Cynthia*Daisy*Danielle*Daphne*Darlene*Deborah*Delia*Dell*Denise*Diana*Dinah*Dolores*Dominique*Donna*Dora*Doreen*Doris*Dorothy*Edith*Edna*Elaine*Eleanor*Elisa*Elizabeth*Ella*Ellen*Eloise*Elsie*Elvira*Emily*Emma*Erica*Erin*Ernestine*Estelle*Esther*Ethel*Etta*Eugenia*Eulalia*Eunice*Euphemia*Eustacia*Eve*Eveline*Evangeline*Faith*Felicia*Florence*Frances*Francesca*Francine*Frederica*Gabrielle*Genevieve*Georgina*Geraldine*Gertrude*Gillian*Gina*Gladys*Glenda*Gloria*Grace*Gwendolen*Hannah*Harriet*Hazel*Heather*Helen*Henrietta*Hester*Hillary*Hilda*Holly*Hope*Ida*Imogen*Irene*Iris*Irma*Isabel*Jacqueline*Jane*Janet*Janice*Jean*Jeannette*Jemima*Jennifer*Jenny*Jessica*Jill*Joanna*Joceline*Josephine*Joyce*Judith*Julia*Julianne*Juliet*Justina*Karen*Katherine*Kathleen*Kelly*Kimberly*Kristina*Laura*Laureen*Laurel*Laverne*Lavinia*Leah*Leila*Lena*Leona*Leonora*Leslie*Leticia*Lillian*Lily*Linda*Lindsay*Lisa*Lois*Lona*Lora*Lorena*Lorna*Loretta*Lorinda*Lorraine*Lottie*Louise*Lucille*Lucinda*Lucy*Lydia*Lynn*Mabel*Madeline*Magdaline*Marcia*Margaret*Marianne*Marilyn*Maribel*Marietta*Marina*Marion*Marjorie*Martha*Mary*Mary*Matilda*Maud*Maureen*Maxine*Megan*Melanie*Melinda*Melissa*Mercedes*Meredith*Michelle*Mildred*Millicent*Minnie*Miranda*Miriam*Molly*Mona*Monica*Morgan*Muriel*Myra*Nadine*Natalie*Nancy*Nell*Nettie*Nicki*Nicole*Nina*Noel*Nora*Noreen*Norma*Octavia*Olive*Ophelia*Pamela*Pansy*Patricia*Paula*Pearl*Peggy*Penelope*Phoebe*Phyllis*Polly*Priscilla*Prudence*Rachel*Raquel*Rebecca*Regina*Renata*Renee*Rhoda*Rhonda*Roberta*Rose*Rosabel*Rosalie*Rosaline*Rosalind*Roseanna*Rosemary*Rowena*Roxanne*Ruby*Ruth*Sabrina*Samantha*Sarah*Selina*Selma*Shannon*Sharon*Shauna*Sheila*Shelley*Shirley*Sibyl*Sidney*Sonia*Sophia*Stacy*Stephanie*Stella*Susan*Sylvia*Tabitha*Tamara*Tanya*Teresa*Theodora*Thelma*Tiffany*Tina*Tracy*Ulrica*Una*Ursula*Valentina*Valerie*Vanessa*Vera*Verna*Veronica*Victoria*Vida*Viola*Violet*Virginia*Vivian*Wanda*Wendy*Wilhelmina*Winifred*Yolanda*Yvonne*Yvette*Zoe"
ffnames=ffnames.split("*")

colours="red*orange*yellow*green*blue*indigo*violet*purple*pink*silver*gold*beige*brown*grey*black*white"
colours=colours.split("*")