var collaborationsAllCtrl = function (
        ConstantsManager,
        CollaborationsManager,
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

 vm.collaborationsManager = new CollaborationsManager();
 vm.collaborationsManager.getAllCollaborations();
};

collaborationsAllCtrl.$inject = [
 'ConstantsManager',
 'CollaborationsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.collaborations").controller('CollaborationsAllCtrl', collaborationsAllCtrl);
