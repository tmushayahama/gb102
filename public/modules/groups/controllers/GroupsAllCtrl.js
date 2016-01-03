var groupsAllCtrl = function (
        ConstantsManager,
        GroupsManager,
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

 vm.groupsManager = new GroupsManager();
 vm.groupsManager.getAllGroups();
};

groupsAllCtrl.$inject = [
 'ConstantsManager',
 'GroupsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.groups").controller('GroupsAllCtrl', groupsAllCtrl);
