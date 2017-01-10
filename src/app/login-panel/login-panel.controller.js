(function ()
{
 'use strict';

 angular
         .module('app.login-panel')
         .controller('LoginPanelController', LoginPanelController);

 /** @ngInject */
 function LoginPanelController(msApi, $http, $auth, $rootScope, $state, localStorageService)
 {
  var vm = this;

  vm.user;

  vm.login = function () {

   $auth.login(vm.user).then(function ()
   {
    return $http.get('api/authenticate/user');
   }, function (error) {
    vm.loginError = true;
    vm.loginErrorText = error.data.error;
   }).then(function (response) {
    var user = JSON.stringify(response.data.user);
    localStorageService.set('user', user);
    $rootScope.authenticated = true;
    $rootScope.user = response.data.user;
    $state.go('app.profileLinearView.home', {user_id: $rootScope.user.id});
   });
  };
 }

})();