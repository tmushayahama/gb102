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
  'oc-lazy-load': '../../bower_components/oclazyload/dist/ocLazyLoad',
  'moment': '../../bower_components/moment/moment',
  'text': '../../bower_components/requirejs-text/text',
  'angular-couch-potato': '../../bower_components/angular-couch-potato/dist/angular-couch-potato',
  'dom-ready': '../../bower_components/domready/ready',
  'angular-xeditable': '../../bower_components/angular-xeditable/dist/js/xeditable',
  'angular-local-storage': '../../bower_components/angular-local-storage/dist/angular-local-storage',
  'angular-css': '../../bower_components/angular-css/angular-css',
  //'modules-includes': 'includes'

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
  'angular-xeditable': {deps: ['angular']},
  'angular-local-storage': {deps: ['angular']},
  'angular-css': {deps: ['angular', 'angular-ui-router']}
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


