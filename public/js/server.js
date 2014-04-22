define ([], function(){
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
        }
    }
});