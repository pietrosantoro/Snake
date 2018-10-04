<?php
	$connessione = mysql_connect('localhost', 'pietrosantoro')
	or die("Connessione non riuscita:" . mysql_error());
	mysql_select_db("my_pietrosantoro")
	or die("Selezione del database non riuscita:" . mysql_error());
	$lab = $_GET['lab'];
	if($lab==0)
		$query="SELECT nome,punteggio FROM BEST ORDER BY punteggio DESC";
	if($lab==1)
		$query="SELECT nome,punteggio FROM LAB1 ORDER BY punteggio DESC";
	if($lab==2)
		$query="SELECT nome,punteggio FROM LAB2 ORDER BY punteggio DESC";
	$ris = mysql_query($query);
	$row = mysql_fetch_array($ris);
	if($row){
		echo "<ol>";
		echo"<li>$row[nome]";
		echo"<span class='space' style='color:red'>$row[punteggio]</span></li>";
		for($i=0;($row = mysql_fetch_array($ris)) && ($i<9);$i++){
			echo"<li>$row[nome]";
			echo"<span class='space'>$row[punteggio]</span></li>";
		}
		echo"</ol>";
	}
	mysql_free_result($ris);
	mysql_close($connessione);
?>

