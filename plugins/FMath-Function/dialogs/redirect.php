<?php

	// public key sent by email like VTY6X-AZFPQ-Q1KS8-EP555
	$publicKey = "VTY6X-AZFPQ-Q1KS8-EPOW4"; 		

	// secret key from website https://math-on-web.com/users/ need to login
	$secretKey = "ba7356805f998ca8e55e51a9cb508436d2ba04d398943d749d36cd9a8e5307608c75add00444faaad095187f12c4d2b03d7888b89982cc3fe8e5395ef4966adf";		

	$time = round(microtime(true) * 1000);	// time in milisecond
	$calculated_hmac = hash_hmac('sha256', $publicKey . '-' . $time, $secretKey, false);

	$editorId = $_REQUEST['editorId'];
	$lang = $_REQUEST['lang'];

	$url = "https://math-on-web.com/license/domain/editor-stepF1.php";
	$url = $url . "?editorId=" . urlencode($editorId);
	$url = $url . "&lang=" . $lang ;
	$url = $url . "&key=" . urlencode($publicKey);
	$url = $url . "&time=" . $time;
	$url = $url . "&hash=" . $calculated_hmac;

	header("Location: " . $url);
?>