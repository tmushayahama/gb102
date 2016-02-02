var collaborationsMineCtrl = function (
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
 vm.collaborationsManager.getMyCollaborations();
};


collaborationsMineCtrl.$inject = [
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

angular.module("app.collaboration").controller('CollaborationsMineCtrl', collaborationsMineCtrl);
