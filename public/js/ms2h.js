//convert miliseconds to human readable time
define([], function(){
    return{
        getHMS: function(miliseconds){
            var time = Math.floor(miliseconds/1000),
            hours = Math.floor(time / 3600),
            minutes = Math.floor((time - hours * 3600 )/60),
            seconds = time - (hours * 3600 + minutes * 60),
            humanTime;
            
            seconds <=9 ? seconds = '0' + seconds: null ;
            minutes <=9 ? minutes = '0' + minutes: null ;
            hours <=9 ? hours = '0' + hours: null ;
            humanTime = hours + ':' + minutes + ':' + seconds;
            return humanTime;
        },
        
        getDMYfromTimestamp: function(timestamp){
            var cDate = new Date(timestamp),
                day = cDate.getDate(),
                month = cDate.getMonth() +1,
                year = cDate.getFullYear();
            
            return day + '/' + (month <=9 ? month = '0' + month : null) + '/' + year;
                
        }
    }
});