<?php
header('Content-Type: text/html; charset=utf8mb4');
$root = $_SERVER["DOCUMENT_ROOT"];

require_once $root . '/timeKeeper/common/php/stored.php';
require_once $root . '/timeKeeper/common/php/insertMaker.php';

if(!empty($_POST["argArr"])){
    $argArr = $_POST["argArr"];
    $userDeleteCntntArr = $argArr["userDeleteCntnt"];
    $storedName = "deleteJnnr";

    // ストアドプロシージャ呼び出し
    $result = stored(
        $storedName
        ,null
    );

    $output = insertMaker($argArr);

    echo json_encode($output);
}else{
    echo json_encode(0);
}
?>
