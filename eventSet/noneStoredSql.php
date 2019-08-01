<?php
if(!empty($_POST)){
    $root = $_SERVER["DOCUMENT_ROOT"];

    require_once ("conection.php");
    $mysqli = db_connect ();

    $argArr = $_POST["argArr"];

    $sql = $argArr["sql"];

    if($mysqli->query($sql)){
        return 1;
    }else{
    	return 0;
    }
}

?>