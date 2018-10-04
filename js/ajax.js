//ajax.js

function save(nome,punteggio,lab){
	var richiesta;
	try{ richiesta = new XMLHttpRequest(); }
	catch(e){
		try{ richiesta = new ActiveXObject("Msxm12.XMLHTTP");}
		catch(e){
			try{richiesta = new ActiveXObject("Microsoft.XMLHTTP");}
			catch(e) {
				return false;
			}
		}
	}
	richiesta.open("GET","php/save_db.php?nome="+nome+"&punteggio="+punteggio+"&lab="+lab,true);
	richiesta.send(null);
}

function visualizza(lab){
	var richiesta;
	try{ richiesta = new XMLHttpRequest(); }
	catch(e){
		try{ richiesta = new ActiveXObject("Msxm12.XMLHTTP");}
		catch(e){
			try{richiesta = new ActiveXObject("Microsoft.XMLHTTP");}
			catch(e) {
				return false;
			}
		}
	}
	richiesta.open("GET","php/punteggi.php?lab="+lab,true);
	richiesta.send(null);
	richiesta.onreadystatechange = function(){
		if(richiesta.readyState == 4){
			document.getElementById('punteggi_db').innerHTML = richiesta.responseText;
		}
	}
}