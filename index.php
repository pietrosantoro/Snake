<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
 "http://www.w3.org/TR/html4/strict.dtd">

<html>
	<head>
		<title>Snake</title>
		<meta http-equiv = "Content-Type" content = "text/html; charset=ISO-8859-15">
		<link rel="stylesheet" href="css/style.css" type="text/css">
	</head>
	<body onLoad="crea()">
		<div id="scritta">
		</div>
		<div id="logo">
		</div>
		<div id="box">
			<p id="rule" style="visibility:hidden">
				Snake e' un gioco nato negli anni '70 in cui viene simulato il movimento di un serpente.
				Muovi il serpente con le frecce direzionali e mangia i frutti che compaiono sul terreno di gioco per far allungare il serpente. 
				Per totalizzare un maggior punteggio, raccogli i bonus che appariranno sul terreno. 
				Per mantenere in vita il serpente, stai attento a non toccare le pareti; inoltre il serpente, per rimanere in vita, non dovra' toccare se stesso.
				Scegli il livello di difficolta' e inizia il gioco.
			</p>
			<div id="menu" style="visibility: visible">
				<div class="pulsanti_menu" id="new_game" onClick="game()">INIZIA IL GIOCO
				</div>
				<div class="pulsanti_menu" id="level">LIVELLO: 
					<span class="freccia" onClick="level('meno')"> < </span>
					<span id="livello">NORMALE</span>
					<span class="freccia" onClick="level('piu')"> > </span>
				</div>
				<div class="pulsanti_menu" id="labirinto">LABIRINTO:
					<span class="freccia" onClick="labirinto('meno')"> < </span>
					<span id="labi">Nessun labirinto</span>
					<span class="freccia" onClick="labirinto('piu')"> > </span>
				</div>
				<div class="pulsanti_menu" id="highscores" onClick="punteggi()">PUNTEGGI MIGLIORI
				</div>
				<div class="pulsanti_menu" id="regole" onClick="regole()">REGOLE DEL GIOCO
				</div>
				<div id="torna" style="visibility:hidden">
					<div id="punteggi_db" style="visibility:hidden">
					</div>
					<div class="pulsanti_menu" id="back" onClick="torna_menu()">TORNA AL MENU
					</div>
					<div class="pulsanti_menu" id="start" onClick="game()">INIZIA IL GIOCO
					</div>
				</div>
			</div>
		</div>
			<div id ="highscore">
				<fieldset id="bonus" style="visibility: hidden">
					<legend style="color:blue;">BONUS</legend>
					<p id="conto" style="text-align:center">100</p>
				</fieldset>
				<fieldset id="b_score">
					<legend style="color:red;">PUNTEGGIO MIGLIORE:</legend>
						<?php
							$connessione = mysql_connect('localhost', 'pietrosantoro')
							or die("Connessione non riuscita:" . mysql_error());
							mysql_select_db("my_pietrosantoro")
							or die("Selezione del database non riuscita:" . mysql_error());
							$query="SELECT nome,punteggio FROM BEST ORDER BY punteggio DESC";
							$ris = mysql_query($query);
							$row = mysql_fetch_array($ris);
							echo"<p id='bestscore' style='text-align:center'>";
							if($row)echo"$row[punteggio]";
							else echo"0";
							echo"</p>";
							?>
				</fieldset>
				<fieldset id="c_score">
					<legend style="color:red;">PUNTEGGIO ATTUALE:</legend>
					<p id="currentscore" style="text-align:center">0</p>
				</fieldset>
			</div>
			<script type="text/javascript" src="js/ajax.js"></script>
			<script type="text/javascript" src="js/menu.js"></script>
			<script type="text/javascript" src="js/game.js"></script>
	</body>
</html>