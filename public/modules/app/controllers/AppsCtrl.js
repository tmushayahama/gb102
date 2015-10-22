'use strict';
define([
 'angular'
], function (angular) {
 return ['$state', '$http', '$rootScope',
  function ($state, $http, $rootScope) {
   var vm = this;

   vm.ttt = function () {
    var credentials = {
     email: vm.email,
     password: vm.password
    }
   }
  }
 ];
});