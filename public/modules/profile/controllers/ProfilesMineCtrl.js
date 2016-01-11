var profilesMineCtrl = function (
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
 vm.profilesManager.getMyProfiles();
};


profilesMineCtrl.$inject = [
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

angular.module("app.profiles").controller('ProfilesMineCtrl', profilesMineCtrl);