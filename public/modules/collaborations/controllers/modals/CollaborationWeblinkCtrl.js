var collaborationWeblinkCtrl = function (
        CollaborationWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationWeblinkData) {
 var vm = this;
 vm.collaborationId = collaborationWeblinkData.collaboration_id;
 vm.collaborationWeblinkId = collaborationWeblinkData.id;
 vm.collaborationWeblinkManager = new CollaborationWeblinkManager();


 vm.weblinkId = collaborationWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCollaborationWeblinkData = vm.defaultCollaborationWeblinkData;

 vm.getCollaborationWeblink = function (collaborationId, weblinkId) {
  vm.collaborationWeblinkManager.getCollaborationWeblink(collaborationId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationWeblink = function (data) {
  vm.collaborationWeblinkManager.editCollaborationWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationWeblinkSections = {
  details: function (details) {
   var collaborationWeblinkData = {
    collaborationWeblinkId: vm.collaborationWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editCollaborationWeblink(collaborationWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getCollaborationWeblink(vm.collaborationId, vm.weblinkId);
};


collaborationWeblinkCtrl.$inject = [
 'CollaborationWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationWeblinkData'];

angular.module("app.collaborations").controller('CollaborationWeblinkCtrl', collaborationWeblinkCtrl);
