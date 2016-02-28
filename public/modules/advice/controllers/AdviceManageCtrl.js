var adviceManageCtrl = function (
        AdviceSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.adviceId = $stateParams.adviceId;
 vm.advices;
 vm.adviceSrv = new AdviceSrv();

 vm.getAdvice = function (id) {
  vm.adviceSrv.getAdvice(id).then(function (data) {
   vm.advice = data;
   vm.getSubAdvices(vm.advice.explorer_id);
  });
 };

 vm.getSubAdvices = function (explorerId) {
  vm.adviceSrv.getSubAdvices(explorerId).then(function (data) {
   vm.advices = data;
  });
 }

 vm.getAdvice(vm.adviceId);

};

adviceManageCtrl.$inject = [
 'AdviceSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.advice").controller('AdviceManageCtrl', adviceManageCtrl);
