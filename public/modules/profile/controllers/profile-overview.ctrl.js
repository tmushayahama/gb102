var profileOverviewCtrl = function (
        ProfileSrv,
        ComponentsSrv,
        $state,
        $stateParams,
        $http,
        $rootScope) {
 var vm = this;
 vm.ComponentsSrv = new ComponentsSrv();
 vm.profileSrv = new ProfileSrv();
 vm.connections;

 vm.userId = $stateParams.profileId;

 vm.ComponentsSrv.getUserExplorersStats(vm.userId).then(function (data) {
  vm.explorersStats = data;
 });

 vm.profileSrv.getUserConnections(vm.userId).then(function (data) {
  vm.connections = data;
 });

};

profileOverviewCtrl.$inject = [
 'ProfileSrv',
 'ComponentsSrv',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope'];

angular.module("app.profile").controller('ProfileOverviewCtrl', profileOverviewCtrl);