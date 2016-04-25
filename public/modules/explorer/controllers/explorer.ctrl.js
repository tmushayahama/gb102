
var explorerCtrl = function (
        _,
        ConstantsSrv,
        ExplorerSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explorer.css'
 }, $scope);

 vm.explorer = [];
 var explorerData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.explorerIcons = [];
 vm.explorerIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomExplorerIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.explorerIcons.length; j++) {
    var rand = getRand(0, vm.explorerIcons.length);
    rowArray.push(vm.explorerIcons[rand].name);
   }
   vm.explorerIconsArray.push(rowArray);
  }
 };


 vm.explorerId = $stateParams.explorerId;

 vm.explorerSrv = new ExplorerSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.explorerFormDisplay = false;

 vm.getExplorer = function (id, data) {
  vm.explorerSrv.getExplorer(id, data).success(function (response) {
   vm.explorer = response;
  }).error(function (response) {
   console.log(response);
  });
 };

 vm.defaultExplorerData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerData = angular.copy(vm.defaultExplorerData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createExplorer = function (data) {
  vm.explorerSrv.createExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorerCopy = angular.copy(vm.explorerSrv.explorer);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorer = function (data) {
  vm.explorerSrv.editExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorerCopy = angular.copy(vm.explorerSrv.explorer);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSections = {
  details: function (explorerId, detail) {
   var explorerData = {
    explorerId: explorerId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorer(explorerData);
  }
 }

 vm.cancelExplorer = function (form) {
  vm.FormDisplay = false;
  vm.newExplorerData = angular.copy(vm.defaultExplorerData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorer = function (explorer, explorerCopy) {
  explorer = explorerCopy;
  /*
   $filter('filter')
   (vm.explorerSrv.explorer, {id: explorerId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerCopy, {id: explorerId}, true)[0]);
   if (explorer.length && explorerCopy.length) {
   // vm.explorerSrv.explorer angular.copy(vm.explorerCopy);
   }
   */
 };


 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorer;
 }), function () {
  //vm.remainingCount = filterFilter(explorer, {completed: false}).length;
  vm.doneCount = vm.explorerSrv.explorer.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerService.put(vm.explorer);
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




 vm.edit = function (explorer) {
  vm.edited = explorer;
  // Clone the original explorer to restore it on demand.
  vm.original = angular.copy(explorer);
 };


 vm.doneEditing = function (explorer) {
  vm.edited = null;
  explorer.title = explorer.title.trim();

  if (!explorer.title) {
   vm.remove(explorer);
  }
 };

 //--------init------
 vm.explorerSrv.getExplorer(vm.explorerId).then(function (data) {
  $css.bind({
   href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + data.app_type.name.toLowerCase() + '.css'
  }, $scope);
 });

 vm.getSubExplorersStats = function (explorerId) {
  vm.explorerSrv.getSubExplorersStats(explorerId).then(function (data) {
   vm.subExplorersStats = data;
  });
 }

 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.explorerIcons = data;
  vm.getRandomExplorerIcons();
 });

 vm.getSubExplorersStats(vm.explorerId);
};

explorerCtrl.$inject = ['_',
 'ConstantsSrv',
 'ExplorerSrv',
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

angular.module("app.explorer").controller('ExplorerCtrl', explorerCtrl);