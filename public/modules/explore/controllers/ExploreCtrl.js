
var exploreCtrl = function (
        _,
        ConstantsManager,
        ExploreManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;
 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explore.css'
 }, $scope);

 vm.explore = [];
 var exploreData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.exploreIcons = [];
 vm.exploreIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomExploreIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.exploreIcons.length; j++) {
    var rand = getRand(0, vm.exploreIcons.length);
    rowArray.push(vm.exploreIcons[rand].name);
   }
   vm.exploreIconsArray.push(rowArray);
  }
 };


 vm.exploreId = $stateParams.exploreId;

 vm.exploreManager = new ExploreManager();
 vm.constantsManager = new ConstantsManager();

 vm.exploreFormDisplay = false;

 vm.getExplore = function (id, data) {
  vm.exploreManager.getExplore(id, data).success(function (response) {
   vm.explore = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultExploreData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreData = angular.copy(vm.defaultExploreData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createExplore = function (data) {
  vm.exploreManager.createExplore(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExploreData = angular.copy(vm.defaultExploreData);
   vm.exploreCopy = angular.copy(vm.exploreManager.explore);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplore = function (data) {
  vm.exploreManager.editExplore(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExploreData = angular.copy(vm.defaultExploreData);
   vm.exploreCopy = angular.copy(vm.exploreManager.explore);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreSections = {
  details: function (exploreId, detail) {
   var exploreData = {
    exploreId: exploreId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplore(exploreData);
  }
 }

 vm.cancelExplore = function (form) {
  vm.FormDisplay = false;
  vm.newExploreData = angular.copy(vm.defaultExploreData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplore = function (explore, exploreCopy) {
  explore = exploreCopy;
  /*
   $filter('filter')
   (vm.exploreManager.explore, {id: exploreId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreCopy, {id: exploreId}, true)[0]);
   if (explore.length && exploreCopy.length) {
   // vm.exploreManager.explore angular.copy(vm.exploreCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explore;
 }), function () {
  //vm.remainingCount = filterFilter(explore, {completed: false}).length;
  vm.doneCount = vm.exploreManager.explore.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreService.put(vm.explore);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.edit = function (explore) {
  vm.edited = explore;
  // Clone the original explore to restore it on demand.
  vm.original = angular.copy(explore);
 };


 vm.doneEditing = function (explore) {
  vm.edited = null;
  explore.title = explore.title.trim();

  if (!explore.title) {
   vm.remove(explore);
  }
 };

 //--------init------
 vm.exploreManager.getExplore(vm.exploreId).then(function (data) {
  $css.bind({
   href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + data.app_type.name.toLowerCase() + '.css'
  }, $scope);
 });
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.exploreIcons = data;
  vm.getRandomExploreIcons();
 });
};

exploreCtrl.$inject = ['_',
 'ConstantsManager',
 'ExploreManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.explore").controller('ExploreCtrl', exploreCtrl);