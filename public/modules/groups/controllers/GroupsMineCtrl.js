var groupsMineCtrl = function (
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
 vm.groupsManager.getMyGroups();
};


groupsMineCtrl.$inject = [
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

angular.module("app.groups").controller('GroupsMineCtrl', groupsMineCtrl);
