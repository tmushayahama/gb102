var registrationModalCtrl = function (
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

 vm.registration = function () {

  $auth.registration(vm.user).then(function ()
  {
   return $http.get('api/authenticate/user');
  }, function (error) {
   vm.registrationError = true;
   vm.registrationErrorText = error.data.error;
  }).then(function (response) {
   var user = JSON.stringify(response.data.user);
   localStorageService.set('user', user);
   $rootScope.authenticated = true;
   $rootScope.user = response.data.user;
   $uibModalInstance.close();
   $state.go('apps.explorer.all');
  });
 };



 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

registrationModalCtrl.$inject = [
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

angular.module("app").controller('RegistrationModalCtrl', registrationModalCtrl);
