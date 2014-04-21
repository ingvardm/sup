'use strict';

/* DOM */
var pages = document.querySelector("#pages"),
    place_selector = document.querySelector("select"),
    go_button = document.querySelector(".go").querySelector(".button"),
    stats_button = document.querySelector(".stats").querySelector(".button"),
    stats_list = document.querySelector(".stats").querySelector(".statsList"),
    reset_button = document.querySelector(".reset"),
    metric_buttons = document.querySelector(".metrics").querySelectorAll(".button"),
    welcomeTo = document.querySelector(".welcome"),
    curDate = document.querySelector(".curDate");



/* Events */

place_selector.addEventListener("change", onPlaceChanged); 
go_button.addEventListener("click", onGoBtnClick);
stats_button.addEventListener("click", onStatsBtnClick);
reset_button.addEventListener("click", onResetBtnClick);
[].forEach.call(metric_buttons, function(btn){
    btn.addEventListener("click", onMetricBtnClick());
});



/* Event handlers */

function onPlaceChanged(){
    stats_list.classList.add("hidden");
    if (this.value) { go_button.classList.remove("hidden"); stats_button.classList.remove("hidden");} 
    else { go_button.classList.add("hidden"); stats_button.classList.add("hidden");}
}

function onGoBtnClick(){
    var today = new Date(),
        curDay = today.getDate(),
        curMonth = today.getMonth() + 1,
        curYear = today.getFullYear();
    
    curDate.innerHTML = "Today is: " + curDay +"/"+ curMonth +"/"+ curYear;
    welcomeTo.innerHTML = "Welcome to " + place_selector.value;
    pages.classList.toggle("active");
    var btnToShow = document.querySelector(".hiddenR");
    btnToShow.classList.toggle("hiddenR");
}

function onStatsBtnClick(){
    getStats();
}

function onResetBtnClick(){
    if (confirm("Are you sure ?")) {
        location.reload(true);
    }
}

function onMetricBtnClick(){
    /* Should use a closure with this one, 
       that way we dont loose the time pointer */
    /*var updater;*/
    return function(){
        if (this.classList.contains("done")) { return; }
        /*if (this.classList.contains("waiting")) {*/
            /* Timer is alredy running */
            /*clearInterval(updater);
            this.classList.add("done");
            this.innerHTML = "Done!"
            if (measurmentsDone()) { postMetricsData(); }
            return; 
        }*/

        /* First time click */
        /*updater = counter(new Date(), this.previousElementSibling);*/
        this.classList.toggle("done");
        var curTime = new Date(),
            curHour = curTime.getHours(),
            curMinutes = curTime.getMinutes(),
            curSeconds = curTime.getSeconds(),
            tStamp = Date.now();
        if (curMinutes <= 9){curMinutes = "0" + curMinutes}
        if (curSeconds <= 9){curSeconds = "0" + curSeconds}
        this.innerHTML = curHour + ":" + curMinutes + ":" + curSeconds;
        this.setAttribute("data-time", tStamp);
        if (measurmentsDone()) { postMetricsData(); return;}
        var btnToShow = document.querySelector(".hiddenR");
        btnToShow.classList.toggle("hiddenR");
    }

}



/* General use function declarations */

/*function counter(startTime, el){
    return setInterval(function(){
        var timeDiff = new Date() - startTime;
        el.innerHTML = convertTime(timeDiff);
    }, 1000);
}*/

//function convertTime(timestamp){
    /* strip ms */
    //timestamp /= 1000;
    //var seconds = Math.round(timestamp % 60);

    /* remove seconds */
    //timestamp = Math.floor(timestamp / 60);
    //var minutes = Math.round(timestamp % 60);

    /* remove minutes */
    //timestamp = Math.floor(timestamp / 60);
    //var hours = Math.round(timestamp % 24);

    /*return (hours < 10 ? "0" + hours : hours) + 
        ":" + (minutes < 10 ? "0" + minutes : minutes) + 
        ":" + (seconds  < 10 ? "0" + seconds : seconds);
}
*/
function postJSON(data){
    var request = new XMLHttpRequest();
    request.open("POST", "/metrics", true);
    request.setRequestHeader("Content-type", "application/json;");
    request.send(data);
}

function postMetricsData(){
    var data = {
        date: Date(),
        timestamp: Date.now(),
        place: place_selector.value,
        metrics: {}
    };

    [].forEach.call(document.querySelector(".metrics").children, function(m){
        data.metrics[m.dataset.role] = parseInt(m.querySelector(".done").getAttribute("data-time"), 10);
    });

    postJSON(JSON.stringify(data));
}

function measurmentsDone() {
    return [].every.call(metric_buttons, function(btn){
        return btn.classList.contains("done");
    });
}

function getStats(){
    var req = new XMLHttpRequest();
    var data;
    req.open('GET', '/metrics', true);
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
         if(req.status == 200){
            data = eval('('+ req.responseText +')');
            displayStats(data);
             
         }
         else
          alert("Error loading results.json");
      }
    };
    req.send(null);
}

function displayStats(e){
    var data = e,
        lastVisitDate = 0,
        avgVisitTime = 0,
        avgOrderTime = 0;
    for (var i=0;i<data.visits.length;i++){
        if (data.visits[i].place == place_selector.value){
            lastVisitDate = new Date(data.visits[i].timestamp);
            if (avgVisitTime == 0 && avgOrderTime == 0){
                avgVisitTime = data.visits[i].metrics.gotOut - data.visits[i].metrics.gotIN;
                avgOrderTime = data.visits[i].metrics.gotFood - data.visits[i].metrics.placedOrder;
            } else {
                avgVisitTime = Math.floor((avgVisitTime + data.visits[i].metrics.gotOut - data.visits[i].metrics.gotIN)/2);
                avgOrderTime = Math.floor((avgOrderTime + data.visits[i].metrics.gotFood - data.visits[i].metrics.placedOrder)/2);
            }
        }
        
    }
    printResults((lastVisitDate == 0 ? "Nothing to see here, move right along!" : "Last visit: " + lastVisitDate 
           + "</br>Avarage time spent: " + (avgVisitTime == 0 ? "No stats yet!" : Math.floor(avgVisitTime/1000)) 
            + "</br>Avarage order time: " + (avgOrderTime == 0 ? "No stats yet!" : Math.floor(avgOrderTime/1000))));
}

function printResults(e){
    stats_list.classList.remove("hidden");
    stats_list.innerHTML = e;
}