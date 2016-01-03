
var collaborationCtrl = function (
        _,
        ConstantsManager,
        CollaborationManager,
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

 vm.collaboration = [];
 var collaborationData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.collaborationIcons = [];
 vm.collaborationIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomCollaborationIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.collaborationIcons.length; j++) {
    var rand = getRand(0, vm.collaborationIcons.length);
    rowArray.push(vm.collaborationIcons[rand].name);
   }
   vm.collaborationIconsArray.push(rowArray);
  }
 };


 vm.collaborationId = $stateParams.collaborationId;

 vm.collaborationManager = new CollaborationManager();
 vm.constantsManager = new ConstantsManager();

 vm.collaborationFormDisplay = false;

 vm.getCollaboration = function (id, data) {
  vm.collaborationManager.getCollaboration(id, data).success(function (response) {
   vm.collaboration = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultCollaborationData = {
  collaborationId: $stateParams.collaborationId,
  privacy: 0
 }
 vm.newCollaborationData = angular.copy(vm.defaultCollaborationData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createCollaboration = function (data) {
  vm.collaborationManager.createCollaboration(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCollaborationData = angular.copy(vm.defaultCollaborationData);
   vm.collaborationCopy = angular.copy(vm.collaborationManager.collaboration);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaboration = function (data) {
  vm.collaborationManager.editCollaboration(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCollaborationData = angular.copy(vm.defaultCollaborationData);
   vm.collaborationCopy = angular.copy(vm.collaborationManager.collaboration);
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
   (vm.collaborationManager.collaboration, {id: collaborationId}, true)[0]
   = angular.copy($filter('filter')
   (vm.collaborationCopy, {id: collaborationId}, true)[0]);
   if (collaboration.length && collaborationCopy.length) {
   // vm.collaborationManager.collaboration angular.copy(vm.collaborationCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.collaboration;
 }), function () {
  //vm.remainingCount = filterFilter(collaboration, {completed: false}).length;
  vm.doneCount = vm.collaborationManager.collaboration.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationService.put(vm.collaboration);
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

 //--------init------
 vm.collaborationManager.getCollaboration(vm.collaborationId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.collaborationIcons = data;
  vm.getRandomCollaborationIcons();
 });
};

collaborationCtrl.$inject = ['_',
 'ConstantsManager',
 'CollaborationManager',
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

angular.module("app.collaborations").controller('CollaborationCtrl', collaborationCtrl);