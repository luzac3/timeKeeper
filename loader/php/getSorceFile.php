<?php
    // リンク先のソースファイルを取得するためのPHP
    // 今回の場合、Twipla以外のリンクははじくのでURLのチェックは行われている前提
    if(!empty($_POST)){
        //
        $url = $_POST["url"];
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $html = curl_exec($ch);
        echo json_encode($html);
        curl_close($ch);
    }else{
        echo 0;
    }