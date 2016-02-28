var profileSwipeAnswersCtrl = function (
        level_categories,
        ConstantsSrv,
        SwipeSrv,
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

 vm.constantsSrv = new ConstantsSrv();
 vm.profileSwipeLevels;

 vm.getSwipes = function () {
  vm.swipeSrv.getSwipes(vm.profileId);
 };

 vm.swipeSrv = new SwipeSrv();
 vm.getSwipes();
 vm.constantsSrv.getLevel(level_categories.profile_swipe).then(function (data) {
  vm.profileSwipeLevels = data;
 });

};


profileSwipeAnswersCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SwipeSrv',
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
