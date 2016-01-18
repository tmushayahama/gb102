var profileSwipeAnswersCtrl = function (
        level_categories,
        ConstantsManager,
        SwipeManager,
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
 vm.profileId = $stateParams.profileId;

 vm.constantsManager = new ConstantsManager();
 vm.profileSwipeLevels;

 vm.getSwipes = function () {
  vm.swipeManager.getSwipes(vm.profileId);
 };

 vm.swipeManager = new SwipeManager();
 vm.getSwipes();
 vm.constantsManager.getLevel(level_categories.profile_swipe).then(function (data) {
  vm.profileSwipeLevels = data;
 });

};


profileSwipeAnswersCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SwipeManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profile").controller('ProfileSwipeAnswersCtrl', profileSwipeAnswersCtrl);
