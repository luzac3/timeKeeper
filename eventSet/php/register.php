<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/timeKeeper/common/php/stored.php';
require_once $root . '/timeKeeper/common/php/insertMaker.php';
require_once $root . '/timeKeeper/common/php/updateMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];

    // 洗替でコンテンツのユーザーリストを削除
    $result = stored(
        "deleteCntntJnnr"
        ,array($argArr["cntntCd"])
    );

    $output1 = updateMaker(
      array(
        "tableName"=>$argArr["tableNameCntnt"]
        ,"sql"=>$argArr["sqlCntnt"]
        ,"terms"=>$argArr["sqlCntntTerms"]
      )
    );

    $output2 = insertMaker(
      array(
        "tableName"=>$argArr["tableNameJoinner"]
        ,"sql"=>$argArr["sqlJoinner"]
      )
    );

    echo json_encode($output2);
}else{
    echo json_encode(0);
}
?>
