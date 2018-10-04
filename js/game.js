//game.js

var immagini = new Array(2);
var serpente = new Array(); //array contentente le coordinate del serpente
var mio_div = new Array();
immagini[0] = new Image();
immagini[1] = new Image();
immagini[0].src = "immagini/bonus.png"; 
immagini[1].src = "immagini/cibo.png";
var bg = ["#BDB76B",  	//sfondo
			"#000",		//corpo serpente
			"#324628",	//testa serpente
			];
var x; 		//coordinate testa serpente
var y; 		//cortdinate testa serpente
var velocita;
var inter;    //intervallo movimento serpente
var right;
var bottom;
var food_x;		//coordinate cibo
var food_y;		//coordinate cibo
var bonus_x;	//coordinate bonus
var bonus_y;	//coordinate bonus
var interval_bonus;
var bonus_menu = document.getElementById("bonus");
var conta = document.getElementById("conto");
var ultimo;		//ultimo elemento del serpente
var ultimo_xy;	//coordinate ultimo elemento del serpente
var testa;		
var cibo;
var bon;		//bonus mangiato
var punteggio;
var molti;		//moltiplicatore di punteggio in base alla velocità
var inizio_gioco;
var punteggio_migliore = document.getElementById('bestscore').firstChild.nodeValue;

function game(){
	regole_testo.style.visibility = "hidden";
	punt.style.visibility = "hidden";
	men.style.visibility = "hidden";
	back.style.visibility = "hidden";
	g.style.backgroundColor = bg[0];
	switch(l){
		case 0: molti = 1 ; velocita = 140; break;
		case 1: molti = 3 ; velocita = 100; break;
		case 2: molti = 6 ; velocita = 60; break;
	}
	inizio_gioco=1;
	iniz_snake();
}

function crea(){
	for(var i=0;i<35;i++)
		for(var j=0;j<45;j++){
			mio_div[i*45+j]=document.createElement("div");
			g.appendChild(mio_div[i*45+j]);
			mio_div[i*45+j].setAttribute("class","mio_div");
			mio_div[i*45+j].setAttribute("id","riga_"+ i +"_colonna_" + j);
		}
}

function iniz_snake(){
	x = 24;
	y = 3;
	for(var i=0;i<35;i++)
			for(var j=0;j<45;j++)
				mio_div[i*45+j].setAttribute("style","backgroundColor=" + bg[0]);
	if(inizio_gioco==1){
		switch(lab){
		case 0: break;
		case 1: for(var i=12;i<23;i++)
					document.getElementById("riga_"+ i +"_colonna_"+ 22).style.backgroundColor = bg[1];
				for(var i=17;i<28;i++)
					document.getElementById("riga_"+ 17 +"_colonna_"+ i).style.backgroundColor = bg[1];
				break;
		case 2: for(var i=12;i<33;i++)
					document.getElementById("riga_"+ 5 +"_colonna_"+ i).style.backgroundColor = bg[1];
				for(var i=12;i<33;i++)
					document.getElementById("riga_"+ 29 +"_colonna_"+ i).style.backgroundColor = bg[1];
				break;
		}
		document.getElementById("riga_"+ y +"_colonna_"+ x).style.backgroundColor = bg[2];
		document.getElementById("riga_"+ y +"_colonna_"+ x).style.border = "1px solid grey";
		for(var i=x-1;i>x-4;i--){
			var pun = document.getElementById("riga_"+ y +"_colonna_"+ i);
			pun.style.backgroundColor = bg[1];
			pun.style.border = "1px solid grey";
		}
		food(x,y);
		document.onkeydown = key;
	}
	bonus_menu.style.visibility = "hidden";
	conta.firstChild.nodeValue = 100;
	right = 1;
	bottom = 1;
	cibo = -1;
	bon = 1;
	punteggio = 0;
	document.getElementById("currentscore").firstChild.nodeValue = punteggio;
	serpente = [(x-3) + " " + y,(x-2) + " " + y,(x-1) + " " + y];
}

function food(){
	do{
		food_x = Math.floor((Math.random()*44)+0);
		food_y = Math.floor((Math.random()*34)+0);
	}
	while((document.getElementById("riga_"+ food_y +"_colonna_"+ food_x).style.backgroundColor == 'rgb(0, 0, 0)') || (food_x == x && food_y == y));
	document.getElementById("riga_"+ food_y +"_colonna_"+ food_x).style.backgroundImage = "url(" + immagini[1].src + ")";
	if(cibo==3){
		cibo = 0;
		bon = 0;
		bonus();
	}
	if(bon == 1)cibo++;
}

