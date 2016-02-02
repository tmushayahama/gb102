
var teachsCtrl = function (
        level_categories,
        ConstantsManager,
        SearchManager,
        TeachsManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-teach.css'
 }, $scope);

 vm.teachsManager = new TeachsManager();
 vm.constantsManager = new ConstantsManager();
 $rootScope.appName = 'TEACHR';
 vm.teachLevels;
 vm.teachTypes;


 $scope.superhero = {
  selected: 'Batman'
 };

 $scope.$watch('superhero.selected', function (newVal, oldVal) {
  /*      if (newVal !== oldVal) {
   if ($scope.superheroes.indexOf(newVal) === -1) {
   $scope.superheroes.unshift(newVal);
   }
   }*/
 });

 vm.createTeach = function (data) {
  vm.teachsManager.createTeach(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newTeachData = angular.copy(vm.defaultTeachData);
   vm.teachsCopy = angular.copy(vm.teachsManager.teachs);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeach = function (data) {
  vm.teachsManager.editTeach(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newTeachData = angular.copy(vm.defaultTeachData);
   vm.teachsCopy = angular.copy(vm.teachsManager.teachs);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachSections = {
  details: function (teachId, detail) {
   var teachData = {
    teachId: teachId,
    title: detail.title,
    description: detail.description
   };
   vm.editTeach(teachData);
  }
 }

 vm.cancelTeach = function (form) {
  vm.FormDisplay = false;
  vm.newTeachData = angular.copy(vm.defaultTeachData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertTeach = function (teach, teachCopy) {
  teach = teachCopy;
  /*
   $filter('filter')
   (vm.teachsManager.teachs, {id: teachId}, true)[0]
   = angular.copy($filter('filter')
   (vm.teachsCopy, {id: teachId}, true)[0]);
   if (teach.length && teachCopy.length) {
   // vm.teachsManager.teachs angular.copy(vm.teachsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.teachs;
 }), function () {
  //vm.remainingCount = filterFilter(teachs, {completed: false}).length;
  vm.doneCount = vm.teachsManager.teachs.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TeachService.put(vm.teachs);
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




 vm.edit = function (teach) {
  vm.edited = teach;
  // Clone the original teach to restore it on demand.
  vm.original = angular.copy(teach);
 };


 vm.doneEditing = function (teach) {
  vm.edited = null;
  teach.title = teach.title.trim();

  if (!teach.title) {
   vm.remove(teach);
  }
 };

 $rootScope.openAddExploreModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-teach-modal.html',
   controller: 'CreateTeachCtrl as createTeachCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    teachTypes: function () {
     return vm.teachTypes;
    }
   }
  });

  modalInstance.result.then(function (teach) {
   vm.teachsManager.createTeach(teach);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsManager.getLevel(level_categories.teach).then(function (data) {
  vm.teachTypes = data;
 });
 vm.constantsManager.getLevel(level_categories.teach).then(function (data) {
  vm.teachLevels = data;
 });
};

teachsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SearchManager',
 'TeachsManager',
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

angular.module("app.teach").controller('TeachsCtrl', teachsCtrl);