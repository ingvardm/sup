define([], function(){
    return {
        addEvLis: function(){
            place_selector.addEventListener("change", onPlaceChanged); 
            go_button.addEventListener("click", onGoBtnClick);
            stats_button.addEventListener("click", onStatsBtnClick);
            reset_button.addEventListener("click", onResetBtnClick);
            [].forEach.call(metric_buttons, function(btn){
                btn.addEventListener("click", onMetricBtnClick());
            });
        }
    }
});