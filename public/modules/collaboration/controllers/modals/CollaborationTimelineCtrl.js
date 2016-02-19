var collaborationProgressCtrl = function (
        CollaborationProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationProgressData) {
 var vm = this;
 vm.collaborationId = collaborationProgressData.collaboration_id;
 vm.collaborationProgressId = collaborationProgressData.id;
 vm.collaborationProgressManager = new CollaborationProgressManager();


 vm.progressId = collaborationProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCollaborationProgressData = vm.defaultCollaborationProgressData;

 vm.getCollaborationProgress = function (collaborationId, progressId) {
  vm.collaborationProgressManager.getCollaborationProgress(collaborationId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationProgress = function (data) {
  vm.collaborationProgressManager.editCollaborationProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationProgressSections = {
  details: function (details) {
   var collaborationProgressData = {
    collaborationProgressId: vm.collaborationProgressId,
    title: details.title,
    description: details.description
   };
   vm.editCollaborationProgress(collaborationProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getCollaborationProgress(vm.collaborationId, vm.progressId);
};


collaborationProgressCtrl.$inject = [
 'CollaborationProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationProgressData'];

angular.module("app.collaboration").controller('CollaborationProgressCtrl', collaborationProgressCtrl);
