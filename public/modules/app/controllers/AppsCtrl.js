'use strict';
require([
 'angular',
 '../modules/app/app'
], function (angular, gbApp) {
 return gbApp.controller('AppsCtrl', ['$state', '$http', '$rootScope',
  function ($state, $http, $rootScope) {
   var vm = this;

   vm.ttt = function () {
    var credentials = {
     email: vm.email,
     password: vm.password
    }
   }
  }
 ]);
});