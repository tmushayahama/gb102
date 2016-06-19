requirejs.config({
 waitSeconds: 0,
 paths: {
  'jquery': '../../bower_components/jquery/dist/jquery',
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
  'angular-swing': '../../bower_components/angular-swing/dist/angular-swing.min',
  'hammerjs': '../../bower_components/hammerjs/hammer',
  'angular-gestures': '../../bower_components/angular-gestures/gestures',
  'angular-loading-bar': '../../bower_components/angular-loading-bar/build/loading-bar',
  'angular-aside': '../../bower_components/angular-aside/dist/js/angular-aside',
  'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
  //'angular-ui-select': '../../bower_components/ui-select/dist/select',
  //Local pugins--common
  'checklist-model': '../../bower_components/checklist-model/checklist-model',
  'ng-tags-input': '../../bower_components/ng-tags-input/ng-tags-input',
  'angular-aria': '../../bower_components/angular-aria/angular-aria',
  'angular-material': '../../bower_components/angular-material/angular-material',
  'angular-messages': '../../bower_components/angular-messages/angular-messages',
  'angular-gridster': '../../bower_components/angular-gridster/dist/angular-gridster.min',
  'angular-resizer': '../../bower_components/javascript-detect-element-resize/jquery.resize',
  'infinite-scroll': '../../bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
  'introjs': '../../bower_components/intro.js/minified/intro.min',
  //'angular-introjs': '../../bower_components/angular-intro.js/build/angular-intro.min',
  'ng-joyride': '../../bower_components/ng-joyride/ng-joyride',
  'truncate-filters': '../modules/common/filters/truncate',
  'dnd-draggable': '../internal-libs/dnd-draggable',
  'angular-grid': '../internal-libs/angular-grid'
 },
 shim: {
  'angular': {'exports': 'angular', deps: ['jquery']},
  'jquery': {'exports': 'jquery'},
  'angular-bootstrap': {deps: ['angular']},
  'angular-ui-router': {deps: ['angular']},
  'angular-resource': {deps: ['angular']},
  'angular-animate': {deps: ['angular', 'jquery']},
  'oc-lazy-load': {deps: ['angular']},
  'satellizer': {deps: ['angular']},
  'bootstrap': {'exports': 'bootstrap', deps: ['jquery']},
  'moment': {exports: 'moment'},
  'angular-xeditable': {deps: ['angular']},
  'angular-local-storage': {deps: ['angular']},
  'angular-css': {deps: ['angular', 'angular-ui-router']},
  'angular-wizard': {deps: ['angular']},
  //'ionic.tdcards': {deps: ['angular']},
  'hammerjs': {deps: ['angular']},
  'angular-gestures': {deps: ['angular', 'hammerjs']},
  'angular-swing': {deps: ['angular', 'hammerjs']},
  'angular-loading-bar': {deps: ['angular']},
  'angular-aside': {deps: ['angular']},
  'angular-sanitize': {deps: ['angular']},
  //'angular-ui-select': {deps: ['angular']},
  'checklist-model': {deps: ['angular']},
  'ng-tags-input': {deps: ['angular']},
  'angular-aria': {deps: ['angular']},
  'angular-material': {deps: ['angular', 'angular-aria']},
  'angular-messages': {deps: ['angular']},
  'angular-resizer': {deps: ['angular', 'jquery']},
  'angular-gridster': {deps: ['angular', 'angular-resizer']},
  'infinite-scroll': {deps: ['angular']},
  //'introjs': {deps: ['angular', 'jquery']},
  //'angular-introjs': {deps: ['angular']},
  'ng-joyride': {deps: ['angular', 'jquery']},
  'truncate-filters': {deps: ['angular']},
  'dnd-draggable': {deps: ['angular']},
  'angular-grid': {deps: ['angular']}
 },
 priority: [
  //'jquery',
  //'bootstrap',
  'angular',
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


