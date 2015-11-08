requirejs.config({
 waitSeconds: 0,
 paths: {
  'jquery': '../../bower_components/jquery/dist/jquery.min',
  'angular': '../../bower_components/angular/angular',
  'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
  'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
  'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
  'angular-resource': '../../bower_components/angular-resource/angular-resource',
  'satellizer': '../../bower_components/satellizer/satellizer',
  'oc-lazy-load': '../../bower_components/ocLazyLoad/dist/ocLazyLoad',
  'moment': '../../bower_components/moment/moment',
  'text': '../../bower_components/requirejs-text/text',
  'angular-couch-potato': '../../bower_components/angular-couch-potato/dist/angular-couch-potato',
  'dom-ready': '../../bower_components/domready/ready',
  'modules-includes': 'includes'

 },
 shim: {
  'angular': {'exports': 'angular', deps: ['jquery']},
  'jquery': {'exports': 'jquery'},
  'angular-bootstrap': {deps: ['angular']},
  'angular-ui-router': {deps: ['angular']},
  'angular-resource': {deps: ['angular']},
  'oc-lazy-load': {deps: ['angular']},
  'satellizer': {deps: ['angular']},
  'bootstrap': {'exports': 'bootstrap', deps: ['jquery']},
  'moment': {exports: 'moment'},
  'angular-couch-potato': {deps: ['angular']},
  'modules-includes': {deps: ['angular']},
 },
 priority: [
  'jquery',
  'bootstrap',
  'angular'
 ],
 //deps: ['../modules/app/app']
});


requirejs([
 'angular',
 '../modules/app/app'
], function (angular, app) {
 'use strict';
 console.log(app);
 var $html = angular.element(document.getElementsByTagName('html')[0]);
 angular.element().ready(function () {
// bootstrap the app manually
  angular.bootstrap(document, ['app']);
  //resumeBootstrap();
 });
});
// Start the main app logic.
/*
 requirejs(['application'], function () {
 angular.bootstrap(document.body, ['mainModule']);
 });
 /*
 requirejs([
 'angular',
 '../modules/app/app'
 ], function (angular, app) {
 'use strict';
 console.log(app);
 var $html = angular.element(document.getElementsByTagName('html')[0]);
 angular.element().ready(function () {
 // bootstrap the app manually
 angular.bootstrap(document, [app.name]);
 //resumeBootstrap();
 });
 }
 );
 */


