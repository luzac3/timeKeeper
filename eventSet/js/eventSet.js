// イベント列挙
window.onload=function(){
    let button = document.getElementsByTagName("button");

    elemEventSetter(
            document.getElementById("joinner").getElementsByClassName("joinner")
            ,"change"
            ,disabledJoinnerEvent
            ,null
    );

    // ボタン押下時
    elemEventSetter(button,"click",function(){
        if(this.value=="add" || this.value=="del"){
            let itemNumIaD = new ItemNumIaD(document.getElementById("joinner").getElementsByClassName("joinner"));

            if(this.value=="add"){
                itemNumIaD.add("joinner"
                    ,{
                        event:"change"
                        ,eventFunc:disabledJoinnerEvent
                        ,argArr:null
                    }
                );

                let joinnerElements = document.getElementsByClassName("joinner");
                let joinnerElementsLen = joinnerElements.length;

                let disabledAddJoinner = disabledJoinnerEvent.bind(joinnerElements[joinnerElementsLen-1]);

                disabledAddJoinner();
            }else{
                itemNumIaD.del();
            }
        }

        if(this.value=="register"){

            let cntntArr = {};

            let nodeList = document.getElementsByTagName("table")[0].getElementsByTagName("input");

            let len = nodeList.length;

            for(let i=0; i < len; i++){
                cntntArr[nodeList[i].id] = nodeList[i].value;
            }

            let joinnerNodeList = document.getElementsByClassName("joinner");

            len = joinnerNodeList.length;

            sqlJoinnerArr = [];

            for(let i=0; i < len; i++){
                sqlJoinnerArr[i]=[
                  cntnt["cntntCd"]
                  ,joinnerNodeList[i].value
                  ,"null"
                ]
            }

            let parentEvntCd = document.getElementById("parentEvntCd").value;

            argArr = {
                tableNameCntnt:"T_CNTNT"
                ,sqlCntnt:[
                    cntntArr["cntntCd"]
                    ,parentEvntCd
                    ,cntntArr["title"]
                    ,cntntArr["starthour"]
                    ,cntntArr["starttime"]
                    ,cntntArr["endhour"]
                    ,cntntArr["endtime"]
                    ,cntntArr["gatherhour"]
                    ,cntntArr["gathertime"]
                    ,cntntArr["content"]
                    ,cntntArr["remarks"]
                ]
                ,tableNameJoinner:"T_CNTNT_JNNR"
                ,sqlJoinner:sqlJoinnerArr
                ,cntntCd:cntntArr["cntntCd"]
            };

            defaultAjax("/timeKeeper/eventSet/php/register.php",argArr).then(function(data){
              // ページ繊維
              alert("OK");
            });

            // registerで実装
            let deleteArr = {
                sql:"DELETE FROM T_CNTNT_JNNR WHERE CNTNT_CD = '"+cntnt["cntntCd"]+"'"
            }
        }
    });
}

function disabledJoinnerEvent(){
            console.log(this);
            console.log(this.getElementsByTagName("select")[0].value);

            let choosedValue = this.getElementsByTagName("select")[0].value;

            // 全リストを取得
            let joinnerList = document.getElementsByClassName("joinner");

            let joinnerLen = joinnerList.length;

            // 先に全選択値のリストを作る
            let allSelectedValue = [];

            for(let i=0; i<joinnerLen; i++){
                allSelectedValue.push(joinnerList[i].getElementsByTagName("select")[0].value);
            }

            // 現オブジェクトの選択値を取得
            let nowSelectedValue = this.getElementsByTagName("select")[0].value;

            for(let i=0; i<joinnerLen; i++){
                // 現オブジェクトの選択値を取得
                let nowSelectedValue = joinnerList[i].getElementsByTagName("select")[0].value;

                // １selectの参加者リストを取得
                let joinner = joinnerList[i].getElementsByTagName("option");

                let joinnerLength = joinner.length;

                for(let k=0; k<joinnerLength; k++){
                    if(joinner[k].value === ""){
                        continue;
                    }

                    // 自分の値はDisabledしない
                    if(joinner[k].value == nowSelectedValue){
                        continue;
                    }

                    joinner[k].disabled = false;
                    // 一度解除した上で、全値リストに存在したらDisabledにする
                    if(allSelectedValue.indexOf(joinner[k].value) >=0){
                        joinner[k].disabled = true;
                    }
                }
            }
}

class ItemNumIaD {
    constructor(nodeList){
        this.nodeList = nodeList;
        this.classNum = nodeList.length;

        this.parent = nodeList[this.classNum-1].parentNode;
    }

    add(idName,eventElemsArr=null){
        let addItem = this.nodeList[this.classNum - 1].cloneNode(true);
        addItem.value = "";
        addItem.id = idName + "_" + (this.classNum + 1);

        if(eventElemsArr){
            // 追加した要素にイベントリスナを付与
            elemEventSetter(
                addItem
                ,eventElemsArr["event"]
                ,eventElemsArr["eventFunc"]
                ,eventElemsArr["argArr"]
            );
        }

        this.parent.insertBefore(addItem, this.nodeList[this.classNum - 1].nextElementSibling);

    }

    del(firstNodeDelFlg=false){
        if(!firstNodeDelFlg){
            if(this.classNum<2){
                return;
            }
        }
        this.parent.removeChild(this.nodeList[this.classNum - 1]);
    }
}


function elemEventSetter(elems,event,eventFunc,argArr=null){
    if(elems[0]){
        let len = elems.length;
        for(let i=0; i<len; i++){
            elems[i].addEventListener(event,eventFunc,this,argArr);
        }
    }else{
        elems.addEventListener(event,eventFunc,this,argArr);
    }
}
