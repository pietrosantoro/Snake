//menu.js

var men = document.getElementById('menu');
var g = document.getElementById('box');
var back = document.getElementById("torna");
var punt = document.getElementById("punteggi_db");
var regole_testo = document.getElementById("rule");
var livelli = ["FACILE",
			"NORMALE",
			"DIFFICILE"];
var labirinti = ["Nessun labirinto",
				 "Numero 1",
				 "Numero 2"];
var l = 1;
var lab = 0;

function level(valore){
	var lvl = document.getElementById("livello");
	if(valore == 'meno' && l<=2 && l>0)
		lvl.firstChild.nodeValue = livelli[--l];
	if(valore == 'piu' && l<2 && l>=0)
		lvl.firstChild.nodeValue = livelli[++l];

}

function labirinto(valore){
	var lvl = document.getElementById("labi");
	if(valore=='meno' && lab<=2 && lab>0)
		lvl.firstChild.nodeValue = labirinti[--lab];
	if(valore=='piu' && lab<2 && lab>=0)
		lvl.firstChild.nodeValue = labirinti[++lab];
}

function punteggi(){
	g.style.backgroundColor = "#808000";
	men.style.visibility = "hidden";
	back.style.visibility = "visible";
	punt.style.visibility = "visible";
	visualizza(lab);
}

function salva_ajax(nome,punteggio){
	save(nome,punteggio,lab);
}

function regole(){
	men.style.visibility = "hidden";
	back.style.visibility = "visible";
	regole_testo.style.visibility = "visible";
}

function torna_menu(){
	g.style.backgroundColor = "#808000";
	regole_testo.style.visibility = "hidden";
	punt.style.visibility = "hidden";
	men.style.visibility = "visible";
	back.style.visibility = "hidden";
}