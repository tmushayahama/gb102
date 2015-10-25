// Defer AngularJS bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

define([
 'require',
 'jquery',
 'angular',
 'dom-ready',
 'bootstrap',
 '../modules/app/app',
 'includes'
], function (require, $, ng, domReady) {
 'use strict';


 domReady(function (document) {
  ng.bootstrap(document, ['app']);
  ng.resumeBootstrap();
 });
});
