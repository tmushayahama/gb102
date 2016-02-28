var profileAllCtrl = function (
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
 vm.profileSrv.getAllProfile();
};

profileAllCtrl.$inject = [
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

angular.module("app.profile").controller('ProfileAllCtrl', profileAllCtrl);
