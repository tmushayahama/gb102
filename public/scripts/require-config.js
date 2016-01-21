requirejs.config({
 waitSeconds: 0,
 paths: {
  'jquery': '../../bower_components/jquery/dist/jquery.min',
  'angular': '../../bower_components/angular/angular',
  'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
  'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
  'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
  'angular-resource': '../../bower_components/angular-resource/angular-resource',
  'angular-animate': '../../bower_components/angular-animate/angular-animate',
  'satellizer': '../../bower_components/satellizer/satellizer',
  'oc-lazy-load': '../../bower_components/oclazyload/dist/ocLazyLoad',
  'moment': '../../bower_components/moment/moment',
  'text': '../../bower_components/requirejs-text/text',
  'dom-ready': '../../bower_components/domready/ready',
  'angular-xeditable': '../../bower_components/angular-xeditable/dist/js/xeditable',
  'angular-local-storage': '../../bower_components/angular-local-storage/dist/angular-local-storage',
  'angular-css': '../../bower_components/angular-css/angular-css',
  'angular-wizard': '../../bower_components/angular-wizard/dist/angular-wizard',
  // 'ionic.tdcards': '../../bower_components/ionic-ion-tinder-cards/ionic.tdcards',
  //'angular-swing': '../../bower_components/angular-swing/dist/angular-swing',
  'hammerjs': '../../bower_components/hammerjs/hammer',
  'angular-gestures': '../../bower_components/angular-gestures/gestures',
  'angular-loading-bar': '../../bower_components/angular-loading-bar/build/loading-bar',
  'angular-aside': '../../bower_components/angular-aside/dist/js/angular-aside'

 },
 shim: {
  'angular': {'exports': 'angular', deps: ['jquery']},
  'jquery': {'exports': 'jquery'},
  'angular-bootstrap': {deps: ['angular']},
  'angular-ui-router': {deps: ['angular']},
  'angular-resource': {deps: ['angular']},
  'angular-animate': {deps: ['angular']},
  'oc-lazy-load': {deps: ['angular']},
  'satellizer': {deps: ['angular']},
  'bootstrap': {'exports': 'bootstrap', deps: ['jquery']},
  'moment': {exports: 'moment'},
  'angular-xeditable': {deps: ['angular']},
  'angular-local-storage': {deps: ['angular']},
  'angular-css': {deps: ['angular', 'angular-ui-router']},
  'angular-wizard': {deps: ['angular']},
  //'ionic.tdcards': {deps: ['angular']},
  //'angular-swing': {deps: ['angular']},
  'hammerjs': {deps: ['angular']},
  'angular-gestures': {deps: ['angular', 'hammerjs']},
  'angular-loading-bar': {deps: ['angular', 'angular-animate']},
  'angular-aside': {deps: ['angular', 'angular-animate']}
 },
 priority: [
  'jquery',
  'bootstrap',
  'angular'
 ]
});


requirejs([
 'angular',
 '../modules/app/app'
], function (angular, app) {
 'use strict';
 console.log(app);
 var $html = angular.element(document.getElementsByTagName('html')[0]);
 angular.element().ready(function () {
  angular.bootstrap(document, ['app']);
 });
});


