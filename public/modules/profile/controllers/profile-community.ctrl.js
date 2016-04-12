var profileCommunityCtrl = function (
        ProfileSrv,
        $state,
        $stateParams,
        $http,
        $rootScope) {
 var vm = this;
 vm.profileSrv = new ProfileSrv();
 vm.connections;

 vm.userId = $stateParams.profileId;

 vm.profileSrv.getUserConnections(vm.userId).then(function (data) {
  vm.connections = data;
 });

};

profileCommunityCtrl.$inject = [
 'ProfileSrv',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope'];

angular.module("app.profile").controller('ProfileCommunityCtrl', profileCommunityCtrl);