var collaborationsMineCtrl = function (
        ConstantsSrv,
        CollaborationsSrv,
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
 vm.collaborationsSrv = new CollaborationsSrv();
 vm.collaborationsSrv.getMyCollaborations();
};


collaborationsMineCtrl.$inject = [
 'ConstantsSrv',
 'CollaborationsSrv',
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
