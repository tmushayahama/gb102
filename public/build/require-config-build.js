requirejs.config({
 waitSeconds: 0,
 paths: {
  'jquery': '../../../bower_components/jquery/dist/jquery.min',
  'angular': '../../../bower_components/angular/angular.min',
  'bootstrap': '../../../bower_components/bootstrap/dist/js/bootstrap.min',
  'angular-bootstrap': '../../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
  'angular-ui-router': '../../../bower_components/angular-ui-router/release/angular-ui-router.min',
  'angular-resource': '../../../bower_components/angular-resource/angular-resource.min',
  'angular-animate': '../../../bower_components/angular-animate/angular-animate.min',
  'satellizer': '../../../bower_components/satellizer/satellizer.min',
  'oc-lazy-load': '../../../bower_components/oclazyload/dist/ocLazyLoad.min',
  'moment': '../../../bower_components/moment/moment.min',
  'text': '../../../bower_components/requirejs-text/text.min',
  'dom-ready': '../../../bower_components/domready/ready.min',
  'angular-xeditable': '../../../bower_components/angular-xeditable/dist/js/xeditable.min',
  'angular-local-storage': '../../../bower_components/angular-local-storage/dist/angular-local-storage.min',
  'angular-css': '../../../bower_components/angular-css/angular-css.min',
  'angular-wizard': '../../../bower_components/angular-wizard/dist/angular-wizard.min',
  // 'ionic.tdcards': '../../../bower_components/ionic-ion-tinder-cards/ionic.tdcards.min',
  //'angular-swing': '../../../bower_components/angular-swing/dist/angular-swing.min',
  'hammerjs': '../../bower_components/hammerjs/hammer.min',
  'angular-gestures': '../../bower_components/angular-gestures/gestures.min',
  //'modules-includes': 'includes'

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
  // 'angular-swing': {deps: ['angular']},
  'hammerjs': {deps: ['angular']},
  'angular-gestures': {deps: ['angular', 'hammerjs']}
 },
 priority: [
  'jquery',
  'bootstrap',
  'angular'
 ]
});


requirejs([
 'angular',
 'scripts/modules/app/app'
], function (angular, app) {
 'use strict';
 console.log(app);
 var $html = angular.element(document.getElementsByTagName('html')[0]);
 angular.element().ready(function () {
  angular.bootstrap(document, ['app']);
 });
});








