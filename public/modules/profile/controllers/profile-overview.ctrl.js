var profileOverviewCtrl = function (
        ProfileSrv,
        ExplorersSrv,
        $state,
        $stateParams,
        $http,
        $rootScope) {
 var vm = this;
 vm.explorersSrv = new ExplorersSrv();
 vm.profileSrv = new ProfileSrv();
 vm.connections;

 vm.userId = $stateParams.profileId;

 vm.explorersSrv.getUserExplorersStats(vm.userId).then(function (data) {
  vm.explorersStats = data;
 });

 vm.profileSrv.getUserConnections(vm.userId).then(function (data) {
  vm.connections = data;
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