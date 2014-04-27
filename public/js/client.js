'use strict';
//alert(sessionStorage.place);
require(['UI', 'session'], function(UI, session){
	UI.addEvLis();
    session.load();
});