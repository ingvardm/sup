define(['UI', 'dom', 'ms2h', 'globalTimer'], function(UI, dom, _T, _GT){
    return {
        load: function(e){
                
               if (typeof(sessionStorage.times) !== 'undefined'){
                   
                    var savedTimes = sessionStorage.times.split(",");
                    dom.place_selector.value  = sessionStorage.place;
                    dom.globalTimer.classList.toggle("hiddenTimer");
                    _GT.cont();
                    //UI.onGoBtnClick(dontSelectButtons);
                    dom.pages.classList.toggle("active");
                    dom.welcomeTo.innerHTML = "Welcome to " + sessionStorage.place;
                    dom.curDate.innerHTML = "Session from: " + _T.getDMYfromTimestamp(parseInt(savedTimes[0]));
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