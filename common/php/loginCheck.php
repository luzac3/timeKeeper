<?php
$root = $_SERVER["DOCUMENT_ROOT"];
require_once $root . '/timeKeeper/common/php/stored.php';

if(!empty($_POST["argArr"])){
    // 平文パスワード
    $twitterId = $_POST["argArr"]["twitterId"];
    $pass = $_POST["argArr"]["pass"];
    $arg_arr = array(
        $twitterId
    );

    $pass = $_POST["argArr"]["pass"];

    $result = stored("getHash",array($twitterId));
      if(!$result[0]){
          echo json_encode("権限が無いか、IDが間違っています");
          return;
      }
      $hash = $result[0]["HASH"];

    // パスワードを検証する
    if (hash_equals($hash,crypt($pass, $hash))) {
        setcookie("twitterId",$twitterId);
        setcookie("admin",1);

        // 正常終了
        echo 0;
    } else {
        // パスワードが間違っている場合
        echo json_encode("パスワードが違います");
    }

}else{
    // 未知のエラー
        echo json_encode("未知のエラーです");
}

?>
