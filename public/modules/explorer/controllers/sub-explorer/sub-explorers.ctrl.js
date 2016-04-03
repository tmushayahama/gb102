var subExplorersCtrl = function (
        ExplorerSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.explorerId = $stateParams.explorerId;
 vm.subExplorers;
 vm.explorerSrv = new ExplorerSrv();

 vm.getSubExplorers = function (id) {
  vm.explorerSrv.getSubExplorers(id).then(function (data) {
   vm.subExplorers = data;
   vm.getSubSubExplorers(vm.explorer.explorer_id);
  });
 };

 vm.getSubSubExplorers = function (explorerId) {
  vm.explorerSrv.getSubSubExplorers(explorerId).then(function (data) {
   vm.subExplorers = data;
  });
 }

 vm.getSubExplorers(vm.explorerId);

};

subExplorersCtrl.$inject = [
 'ExplorerSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.explorer").controller('SubExplorersCtrl', subExplorersCtrl);