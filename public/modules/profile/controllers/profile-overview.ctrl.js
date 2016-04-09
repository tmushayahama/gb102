var profileOverviewCtrl = function (
        ProfileSrv,
        ExplorersSrv,
        $state,
        $stateParams,
        $http,
        $rootScope) {
 var vm = this;
 vm.explorersSrv = new ExplorersSrv();

 vm.userId = $stateParams.profileId;
 vm.explorersSrv.getUserExplorersStats(vm.userId).then(function (data) {
  vm.explorersStats = data;
 });

};

profileOverviewCtrl.$inject = [
 'ProfileSrv',
 'ExplorersSrv',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope'];

angular.module("app.profile").controller('ProfileOverviewCtrl', profileOverviewCtrl);