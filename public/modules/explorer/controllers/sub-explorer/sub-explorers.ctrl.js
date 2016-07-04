var subExplorersCtrl = function (
        level_categories,
        ExplorerSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.explorerId = $stateParams.explorerId;
 vm.explorerSrv = new ExplorerSrv();

 vm.getSubExplorers = function (explorerId, typeId) {
  vm.explorerSrv.getSubExplorers(explorerId, typeId);
 };

 vm.getSubExplorers(vm.explorerId, level_categories.explorer_relationship.parent);

};

subExplorersCtrl.$inject = [
 'level_categories',
 'ExplorerSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.explorer").controller('SubExplorersCtrl', subExplorersCtrl);
