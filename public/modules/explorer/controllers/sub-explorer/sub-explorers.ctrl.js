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

 vm.getSubExplorers = function (explorerId) {
  vm.explorerSrv.getSubExplorers(explorerId).then(function (data) {
   vm.subExplorers = data;
  });
 };

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
