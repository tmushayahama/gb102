
var collaborationsCtrl = function (
        level_categories,
        ConstantsManager,
        CollaborationsManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-collaboration.css'
 }, $scope);

 vm.collaborationsManager = new CollaborationsManager();
 vm.constantsManager = new ConstantsManager();
 vm.collaborationLevels;


 vm.createCollaboration = function (data) {
  vm.collaborationsManager.createCollaboration(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCollaborationData = angular.copy(vm.defaultCollaborationData);
   vm.collaborationsCopy = angular.copy(vm.collaborationsManager.collaborations);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaboration = function (data) {
  vm.collaborationsManager.editCollaboration(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCollaborationData = angular.copy(vm.defaultCollaborationData);
   vm.collaborationsCopy = angular.copy(vm.collaborationsManager.collaborations);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationSections = {
  details: function (collaborationId, detail) {
   var collaborationData = {
    collaborationId: collaborationId,
    title: detail.title,
    description: detail.description
   };
   vm.editCollaboration(collaborationData);
  }
 }

 vm.cancelCollaboration = function (form) {
  vm.FormDisplay = false;
  vm.newCollaborationData = angular.copy(vm.defaultCollaborationData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCollaboration = function (collaboration, collaborationCopy) {
  collaboration = collaborationCopy;
  /*
   $filter('filter')
   (vm.collaborationsManager.collaborations, {id: collaborationId}, true)[0]
   = angular.copy($filter('filter')
   (vm.collaborationsCopy, {id: collaborationId}, true)[0]);
   if (collaboration.length && collaborationCopy.length) {
   // vm.collaborationsManager.collaborations angular.copy(vm.collaborationsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.collaborations;
 }), function () {
  //vm.remainingCount = filterFilter(collaborations, {completed: false}).length;
  vm.doneCount = vm.collaborationsManager.collaborations.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationService.put(vm.collaborations);
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




 vm.edit = function (collaboration) {
  vm.edited = collaboration;
  // Clone the original collaboration to restore it on demand.
  vm.original = angular.copy(collaboration);
 };


 vm.doneEditing = function (collaboration) {
  vm.edited = null;
  collaboration.title = collaboration.title.trim();

  if (!collaboration.title) {
   vm.remove(collaboration);
  }
 };

 vm.openAddCollaborationModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-collaboration-modal.html',
   controller: 'AddCollaborationCtrl as addCollaborationCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    collaborationLevels: function () {
     return vm.collaborationLevels;
    }
   }
  });

  modalInstance.result.then(function (collaboration) {
   vm.collaborationsManager.createCollaboration(collaboration);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.collaborationsManager.getCollaborations(vm.collaborationId);
 vm.constantsManager.getLevel(level_categories.collaboration).then(function (data) {
  vm.collaborationLevels = data;
 });
};

collaborationsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'CollaborationsManager',
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

angular.module("app.collaborations").controller('CollaborationsCtrl', collaborationsCtrl);