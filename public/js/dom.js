define([], function(){
    return {
        pages: document.querySelector("#pages"),
        place_selector: document.querySelector("select"),
        go_button: document.querySelector(".go").querySelector(".button"),
        stats_button: document.querySelector(".stats").querySelector(".button"),
        stats_list: document.querySelector(".stats").querySelector(".statsList"),
        reset_button: document.querySelector(".reset"),
        metric_buttons: document.querySelector(".metrics").querySelectorAll(".button"),
        welcomeTo: document.querySelector(".welcome"),
        curDate: document.querySelector(".curDate"),
        happyMushroom: document.querySelector("#happyMushroom"),
        globalTimer: document.querySelector("#globalTimer")
    }
});