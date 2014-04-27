define(function(require) {
var ms2h = require('../public/js/ms2h'),
    server = require('../public/js/server'),
    //UI = require('../public/js/UI'),
    //client = require('../public/js/client'),
    session = require('../public/js/session');

    //MS2H tests:
    describe('MS2H', function() {
        describe('funct convert ms to HMS', function() {
            it('should get a string with 8 chars', function() {
                var ms = 4000;
                ms2h.getHMS(ms).should.be.a('string');
                ms2h.getHMS(ms).length.should.equal(8);
                var timeArray = ms2h.getHMS(ms).split(":");
                timeArray.length.should.equal(3);
                timeArray[2].should.be.a("string");
                timeArray[2].should.equal("0" + ms/1000);
                parseInt(timeArray[2]).should.equal(ms/1000);
                
            });
        });
        
        describe('funct convdfsdert ms to HMS', function() {
            it('should get a stringrghrtyrty with 8 chars', function() {
                var ms = 4000;
                ms2h.getHMS(ms).should.be.a('string');
                ms2h.getHMS(ms).length.should.equal(8);
                var timeArray = ms2h.getHMS(ms).split(":");
                timeArray.length.should.equal(3);
                timeArray[2].should.be.a("string");
                timeArray[2].should.equal("0" + ms/1000);
                parseInt(timeArray[2]).should.equal(ms/1000);
                
            });
        });
        
    });
    
    //CLIENT tests:
   
    
    //UI tests:
    
    
    //SERVER tests:
                 
    
    //SESSION tests:
 
});