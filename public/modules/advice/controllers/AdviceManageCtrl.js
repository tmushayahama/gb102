var adviceManageCtrl = function (
        AdviceManager,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.adviceId = $stateParams.adviceId;
 vm.advices;
 vm.adviceManager = new AdviceManager();

 vm.getAdvice = function (id) {
  vm.adviceManager.getAdvice(id).then(function (data) {
   vm.advice = data;
   vm.getSubAdvices(vm.advice.explore_id);
  });
 };

 vm.getSubAdvices = function (exploreId) {
  vm.adviceManager.getSubAdvices(exploreId).then(function (data) {
   vm.advices = data;
  });
 }

 vm.getAdvice(vm.adviceId);

};

adviceManageCtrl.$inject = [
 'AdviceManager',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.advice").controller('AdviceManageCtrl', adviceManageCtrl);
