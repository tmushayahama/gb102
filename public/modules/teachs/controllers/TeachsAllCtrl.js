var teachsAllCtrl = function (
        ConstantsManager,
        TeachsManager,
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

 vm.teachsManager = new TeachsManager();
 vm.teachsManager.getAllTeachs();
};

teachsAllCtrl.$inject = [
 'ConstantsManager',
 'TeachsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.teachs").controller('TeachsAllCtrl', teachsAllCtrl);
