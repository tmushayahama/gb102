var profileMineCtrl = function (
        ConstantsSrv,
        ProfileSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.profileSrv = new ProfileSrv();
 vm.profileSrv.getMyProfile();
};


profileMineCtrl.$inject = [
 'ConstantsSrv',
 'ProfileSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profile").controller('ProfileMineCtrl', profileMineCtrl);
