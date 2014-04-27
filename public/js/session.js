define([], function(){
    //var UI = require('UI');
    return {
        load: function(e){
                
               if (typeof(sessionStorage.times) !== 'undefined'){
                   
                   var savedTimes = sessionStorage.times.split(",");
                    document.querySelector("select").value  = sessionStorage.place;
                    //UI.onGoBtnClick(dontSelectButtons);
                    document.querySelector("#pages").classList.toggle("active");
                    require(['ms2h'], function(_T){
                        document.querySelector(".curDate").innerHTML = "Session from: " + _T.getDMYfromTimestamp(parseInt(savedTimes[0]));
                        for(var i=0; i < savedTimes.length; i++){
                            var btnToShow = document.querySelector(".hiddenR");
                            btnToShow.innerHTML += '@ ' + _T.getTime(parseInt(savedTimes[i]));
                            //console.log(btnToShow);
                            btnToShow.classList.add('done');
                            btnToShow.setAttribute("data-time", parseInt(savedTimes[i]));
                            //alert(savedTimes[i]);
                            btnToShow.classList.toggle("hiddenR");
                        }
                        var btnToShow = document.querySelector(".hiddenR");
                        btnToShow.classList.toggle("hiddenR");
                    });
                  /* for(var i=0; i < savedTimes.length; i++){
                       var btnToShow = document.querySelector(".hiddenR");
                       console.log(btnToShow);
                        btnToShow.classList.add('done');
                        btnToShow.setAttribute("data-time", parseInt(savedTimes[i]));
                       //alert(savedTimes[i]);
                       btnToShow.classList.toggle("hiddenR");
                   }*/

               } else {
                   return;
               }
        }
    }
});