// イベント列挙
window.onload = function(){
    getServerTime.then(function(date){
        hour = date.getHours();
        time = date.getMinutes();

        document.getElementById("nowTimeShow").textContent = hour.toString().padStart(2,"0") + ":" + time.toString().padStart(2,"0");
    });

    let chooseTime = document.getElementsByName("chooseTime");

    chooseTime.forEach(function(element){
        element.addEventListener("click", changeTimeType);
    });

    elemEventSetter(
        document.getElementById("csv")
        ,"click"
        ,function(){
            let elems = document.getElementById("list").getElementsByTagName("p");
            let textDataArr = [];
            let textData = "";
            let elemsLen = elems.length;
            let parentContentTime = "";

            for(let i=0; i<elemsLen; i++){
                let textArr = elems[i].textContent.split("\n");

                let startTime = textArr[1].trim().split("～")[0];
                if(startTime == parentContentTime){
                    textDataArr.splice(textDataArr.length-4,4);
                }
                parentContentTime = startTime;

                textDataArr.push(
                    textArr[1].trim()
                    ,","
                    ,textArr[2].trim()
                    ,"\n"
                );
            }

            textDataArr.forEach(function(text){
                textData += text;
            });

            let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
            let blob = new Blob([ bom, textData], { "type" : "text/csv" });
            if (window.navigator.msSaveBlob) { //IEの場合の処理
                window.navigator.msSaveBlob(blob, "kikakuList.csv");
            } else {
                this.href = URL.createObjectURL(blob);
            }
        }
        ,null
    );
}

function changeTimeType(){
    const chooseTime = this;

    let hour = 0;
    let time = 0;

    if(chooseTime.value=="0"){
        hour = document.getElementById("userInputHour").value;
        time = document.getElementById("userInputTime").value;
    }else{
        getServerTime.then(function(date){
            hour = date.getHours();
            time = date.getMinutes();

            document.getElementById("nowTimeShow").textContent = hour.toString().padStart(2,"0") + ":" + time.toString().padStart(2,"0");
        });
    }

    if(time > 60){
        hour += Math.floor(time / 60);
        time = time % 60;
    }

    if(hour > 24){
        alert("時間が24を超過しないように入力してください");
        return;
    }

    document.getElementById("nowTimeShow").textContent = hour.toString().padStart(2,"0") + ":" + time.toString().padStart(2,"0");
}
