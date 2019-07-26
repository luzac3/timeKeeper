// イベント列挙
window.onload=function(){
    let button = document.getElementsByTagName("button");

    // ボタン押下時
    elemEventSetter(button,"click",function(){
        if(this.value=="add" || this.value=="del"){
            let itemNumIaD = new ItemNumIaD(document.getElementbyId("joinner").getElementsByClassName("joinner"));

            if(this.value=="add"){
                itemNumIaD.add("joinner_");
            }else{
                itemNumIaD.del();
            }
        }

        if(this.value=="register"){
            let cntntArr = {};

            let nodeList = document.getElementsByTagName("table")[0].getElementsByTagName("input");

            let len = 0;

            for(let i=0; i < len; i++){
                cntntArr[nodeList[len].id] = nodeList[len].value;
            }
        }
    });
}

class ItemNumIaD {
    constructor(nodeList){
        this.nodeList = nodeList;
        this.classNum = nodeList.length;

        this.parent = nodeList[classNum-1].parentNode;
    }

    add(idName){
        let addItem = this.nodeList[this.classNum - 1].cloneNode();
        addItem.value = "";
        addItem.id = idName + "_" + classNum;

        this.parent.insertBefore(addItem, this.nodeList[this.classNum - 1].nextSibling);
    }

    del(){
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