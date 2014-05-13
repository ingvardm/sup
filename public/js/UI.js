define(['dom', 'ms2h', 'server', 'globalTimer'], function(dom, _T, _server, _GT){
    var times = [];
    
    if (typeof(sessionStorage.times) !== 'undefined'){
        var times = sessionStorage.times.split(",");
    }

    var ui = {
        addEvLis: function(){
            
            dom.place_selector.addEventListener("change", this.onPlaceChanged); 
            dom.go_button.addEventListener("click", this.onGoBtnClick);
            //stats_button.addEventListener("click", onStatsBtnClick());
            dom.reset_button.addEventListener("click", this.onResetBtnClick);
            var that = this;
            [].forEach.call(dom.metric_buttons, function(btn){
                btn.addEventListener("click", that.onMetricBtnClick());
            });
        },
        
        onPlaceChanged: function(){
            ui.displayStats();
            dom.stats_list.classList.add("hidden");
            if (this.value) { dom.go_button.classList.remove("hidden"); dom.stats_button.classList.remove("hidden");} 
            else { dom.go_button.classList.add("hidden"); dom.stats_button.classList.add("hidden");}
        },
        
        onGoBtnClick: function(){
            sessionStorage.place = dom.place_selector.value;
            //alert(sessionStorage.place);
            var today = new Date();
            dom.curDate.innerHTML = "Today is: " + _T.getDMYfromTimestamp(today);
            dom.welcomeTo.innerHTML = "Welcome to " + dom.place_selector.value;
            dom.pages.classList.toggle("active");
            var btnToShow = document.querySelector(".hiddenR");
            btnToShow.classList.toggle("hiddenR");

            //TIMER
            dom.globalTimer.classList.toggle("hiddenTimer");
            _GT.new();
        },
        
        onResetBtnClick: function(){
            if (confirm("Are you sure ?")) {
                location.reload(true);
                sessionStorage.clear();
            }
        },
        
        onMetricBtnClick: function(){
            return function(){
                if (this.classList.contains("done")) { return; }
                
                this.classList.toggle("done");
                var btn = this,
                    tStamp = Date.now();
                //if (curMinutes <= 9){curMinutes = "0" + curMinutes}
                //if (curSeconds <= 9){curSeconds = "0" + curSeconds}
                
                btn.innerHTML += '@ ' + _T.getTime(tStamp);
                
                this.setAttribute("data-time", tStamp);

                if (ui.measurmentsDone()) { 
                    _server.postMetricsData();
                    dom.happyMushroom.classList.toggle("hideR");
                    sessionStorage.clear();
                    //console.log("storage cleared");
                    return;
                } else {
                    var btnToShow = document.querySelector(".hiddenR");
                    btnToShow.classList.toggle("hiddenR");
                    times.push(tStamp);
                    sessionStorage.setItem('times', times);
                }
            }

        },
        
        displayStats: function(){
            
                var data = _server.getStats(ui.onStatsDataReturned);
            
        },
        
        onStatsDataReturned: function(data){
            var lastVisitDate = 0,
                avgVisitTime = 0,
                avgOrderTime = 0;

            for (var i=0;i<data.visits.length;i++){
                if (data.visits[i].place == dom.place_selector.value){
                    lastVisitDate = data.visits[i].timestamp;
                    if (avgVisitTime == 0 && avgOrderTime == 0){
                        avgVisitTime = data.visits[i].metrics.gotOut - data.visits[i].metrics.gotIN;
                        avgOrderTime = data.visits[i].metrics.gotFood - data.visits[i].metrics.placedOrder;
                    } else {
                        avgVisitTime = Math.floor((avgVisitTime + data.visits[i].metrics.gotOut - data.visits[i].metrics.gotIN)/2);
                        avgOrderTime = Math.floor((avgOrderTime + data.visits[i].metrics.gotFood - data.visits[i].metrics.placedOrder)/2);
                    }
                }

            }
            
                ui.printResults((lastVisitDate == 0 ? "Nothing to see here, move along!" : "Last visit: " + _T.getDMYfromTimestamp(lastVisitDate) 
                    + "</br>Avarage time spent: " + _T.getHMS(avgVisitTime)
                    + "</br>Avarage order time: " + _T.getHMS(avgOrderTime)));

            
        },
        
        printResults: function(e){
            dom.stats_list.classList.remove("hidden");
            dom.stats_list.innerHTML = e;
        },
        
        measurmentsDone: function() {
            return [].every.call(dom.metric_buttons, function(btn){
                return btn.classList.contains("done");
            });
        }
        
    }
    return ui;
});

