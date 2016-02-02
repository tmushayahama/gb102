var teachsMineCtrl = function (
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
 vm.teachsManager.getMyTeachs();
};


teachsMineCtrl.$inject = [
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

angular.module("app.teach").controller('TeachsMineCtrl', teachsMineCtrl);
