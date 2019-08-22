// 要素の追加、削除を行う
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