function bonus(){
	do{
		bonus_x = Math.floor((Math.random()*44)+0);
		bonus_y = Math.floor((Math.random()*34)+0);
	}
	while(document.getElementById("riga_"+ bonus_y +"_colonna_"+ bonus_x).style.backgroundColor == 'rgb(0, 0, 0)' || (bonus_x == food_x && bonus_y == food_y) || (bonus_x == x && bonus_y == y));
	document.getElementById("riga_"+ bonus_y +"_colonna_"+ bonus_x).style.backgroundImage = "url(" + immagini[0].src + ")";
	bonus_menu.style.visibility = "visible";
	interval_bonus = setInterval('bonus_dec()',velocita);
}

function bonus_dec(){
	if(conta.firstChild.nodeValue != 0){
		conta.firstChild.nodeValue--;
	}
	if(conta.firstChild.nodeValue == 0){
		clearInterval(interval_bonus);
		bon = 1;
		bonus_menu.style.visibility = "hidden";
		conta.firstChild.nodeValue = 100;
		document.getElementById("riga_"+ bonus_y +"_colonna_"+ bonus_x).style.backgroundImage = "none";
	}
}

function key(e){
	e = (!e) ? window.event : e;
	var tasto = (e.which != null) ? e.which : e.keyCode; 
	if(inizio_gioco==0) clearInterval(inter);
	else{
		switch(tasto){
			case 37: 	if(right == 1 && bottom != 1){
							clearInterval(inter);
							move(-1,0);
							inter=setInterval('move(-1,0)',velocita);
							right = 0;
							bottom = 1;
						}     //left
						break;
			case 38: 	if(bottom == 1){
							clearInterval(inter);
							move(0,-1);
							inter=setInterval('move(0,-1)',velocita);
							bottom = 0;
							right = 1;
						}     //top
						break;
			case 39:  	if(right == 1){
							clearInterval(inter);
							move(1,0);
							inter=setInterval('move(1,0)',velocita);
							right = 0;
							bottom = 1;
						}     //right
						break;
			case 40:  	if(bottom ==1){
							clearInterval(inter);
							move(0,1);
							inter=setInterval('move(0,1)',velocita);
							bottom = 0;
							right = 1;
						}     //bottom
						break;
			default:
		}
	}
}

function move(x1,y1){
	if(x+x1>44 || x+x1<0 || y+y1>34 || y+y1<0 || document.getElementById("riga_"+ (y+y1) +"_colonna_"+ (x+x1)).style.backgroundColor == 'rgb(0, 0, 0)' || document.getElementById("riga_"+ (y+y1) +"_colonna_"+ (x+x1)).style.backgroundColor == bg[1]){
		inizio_gioco = 0;
		clearInterval(inter);
		clearInterval(interval_bonus);
		do var salva=window.prompt("Hai perso, il tuo punteggio e': \t" + punteggio +" \rInserisci il tuo nome:");
		while(salva == "" || !salva);
		salva_ajax(salva,punteggio);
		iniz_snake();
		torna_menu();
	}
	else{
		if(food_x==x+x1 && food_y==y+y1){
			document.getElementById("riga_"+ food_y +"_colonna_"+ food_x).style.backgroundImage = "none";
			food();
			punteggio += molti;
			lungo = 1;
			document.getElementById('currentscore').firstChild.nodeValue = punteggio;
			if(punteggio >= punteggio_migliore){
				punteggio_migliore = punteggio;
			}
			document.getElementById("bestscore").firstChild.nodeValue = punteggio_migliore;
		}
		else if(bonus_x==x+x1 && bonus_y==y+y1 && bon==0){
			document.getElementById("riga_"+ bonus_y +"_colonna_"+ bonus_x).style.backgroundImage = "none";
			clearInterval(interval_bonus);
			lungo = 1;
			bon = 1;
			bonus_menu.style.visibility = "hidden";
			var current_bonus = parseInt(conta.firstChild.nodeValue);
			punteggio += current_bonus;
			conta.firstChild.nodeValue = 100;
			document.getElementById("currentscore").firstChild.nodeValue = punteggio;
			if(punteggio >= punteggio_migliore) punteggio_migliore = punteggio;
			document.getElementById("bestscore").firstChild.nodeValue = punteggio_migliore;
		}
		else lungo = 0;
		testa = document.getElementById("riga_"+ y +"_colonna_"+ x);
		if(lungo == 0){
			ultimo_xy = serpente.shift();
			ultimo_xy = ultimo_xy.split(" ");
		}
		else ultimo_xy = serpente[0].split(" ");
		serpente.push(x + " " + y);
		ultimo = document.getElementById("riga_"+ ultimo_xy[1] +"_colonna_"+ ultimo_xy[0]);
		x += x1;
		y += y1;
		var pun = document.getElementById("riga_"+ y +"_colonna_"+ x);
		pun.style.backgroundColor = testa.style.backgroundColor;
		pun.style.border = testa.style.border;
		testa.style.backgroundColor = ultimo.style.backgroundColor;
		testa.style.border = ultimo.style.border;
		if(lungo==0){
			ultimo.style.backgroundColor = bg[0];
			ultimo.style.border = "1px solid transparent";
		}
	}
}
