var profileAllCtrl = function (
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
 vm.profileManager.getAllProfile();
};

profileAllCtrl.$inject = [
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

angular.module("app.profile").controller('ProfileAllCtrl', profileAllCtrl);
