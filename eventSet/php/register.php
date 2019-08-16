<?php
header('Content-Type: text/html; charset=UTF-8');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/anc/common/php/stored.php';
require_once $root . '/anc/common/php/insertMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];
    $storedName = $argArr["storedName"];

    // 洗替でコンテンツのユーザーリストを削除
    $result = stored(
        "deleteCntntJnnr"
        ,$argArr["cntntCd"]
    );

    $output = insertMaker(array(
      "argArr"=>array(
        "tableName"=>$argArr["tableNameCntnt"]
        ,"sql"=>$argArr["sqlCntnt"]
      )
    ));
    
    $output = insertMaker(array(
      "argArr"=>array(
        "tableName"=>$argArr["tableNameJoinner"]
        ,"sql"=>$argArr["sqlJoinner"]
      ));

    echo json_encode(1);
}else{
    echo json_encode(0);
}
?>
