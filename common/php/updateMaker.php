<?php
header('Content-Type: text/html; charset=utf8mb4');
function updateMaker($argArr){
  $root = $_SERVER["DOCUMENT_ROOT"];

  require_once $root . '/timeKeeper/common/php/stored.php';
  require_once $root . '/timeKeeper/common/php/conection.php';
      $tableName = $argArr["tableName"];

      // 更新するカラム名を取得する
      $columnList = stored("getColumn",[$tableName]);
      // sqlファイル内容生成
      $sql = "SET NAMES utf8mb4;";

      $sql .= "UPDATE ";
      $sql .= $tableName;
      $sql .= " ";
      $sql .= "SET ";

      $updateDataArr = $argArr["sql"];
      $terms = $argArr["terms"];
      $num = 0;

      forEach($columnList as $column){
          $sql .= $column["Field"];
          if($updateDataArr[$num] == "null" || $updateDataArr[$num] == ""){
              $sql .= "=";
              $sql .= "NULL";
              $sql .= ",";
          }else{
              $sql .= "='";
              $sql .= $updateDataArr[$num];
              $sql .= "',";
          }
          $num++;
      };
      $sql = substr($sql, 0, -1);

      $sql.= " ";
      $sql.= "WHERE ";
      $sql.= $terms;
      $sql .= ";";

      $sql .= PHP_EOL . "COMMIT;";
      $sql .= PHP_EOL . "quit";

      // 一時ファイル用のタイムスタンプを取得
      $time = time();
      // 一時ファイル名を設定
      $tempFile = "updateTemp_" . $time . ".sql";

      // sqlファイル生成場所
      $sqlFileDir = $root . "timeKeeper/sql/";

      // sqlファイル生成
      file_put_contents($sqlFileDir.$tempFile, $sql);

      // ユーザー情報の指定
      $dbInfo = new DbInfo;

      $username = $dbInfo->username;
      $server = $dbInfo->server;
      $password = $dbInfo->password;
      $db_name = $dbInfo->db_name;

      $ret = "sh " . $root . "timeKeeper/common/sh/kickSql.sh " .$sqlFileDir.$tempFile. " " .$username. " " .$server. " " .$password. " " .$db_name;

      // sqlファイルを生成し、シェルスクリプトをキックすることで起動し、削除する
      $output = shell_exec("sh " . $root . "timeKeeper/common/sh/kickSql.sh " .$sqlFileDir.$tempFile. " " .$username. " " .$server. " " .$password. " " .$db_name);

      // ファイルの削除
      unlink($sqlFileDir.$tempFile);

      return $ret;
}
?>
