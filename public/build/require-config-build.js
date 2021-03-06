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
  'angular-swing': '../../../bower_components/angular-swing/dist/angular-swing.min.min',
  'hammerjs': '../../../bower_components/hammerjs/hammer.min',
  'angular-gestures': '../../../bower_components/angular-gestures/gestures.min',
  'angular-loading-bar': '../../../bower_components/angular-loading-bar/build/loading-bar.min',
  'angular-aside': '../../../bower_components/angular-aside/dist/js/angular-aside.min',
  'angular-sanitize': '../../../bower_components/angular-sanitize/angular-sanitize.min',
  //'angular-ui-select': '../../../bower_components/ui-select/dist/select.min',
  //Local pugins--common
  'checklist-model': '../../../bower_components/checklist-model/checklist-model',
  'ng-tags-input': '../../../bower_components/ng-tags-input/ng-tags-input.min',
  'angular-aria': '../../../bower_components/angular-aria/angular-aria.min',
  'angular-material': '../../../bower_components/angular-material/angular-material.min',
  'angular-messages': '../../../bower_components/angular-messages/angular-messages.min',
  'angular-gridster': '../../../bower_components/angular-gridster/dist/angular-gridster.min',
  'angular-resizer': '../../../bower_components/javascript-detect-element-resize/jquery.resize',
  'infinite-scroll': '../../../bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min',
  'iscroll': '../../../bower_components/iscroll/build/iscroll',
  'platform': '../../../bower_components/platform/platform',
  'angular-iscroll': '../../../bower_components/angular-iscroll/dist/lib/angular-iscroll',
  'ng-joyride': '../../../bower_components/ng-joyride/ng-joyride',
  'truncate-filters': 'scripts/modules/common/filters/truncate',
  'dnd-draggable': 'internal-libs/dnd-draggable',
  'angular-grid': 'internal-libs/angular-grid'
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
  'ng-joyride': {deps: ['angular', 'jquery']},
  'iscroll': {deps: ['angular']},
  'platform': {deps: ['angular']},
  'angular-iscroll': {deps: ['angular', 'iscroll', 'platform']},
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
 'scripts/modules/app/app'
], function (angular, app) {
 'use strict';
 console.log(app);
 var $html = angular.element(document.getElementsByTagName('html')[0]);
 angular.element().ready(function () {
  angular.bootstrap(document, ['app']);
 });
});








