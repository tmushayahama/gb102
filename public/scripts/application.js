define([], function () {

 var app = angular.module('mainModule', ['ui.router', 'oc.lazyLoad']);

 app.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider',
  function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {

   $ocLazyLoadProvider.config({
    loadedModules: ['mainModule'],
    asyncLoader: require
   });

   $urlRouterProvider.otherwise('/auth');

   $stateProvider
           .state('auth', {
            url: '/auth',
            templateUrl: 'public/modules/auth/views/authView.html'
           })

           .state('module1', {
            url: '/module1',
            templateUrl: 'public/modules/module1/module1.html',
            resolve: {
             load: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
               name: 'module1',
               files: ['public/modules/module1/module.js']
              });
             }
            }
           })

           .state('module2', {
            url: '/module2',
            templateUrl: 'public/modules/module2/module2.html',
            resolve: {
             load: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
               name: 'module2',
               files: ['public/modules/module2/module.js']
              });
             }
            }
           });

  }]);



 return app;
});