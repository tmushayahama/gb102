var hobbysMineCtrl = function (
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
 vm.hobbysManager.getMyHobbys();
};


hobbysMineCtrl.$inject = [
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

angular.module("app.hobbys").controller('HobbysMineCtrl', hobbysMineCtrl);
