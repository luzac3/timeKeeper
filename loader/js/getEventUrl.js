window.onload=function(){
  elemEventSetter(
    document.getElementsByTagName("button")[0]
    ,"click"
    ,getEventUrl
  )
}
// イベントURLを取得し、PHPに連携する
function getEventUrl(){
    let url = document.getElementById("url").value;

    // ドメインを取得
    // url:https//twipla.jp/
    if(url.indexOf("twipla") == -1){
        return;
    }

    // ドメインがTwiplaでない場合、警告を表示してReturn

    // Ajaxを使ってデータを取得、展開
    $.ajax({
        url: "/timeKeeper/loader/php/getSorceFile.php"
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
            document.getElementById("dataContent").innerHTML = data;
            getJoinnerList();
            document.getElementById("dataContent").innerHTML = "";

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
    let joinList = document.getElementsByClassName("member_list")[0].getElementsByClassName("namelist");
    let interestList = document.getElementsByClassName("member_list")[1].getElementsByClassName("namelist");
    let nonParticipateList = document.getElementsByClassName("member_list")[2].getElementsByClassName("namelist");

    let joinListLen = joinList.length;
    let interestListLen = interestList.length;
    let nonParticipateListLen = nonParticipateList.length;

    let joinnerArr = [];
    let interestArr = [];
    let nonParticipateArr = [];

    // 参加リスト
    joinnerArr = setJoinList(joinList,joinListLen,"1","0");

    // 興味ありリスト
    interestArr = setJoinList(interestList,interestListLen,"2","0");

    // 不参加リスト
    nonParticipateArr = setJoinList(nonParticipateList,nonParticipateListLen,"3","3");

    let wholeArr = joinnerArr.concat(interestArr).concat(nonParticipateArr);

    console.log(wholeArr);

    // 主催、開催日を取得

    // 削除処理後、insertMakerに引き渡すPHPregister処理
    defaultAjax(
      {
        sql:wholeArr
        ,tableName:"T_JNNR"
      }
      ,"/timeKeeper/loader/php/register.php"
    ).then(function(data){
        alert("抽出完了");
    },function(){

    })

}

function setJoinList(list,listLen,status,userStatus){
  let resultArr = [];

  let commentList = document.getElementById("comment_list").getElementsByClassName("status-body2");
  let commentListLen = commentList.length;

  let num = 0;

  for(let i=0; i<listLen; i++){
      let joinnerInfo = new JoinnerInfo();
      joinnerInfo.cd = count().toString().padStart(4,"0");
      joinnerInfo.name = list[i].text;
      joinnerInfo.tid = list[i].title;
      joinnerInfo.status = status;
      joinnerInfo.userStatus = userStatus;
      for(let k=0; k < commentListLen; k++){
            let commentUserCd = commentList[k].getElementsByClassName("graysmall")[0].innerHTML.indexOf(joinnerInfo.name);
            if(commentUserCd != -1){
                joinnerInfo.comment += commentList[k].getElementsByClassName("comment_span")[0].innerHTML;
                joinnerInfo.comment += "\n";
            }
      }
      joinnerInfo.comment = joinnerInfo.comment.trim();
      resultArr[i] = joinnerInfo;
  }
  return resultArr;
}

let count = (function(){
    let num = 0;
    return function(){
      return num++;
    };
})();

let JoinnerInfo = function(){
    this.cd = "";
    this.name = "";
    this.tid = "";
    this.status = "";
    this.userStatus = "";
    this.comment = "";
}
