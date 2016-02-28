var collaborationWeblinksCtrl = function (
        CollaborationWeblinksSrv,
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
 vm.collaborationWeblinksCopy;
 vm.collaborationWeblinksSrv = new CollaborationWeblinksSrv();
 vm.weblinkFormDisplay = false;

 vm.defaultCollaborationWeblinkData = {
  collaborationId: $stateParams.collaborationId,
  privacy: 0
 }
 vm.newCollaborationWeblinkData = angular.copy(vm.defaultCollaborationWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createCollaborationWeblink = function (data) {
  vm.collaborationWeblinksSrv.createCollaborationWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newCollaborationWeblinkData = angular.copy(vm.defaultCollaborationWeblinkData);
   vm.collaborationWeblinksCopy = angular.copy(vm.collaborationWeblinksSrv.collaborationWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationWeblink = function (data) {
  vm.collaborationWeblinksSrv.editCollaborationWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newCollaborationWeblinkData = angular.copy(vm.defaultCollaborationWeblinkData);
   vm.collaborationWeblinksCopy = angular.copy(vm.collaborationWeblinksSrv.collaborationWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationWeblinkSections = {
  details: function (collaborationWeblinkId, detail) {
   var collaborationWeblinkData = {
    collaborationWeblinkId: collaborationWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editCollaborationWeblink(collaborationWeblinkData);
  }
 }

 vm.cancelCollaborationWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newCollaborationWeblinkData = angular.copy(vm.defaultCollaborationWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCollaborationWeblink = function (collaborationWeblink, collaborationWeblinkCopy) {
  collaborationWeblink = collaborationWeblinkCopy;
  /*
   $filter('filter')
   (vm.collaborationWeblinksSrv.collaborationWeblinks, {id: collaborationWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.collaborationWeblinksCopy, {id: collaborationWeblinkId}, true)[0]);
   if (collaborationWeblink.length && collaborationWeblinkCopy.length) {
   // vm.collaborationWeblinksSrv.collaborationWeblinks angular.copy(vm.collaborationWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.collaborationWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(collaborationWeblinks, {completed: false}).length;
  vm.doneCount = vm.collaborationWeblinksSrv.collaborationWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationWeblinkService.put(vm.collaborationWeblinks);
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




 vm.editWeblink = function (collaborationWeblink) {
  vm.editedWeblink = collaborationWeblink;
  // Clone the original collaborationWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(collaborationWeblink);
 };


 vm.doneEditing = function (collaborationWeblink) {
  vm.editedWeblink = null;
  collaborationWeblink.title = collaborationWeblink.title.trim();

  if (!collaborationWeblink.title) {
   vm.removeWeblink(collaborationWeblink);
  }
 };

 vm.openCollaborationWeblink = function (collaborationWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'collaboration-weblink-modal.html',
   controller: 'CollaborationWeblinkCtrl as collaborationWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    collaborationWeblinkData: function () {
     return collaborationWeblink;
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
 vm.collaborationWeblinksSrv.getCollaborationWeblinks(vm.collaborationId);
};

collaborationWeblinksCtrl.$inject = [
 'CollaborationWeblinksSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.collaboration").controller('CollaborationWeblinksCtrl', collaborationWeblinksCtrl);
