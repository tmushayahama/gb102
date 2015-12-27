define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";

 var module = angular.module('app.auth', ['ui.router']);

 module.config(['$stateProvider', function ($stateProvider) {

   $stateProvider
           .state('auth', {
            url: '/auth',
            views: {
             "root": {
              controller: 'AuthCtrl as auth',
              templateUrl: 'public/modules/auth/views/authView.html',
             }
            },
            resolve: {
             load: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                name: 'app',
                files: ['public/modules/auth/controllers/AuthCtrl.js']
               });
              }]
            }
           });
  }]);
 return module;
});
