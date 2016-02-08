
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

 vm.collaboration;
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

 vm.getCollaboration = function (id) {
  vm.collaborationManager.getCollaboration(id).then(function (data) {
   vm.collaboration = data;
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



 //--------init------

 vm.getCollaboration(vm.collaborationId);
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

angular.module("app.collaboration").controller('CollaborationCtrl', collaborationCtrl);