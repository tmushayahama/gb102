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
        ToastSrv,
        $log) {
 var vm = this;
 vm.user;
 vm.authSrv = new AuthSrv();

 $scope.showSimpleToast = function () {
  $uibModalInstance.dismiss('cancel');
  //ToastSrv.show('success-toast', 'data.message');
 };

 vm.registration = function () {

  vm.authSrv.register(vm.user).then(function (data)
  {
   ToastSrv.show('success-toast', data.message);
   $uibModalInstance.close();
  }, function (error)
  {
   ToastSrv.show('error-toast', error.message);
  }
  );
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
 'ToastSrv',
 '$log'];

angular.module("app").controller('RegistrationModalCtrl', registrationModalCtrl);
