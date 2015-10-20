require.config({
 paths: {
  'jquery': '../../bower_components/jquery/dist/jquery.min',
  'angular': '../../bower_components/angular/angular',
  'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
  'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
  'angular-resource': '../../bower_components/angular-resource/angular-resource',
  'satellizer': '../../bower_components/satellizer/satellizer',
  'moment': '../../bower_components/moment/moment',
  'text': '../../bower_components/requirejs-text/text',
  //'modules-includes': 'includes'

 },
 shim: {
  'angular': {'exports': 'angular', deps: ['jquery']},
  'jquery': {'exports': 'jquery'},
  'angular-ui-router': {deps: ['angular']},
  'angular-resource': {deps: ['angular']},
  'satellizer': {deps: ['angular']},
  'bootstrap': {deps: ['jquery']},
  'moment': {exports: 'moment'},
  // 'modules-includes': {deps: ['angular']},
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
  // bootstrap the app manually
  angular.bootstrap(document, [app.name]);
  //resumeBootstrap();
 });
}
);


