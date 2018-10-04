<?php
	$connessione = mysql_connect('localhost', 'pietrosantoro')
	or die("Connessione non riuscita:" . mysql_error());
	mysql_select_db("my_pietrosantoro")
	or die("Selezione del database non riuscita:" . mysql_error());
	$nome = $_GET['nome'];
	$punteggio = $_GET['punteggio'];
	$lab = $_GET['lab'];
	if($lab==0)
		$query = "INSERT INTO my_pietrosantoro.BEST (Nome, Punteggio) VALUES ('$nome','$punteggio')";
	if($lab==1)
		$query = "INSERT INTO my_pietrosantoro.LAB1 (Nome, Punteggio) VALUES ('$nome','$punteggio')";
	if($lab==2)
		$query = "INSERT INTO my_pietrosantoro.LAB2 (Nome, Punteggio) VALUES ('$nome','$punteggio')";
	mysql_query($query);
	mysql_close($connessione);
	?>