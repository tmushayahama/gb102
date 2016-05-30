var registrationModalCtrl = function (
        $uibModalInstance,
        $auth,
        AuthSrv,
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
 vm.authSrv = new AuthSrv();

 vm.registration = function () {

  vm.authSrv.register(vm.user).then(function (data)
  {
   var d = data;
  });
 };



 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

registrationModalCtrl.$inject = [
 '$uibModalInstance',
 '$auth',
 'AuthSrv',
 'localStorageService',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log'];

angular.module("app").controller('RegistrationModalCtrl', registrationModalCtrl);
