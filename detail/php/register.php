<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/timeKeeper/common/php/stored.php';
require_once $root . '/timeKeeper/common/php/insertMaker.php';
require_once $root . '/timeKeeper/common/php/updateMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];

    $output = updateMaker(
      array(
        "tableName"=>$argArr["tableName"]
        ,"sql"=>$argArr["sql"]
        ,"terms"=>$argArr["terms"]
      )
    );

    echo json_encode($output);
}else{
    echo json_encode(0);
}
?>
