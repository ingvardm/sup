define ([], function(){
    var place_selector  = document.querySelector("select");
    return {
        getStats: function(callback){
            var req = new XMLHttpRequest();
            var data;
            req.open('GET', '/metrics', true);
            req.onreadystatechange = function (aEvt) {
              if (req.readyState == 4) {
                 if(req.status == 200){
                    data = eval('('+ req.responseText +')');
                    //return data;
                     callback(data);

                 }
                 else
                  alert("Error loading results.json");
              }
            };
            req.send(null);
        },
        
        postJSON: function(data){
            var request = new XMLHttpRequest();
            request.open("POST", "/metrics", true);
            request.setRequestHeader("Content-type", "application/json;");
            request.send(data);
        },
    
        postMetricsData: function(){
            
            var data = {
                date: Date(),
                timestamp: Date.now(),
                place: place_selector.value,
                metrics: {}
            };

            [].forEach.call(document.querySelector(".metrics").children, function(m){
                data.metrics[m.dataset.role] = parseInt(m.querySelector(".done").getAttribute("data-time"), 10);
            });

            this.postJSON(JSON.stringify(data));
        }
    }
});