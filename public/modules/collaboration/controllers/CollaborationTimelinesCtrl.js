var collaborationProgressCtrl = function (
        CollaborationProgressSrv,
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
 vm.collaborationId = $stateParams.collaborationId;
 vm.collaborationProgressCopy;
 vm.collaborationProgressSrv = new CollaborationProgressSrv();
 vm.progressFormDisplay = false;

 vm.defaultCollaborationProgressData = {
  collaborationId: $stateParams.collaborationId,
  privacy: 0
 }
 vm.newCollaborationProgressData = angular.copy(vm.defaultCollaborationProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createCollaborationProgress = function (data) {
  vm.collaborationProgressSrv.createCollaborationProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newCollaborationProgressData = angular.copy(vm.defaultCollaborationProgressData);
   vm.collaborationProgressCopy = angular.copy(vm.collaborationProgressSrv.collaborationProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationProgress = function (data) {
  vm.collaborationProgressSrv.editCollaborationProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newCollaborationProgressData = angular.copy(vm.defaultCollaborationProgressData);
   vm.collaborationProgressCopy = angular.copy(vm.collaborationProgressSrv.collaborationProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationProgressSections = {
  details: function (collaborationProgressId, detail) {
   var collaborationProgressData = {
    collaborationProgressId: collaborationProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editCollaborationProgress(collaborationProgressData);
  }
 }

 vm.cancelCollaborationProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newCollaborationProgressData = angular.copy(vm.defaultCollaborationProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCollaborationProgress = function (collaborationProgress, collaborationProgressCopy) {
  collaborationProgress = collaborationProgressCopy;
  /*
   $filter('filter')
   (vm.collaborationProgressSrv.collaborationProgress, {id: collaborationProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.collaborationProgressCopy, {id: collaborationProgressId}, true)[0]);
   if (collaborationProgress.length && collaborationProgressCopy.length) {
   // vm.collaborationProgressSrv.collaborationProgress angular.copy(vm.collaborationProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.collaborationProgress;
 }), function () {
  //vm.remainingCount = filterFilter(collaborationProgress, {completed: false}).length;
  vm.doneCount = vm.collaborationProgressSrv.collaborationProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationProgressService.put(vm.collaborationProgress);
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




 vm.editProgress = function (collaborationProgress) {
  vm.editedProgress = collaborationProgress;
  // Clone the original collaborationProgress to restore it on demand.
  vm.originalProgress = angular.copy(collaborationProgress);
 };


 vm.doneEditing = function (collaborationProgress) {
  vm.editedProgress = null;
  collaborationProgress.title = collaborationProgress.title.trim();

  if (!collaborationProgress.title) {
   vm.removeProgress(collaborationProgress);
  }
 };

 vm.openCollaborationProgress = function (collaborationProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'collaboration-progress-modal.html',
   controller: 'CollaborationProgressCtrl as collaborationProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    collaborationProgressData: function () {
     return collaborationProgress;
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
 vm.collaborationProgressSrv.getCollaborationProgress(vm.collaborationId);
};

collaborationProgressCtrl.$inject = [
 'CollaborationProgressSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.collaboration").controller('CollaborationProgressCtrl', collaborationProgressCtrl);
