var swipesAllCtrl = function (
        ConstantsManager,
        SwipesManager,
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

 vm.swipesManager = new SwipesManager();
 vm.swipesManager.getAllSwipes();
};

swipesAllCtrl.$inject = [
 'ConstantsManager',
 'SwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipes").controller('SwipesAllCtrl', swipesAllCtrl);
