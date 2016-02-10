var projectWeblinksCtrl = function (
        ProjectWeblinksManager,
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
 vm.projectId = $stateParams.projectId;
 vm.projectWeblinksCopy;
 vm.projectWeblinksManager = new ProjectWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultProjectWeblinkData = {
  projectId: $stateParams.projectId,
  privacy: 0
 }
 vm.newProjectWeblinkData = angular.copy(vm.defaultProjectWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createProjectWeblink = function (data) {
  vm.projectWeblinksManager.createProjectWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newProjectWeblinkData = angular.copy(vm.defaultProjectWeblinkData);
   vm.projectWeblinksCopy = angular.copy(vm.projectWeblinksManager.projectWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectWeblink = function (data) {
  vm.projectWeblinksManager.editProjectWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newProjectWeblinkData = angular.copy(vm.defaultProjectWeblinkData);
   vm.projectWeblinksCopy = angular.copy(vm.projectWeblinksManager.projectWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectWeblinkSections = {
  details: function (projectWeblinkId, detail) {
   var projectWeblinkData = {
    projectWeblinkId: projectWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editProjectWeblink(projectWeblinkData);
  }
 }

 vm.cancelProjectWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newProjectWeblinkData = angular.copy(vm.defaultProjectWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProjectWeblink = function (projectWeblink, projectWeblinkCopy) {
  projectWeblink = projectWeblinkCopy;
  /*
   $filter('filter')
   (vm.projectWeblinksManager.projectWeblinks, {id: projectWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectWeblinksCopy, {id: projectWeblinkId}, true)[0]);
   if (projectWeblink.length && projectWeblinkCopy.length) {
   // vm.projectWeblinksManager.projectWeblinks angular.copy(vm.projectWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.projectWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(projectWeblinks, {completed: false}).length;
  vm.doneCount = vm.projectWeblinksManager.projectWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectWeblinkService.put(vm.projectWeblinks);
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




 vm.editWeblink = function (projectWeblink) {
  vm.editedWeblink = projectWeblink;
  // Clone the original projectWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(projectWeblink);
 };


 vm.doneEditing = function (projectWeblink) {
  vm.editedWeblink = null;
  projectWeblink.title = projectWeblink.title.trim();

  if (!projectWeblink.title) {
   vm.removeWeblink(projectWeblink);
  }
 };

 vm.openProjectWeblink = function (projectWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'project-weblink-modal.html',
   controller: 'ProjectWeblinkCtrl as projectWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectWeblinkData: function () {
     return projectWeblink;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.projectWeblinksManager.getProjectWeblinks(vm.projectId);
};

projectWeblinksCtrl.$inject = [
 'ProjectWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.project").controller('ProjectWeblinksCtrl', projectWeblinksCtrl);
