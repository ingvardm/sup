define(['dom', 'ms2h'], function(dom, _T){
    var seconds;
    var globalTimer = {   
        new: function() {
            seconds =0;
            globalTimer.start();
        },

        cont: function(){
            seconds = Math.ceil(parseInt((Date.now() - sessionStorage.times.split(",")[0]) / 1000));
            dom.globalTimer.innerHTML = _T.getHMS(seconds*1000);
            globalTimer.start();
        },

        start: function(){
            setInterval(function() {
                seconds++;
                dom.globalTimer.innerHTML = _T.getHMS(seconds*1000);
                //dom.globalTimer.innerHTML = _T.getHMS(seconds*1000);
            }, 1000);
        }
    }
    return globalTimer;
});