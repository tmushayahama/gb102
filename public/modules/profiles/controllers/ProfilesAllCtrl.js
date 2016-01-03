var profilesAllCtrl = function (
        ConstantsManager,
        ProfilesManager,
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

 vm.profilesManager = new ProfilesManager();
 vm.profilesManager.getAllProfiles();
};

profilesAllCtrl.$inject = [
 'ConstantsManager',
 'ProfilesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profiles").controller('ProfilesAllCtrl', profilesAllCtrl);
