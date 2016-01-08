var swipesMineCtrl = function (
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
 vm.swipesManager.getMySwipes();
};


swipesMineCtrl.$inject = [
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

angular.module("app.swipe").controller('SwipesMineCtrl', swipesMineCtrl);
