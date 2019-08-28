// イベント列挙
window.onload=function(){
    let button = document.getElementsByTagName("button");

    // ボタン押下時
    elemEventSetter(button,"click",function(){
        if(this.value=="register"){

            let cntntArr = {};
            let sqlJoinnerArr = [];

            let cntntCd = document.getElementById("cntntCd").value;

            let nodeList = document.getElementsByTagName("table")[0].getElementsByTagName("input");

            let nodeListLen = nodeList.length;

            for(let i=0; i < nodeListLen; i++){
                if(nodeList[i].className=="userListBox"){
                    if(nodeList[i].checked){
                      sqlJoinnerArr.push([
                          cntntCd
                          ,nodeList[i].value
                          ,NULL
                      ]);
                    }
                    continue;
                }
                cntntArr[nodeList[i].id] = nodeList[i].value;
            }

            let textAreaNodeList = document.getElementsByTagName("textarea");

            let textAreaNodeListLen = textAreaNodeList.length;

            for(let i=0; i < textAreaNodeListLen; i++){
                cntntArr[textAreaNodeList[i].id] = textAreaNodeList[i].value;
            }

            let parentEvntCd = document.getElementById("parentEvntCd").value;

            let startDate = cntntArr["eventDate"]+cntntArr["starthour"].padStart(2,"0")+cntntArr["starttime"].padStart(2,"0")+"00";
            let endDate = cntntArr["eventDate"]+cntntArr["endhour"].padStart(2,"0")+cntntArr["endtime"].padStart(2,"0")+"00";
            let gatherDate = cntntArr["eventDate"]+cntntArr["gatherhour"].padStart(2,"0")+cntntArr["gathertime"].padStart(2,"0")+"00";

            argArr = {
                tableNameCntnt:"T_CNTNT"
                ,sqlCntnt:[
                    cntntArr["cntntCd"]
                    ,parentEvntCd
                    ,cntntArr["title"]
                    ,cntntArr["status"]
                    ,startDate
                    ,endDate
                    ,gatherDate
                    ,cntntArr["content"]
                    ,cntntArr["remarks"]
                ]
                ,sqlCntntTerms:"CNTNT_CD = '"+cntntArr["cntntCd"]+"'"
                ,tableNameJoinner:"T_CNTNT_JNNR"
                ,sqlJoinner:sqlJoinnerArr
                ,cntntCd:cntntArr["cntntCd"]
            };

            defaultAjax(argArr,"/timeKeeper/eventSet/php/register.php").then(function(data){
                // ページ繊維
                location.href="/timeKeeper/eventSet/html/complete.html";
            },function(){
                location.href="/timeKeeper/eventSet/html/error.html";
            });
        }
    });
}
