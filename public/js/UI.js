define([], function(){
               var pages = document.querySelector("#pages"),
                place_selector = document.querySelector("select"),
                go_button = document.querySelector(".go").querySelector(".button"),
                stats_button = document.querySelector(".stats").querySelector(".button"),
                stats_list = document.querySelector(".stats").querySelector(".statsList"),
                reset_button = document.querySelector(".reset"),
                metric_buttons = document.querySelector(".metrics").querySelectorAll(".button"),
                welcomeTo = document.querySelector(".welcome"),
                times = [],
                curDate = document.querySelector(".curDate");
                
    if (typeof(sessionStorage.times) !== 'undefined'){
        var times = sessionStorage.times.split(",");
    }
               
    var ui = {
        addEvLis: function(){
            
            place_selector.addEventListener("change", this.onPlaceChanged); 
            go_button.addEventListener("click", this.onGoBtnClick);
            //stats_button.addEventListener("click", onStatsBtnClick());
            reset_button.addEventListener("click", this.onResetBtnClick);
            var that = this;
            [].forEach.call(metric_buttons, function(btn){
                btn.addEventListener("click", that.onMetricBtnClick());
            });
        },
        
        onPlaceChanged: function(){
            ui.displayStats();
            stats_list.classList.add("hidden");
            if (this.value) { go_button.classList.remove("hidden"); stats_button.classList.remove("hidden");} 
            else { go_button.classList.add("hidden"); stats_button.classList.add("hidden");}
        },
        
        onGoBtnClick: function(){
            sessionStorage.place = place_selector.value;
            //alert(sessionStorage.place);
            var today = new Date();
            require(['ms2h'], function(_T){
                curDate.innerHTML = "Today is: " + _T.getDMYfromTimestamp(today);
            });
            welcomeTo.innerHTML = "Welcome to " + place_selector.value;
            pages.classList.toggle("active");
            var btnToShow = document.querySelector(".hiddenR");
            btnToShow.classList.toggle("hiddenR");
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
                require(['ms2h'], function(_T){
                    btn.innerHTML += '@ ' + _T.getTime(tStamp);
                });
                this.setAttribute("data-time", tStamp);

                require(['server'], function(_server){
                    if (ui.measurmentsDone()) { _server.postMetricsData(); return;}
                });

                var btnToShow = document.querySelector(".hiddenR");
                btnToShow.classList.toggle("hiddenR");
                times.push(tStamp);
                sessionStorage.setItem('times', times);
                //alert(sessionStorage.times);
            }

        },
        
        displayStats: function(){
            require(['server'], function(_server){
                var data = _server.getStats(ui.onStatsDataReturned);
            });
        },
        
        onStatsDataReturned: function(data){
            var lastVisitDate = 0,
                avgVisitTime = 0,
                avgOrderTime = 0;

            for (var i=0;i<data.visits.length;i++){
                if (data.visits[i].place == place_selector.value){
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
            require(['ms2h'], function(_T){
                ui.printResults((lastVisitDate == 0 ? "Nothing to see here, move along!" : "Last visit: " + _T.getDMYfromTimestamp(lastVisitDate) 
                    + "</br>Avarage time spent: " + _T.getHMS(avgVisitTime)
                    + "</br>Avarage order time: " + _T.getHMS(avgOrderTime)));

            });
        },
        
        printResults: function(e){
            stats_list.classList.remove("hidden");
            stats_list.innerHTML = e;
        },
        
        measurmentsDone: function() {
            return [].every.call(metric_buttons, function(btn){
                return btn.classList.contains("done");
            });
        }
    }
    return ui;
});

