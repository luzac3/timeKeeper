// イベントURLを取得し、PHPに連携する
function getEventUrl(){
    let url = document.getElementById("url").value;

    // ドメインを取得
    // url:https//twipla.jp/
    if(url.indexOf("twipla") != -1){
        return;
    }

    // ドメインがTwiplaでない場合、警告を表示してReturn

    // Ajaxを使ってデータを取得、展開
    $.ajax({
        url: phpAddr
        ,cache: false
        ,timeout: 1000
        ,type:'POST'
        ,dataType: 'json'
        ,data:{
            url:url
        }
        //,processData: false
        //,contentType: false
        //,traditional: true
    }).then(
        function(data){
            console.log(data);
            document.getElementById("dataContent").innerHTML(data);
            getJoinnerList();
        },
        function(XMLHttpRequest, textStatus, errorThrown){
            console.log("更新処理に失敗しました");
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
            reject(0);
        }
    );
}

function getJoinnerList(){
    // 展開された参加者などのリストを取得する

    // Tステータス(ついぷらでのステータス)と、ユーザステータス(支払い済み・参加済みなど)を追加
}