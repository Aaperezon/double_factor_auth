<?php 
    require "connection.php";
    $bindings = [];
    $result=[];
    if($pdo!=null){
        error_log("Connection is not null");
        $parameters = ['user', 'password', 'first_doubleFA', 'second_doubleFA', 'third_doubleFA'];
        $received = json_decode(file_get_contents('php://input'),true);
        foreach ($parameters as $parameter){
            if(!isset( $received[$parameter]) ){
                $result =  "Parameter '".$parameter."' missing";
                break;
            }else{
                $bindings[] = $received[$parameter];
            }
        }
        if($result==null){
            $sql = 'INSERT INTO user( time, user, password, first_doubleFA, second_doubleFA, third_doubleFA) VALUES 
                (CURRENT_TIMESTAMP,?,sha2(?,256),?,?,?)';
            $stmt = $pdo->prepare($sql);
            if($stmt->execute($bindings)){
                $sql2 = 'SELECT id FROM user WHERE user="'.$bindings[0].'" and password=sha2("'.$bindings[1].'",256);';
                $stmt2 = $pdo->prepare($sql2);
                if($stmt2->execute()){
                    while($row = $stmt2->fetch(PDO::FETCH_NUM)){
                        $result[] = $row;
                    }
                }

            }
            else{
                $result = "Insertion Error";
            }
        }
    }
    else{
        $result = "Connection Error";
    }
    echo json_encode($result);
?>
