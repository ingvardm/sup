require.config({
//baseUrl: '../',
paths: {
//'jquery' : '/app/libs/jquery',
//'underscore' : '/app/libs/underscore',
//'backbone' : '/app/libs/backbone',
'mocha' : '../node_modules/mocha/mocha',
'chai' : '../node_modules/chai/chai',
//'chai-jquery' : 'libs/chai-jquery',
'UI' : '../public/js/UI',
'server' : '../public/js/server',
'ms2h' : '../public/js/ms2h',
'client' : '../public/js/client'
}
/*shim: {
'underscore': {
exports: '_'
},
'jquery': {
exports: '$'
},
'backbone': {
deps: ['underscore', 'jquery'],
exports: 'Backbone'
},
'chai-jquery': ['jquery', 'chai']
},*/
/*urlArgs: 'bust=' + (new Date()).getTime()*/
});
 
require(['require', 'chai', 'mocha'], function(require, chai){
 
// Chai
var should = chai.should();
//chai.use(chaiJquery);
 
/*globals mocha */
mocha.setup('bdd');
 
require([
'test.js',
], function(require) {
mocha.run();
});
 
});