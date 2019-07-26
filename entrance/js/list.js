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
