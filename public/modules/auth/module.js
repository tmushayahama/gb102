define(['angular',
 'angular-ui-router'

], function (angular) {

 "use strict";
 var module = angular.module('app.auth', ['ui.router']);
 var authConfig = function ($stateProvider) {

  $stateProvider
          .state('auth', {
           url: '/auth',
           views: {
            "root": {
             controller: 'AuthCtrl as authCtrl',
             templateUrl: 'public/modules/auth/views/authView.html',
            }
           },
           resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
               name: 'app',
               serie: true,
               files: [
                'public/modules/app/services/ConstantsManager.js',
                'public/modules/auth/controllers/AuthCtrl.js'
               ]
              });
             }]
           }
          });
 };
 authConfig.$inject = ['$stateProvider'];
 module.config(authConfig);
 return module;
});
