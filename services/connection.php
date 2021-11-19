<?php 
    $servername = "185.156.219.144";
    $username = "s154717_aaron";
    $password = "Aaron1#{}";
    $dbname = "s154717_double_factor_auth";

    try {
        $pdo = new PDO('mysql:host='.$servername.';dbname='.$dbname, $username, $password);

        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        $pdo = null;
    }     
?>
