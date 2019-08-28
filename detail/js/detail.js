// イベント列挙
window.onload=function(){
    //(elems,event,eventFunc,argArr=null)
    elemEventSetter(
        document.getElementsByTagName("button")
        ,"click"
        ,function(){
            let cntntCd = document.getElementById("cntntCd").value;
            let timeArr = document.getElementById("time").value.split(":");
            let hour = timeArr[0];
            let min = timeArr[1];

            let time= hour + ":" + min + ":00";

            console.log(time);
            if(this.value=="delay"){
                call_stored("delayCntnt",[cntntCd,time]).then(function(){
                    // 現在のコンテンツの開催時間と比較し、それより「開催が」遅いコンテンツをすべて後ろに動かす
                    location.reload();
                },function(error){
                    console.log(error);
                    alert("処理エラーが発生しました");
                });
            }else if(this.value=="advance"){
                call_stored("advanceCntnt",[cntntCd,time]).then(function(){
                    // 現在のコンテンツの開催時間と比較し、それより「開催が」遅いコンテンツをすべて後ろに動かす
                    location.reload();
                },function(){
                    alert("処理エラーが発生しました");
                });
            }
        }
        ,null
    );

    // 変更待機起動(チェックボックスの変更待機項目。Adminユーザの場合のみ起動する
    // 変更を受信したら上部の内容を書き換え
    if(document.getElementById("adminUser")){
        elemEventSetter(
            document.getElementsByName("joinnerList")
            ,"change"
            ,function(){
                let jnnrCd = this.value;
                let text = this.parentNode.innerText;
                let cntntCd = document.getElementById("cntntCd").value;

                let gthrFlg = null;
                if(this.checked){
                    gthrFlg = 1;
                }

                defaultAjax(
                  {
                    tableName:"T_CNTNT_JNNR"
                    ,sql:[cntntCd,jnnrCd,gthrFlg]
                    ,terms:"JNNR_CD='"+jnnrCd+"' AND CNTNT_CD='"+cntntCd+"'"
                  }
                  ,"/timeKeeper/detail/php/register.php").then(
                function(){
                    let parentElem = document.getElementById("notIn");

                    if(gthrFlg){
                        console.log(document.getElementById(jnnrCd));
                        let delTarget = document.getElementById(jnnrCd).nextElementSibling;
                        if(delTarget){
                            parentElem.removeChild(delTarget);
                        }
                        parentElem.removeChild(document.getElementById(jnnrCd));
                    }else{
                        let elem = document.createElement("span");

                        elem.id=jnnrCd;
                        elem.innerText=text;

                        parentElem.appendChild(elem);
                        parentElem.appendChild(document.createElement('br'));

                    }
                    let jnnrList = document.getElementsByName("joinnerList");
                    let noCheckedNum = 0;
                    jnnrList.forEach(function(jnnr){
                        if(!jnnr.checked){
                            noCheckedNum++;
                        }
                    });

                    if(!noCheckedNum){
                        if(window.confirm('本当に全参加者が集合済ですか？')){
                            // 全ユーザー参加完了していたらステータスの更新
                            call_stored("setStatus",[cntntCd,"3"]).then(function(){
                                location.reload();
                            },function(){
                                alert("処理エラーが発生しました");
                            });
                        }else{
                            alert("参加者の確認を行ってください");
                        }
                    }
                },function(){
                    alert("処理エラーが発生しました");
                });
            }
            ,null
        );

        elemEventSetter(
            document.getElementsByName("ready")
            ,"change"
            ,function(){
                let cntntCd = document.getElementById("cntntCd").value;
                if(this.checked){
                    if(window.confirm('本当にすべての準備が完了しましたか？')){
                        call_stored("setStatus",[cntntCd,"5"]).then(function(){
                            location.reload();
                        },function(){
                            alert("処理エラーが発生しました");
                        });
                    }
                }
            }
            ,null
        );
    }
}
