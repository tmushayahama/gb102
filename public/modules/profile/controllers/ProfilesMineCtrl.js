var profileMineCtrl = function (
        ConstantsManager,
        ProfileManager,
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
 vm.profileManager = new ProfileManager();
 vm.profileManager.getMyProfile();
};


profileMineCtrl.$inject = [
 'ConstantsManager',
 'ProfileManager',
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
