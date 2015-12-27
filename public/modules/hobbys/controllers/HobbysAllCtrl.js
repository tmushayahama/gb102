var hobbysAllCtrl = function (
        ConstantsManager,
        HobbysManager,
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

 vm.hobbysManager = new HobbysManager();
 vm.hobbysManager.getAllHobbys();
};

hobbysAllCtrl.$inject = [
 'ConstantsManager',
 'HobbysManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.hobbys").controller('HobbysAllCtrl', hobbysAllCtrl);
