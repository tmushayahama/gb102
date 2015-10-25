define(['angular',
 'angular-couch-potato',
 'angular-ui-router'

], function (angular, couchPotato) {

 "use strict";

 var module = angular.module('app.auth', ['scs.couch-potato', 'ui.router']);



 module.config(function ($stateProvider, $couchPotatoProvider) {

  $stateProvider
          .state('auth', {
           url: 'authe',
           views: {
            "": {
             templateUrl: 'public/modules/auth/views/authView.html',
             controller: 'AuthCtrl as auth',
             resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
               '../modules/auth/controllers/AuthCtrl',
              ])
             }
            }
           }
          })

 });

 couchPotato.configureApp(module);
 module.run(function ($couchPotato) {
  module.lazy = $couchPotato;
 });
 return module;

});
