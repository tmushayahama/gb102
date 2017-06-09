(function ()
{
 'use strict';

 angular
         .module('app.login-panel')
         .controller('LoginPanelController', LoginPanelController);

 /** @ngInject */
 function LoginPanelController(gbConfig, msApi, $mdSidenav, $http, $auth, $rootScope, $state, localStorageService)
 {
  var vm = this;
  var apiUrl = gbConfig.getConfig("apiUrl");

  vm.user;

  vm.login = function () {

   $auth.login(vm.user).then(function ()
   {
    return $http.get(apiUrl + 'api/authenticate/user');
   }, function (error) {
    vm.loginError = true;
    vm.loginErrorText = error.data.error;
   }).then(function (response) {
    var user = JSON.stringify(response.data.user);
    localStorageService.set('user', user);
    $rootScope.authenticated = true;
    $rootScope.user = response.data.user;
    $mdSidenav("login-panel").close();
    $state.go('app.profileLinearView.home', {userId: $rootScope.user.id});
   });
  };
 }

})();