var loginModalCtrl = function (
        $uibModalInstance,
        $auth,
        localStorageService,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log) {
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
   $uibModalInstance.close();
   $state.go('apps.skills.all');
  });
 };



 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

loginModalCtrl.$inject = [
 '$uibModalInstance',
 '$auth',
 'localStorageService',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log'];

angular.module("app").controller('LoginModalCtrl', loginModalCtrl);
