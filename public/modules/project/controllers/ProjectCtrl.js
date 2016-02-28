
var projectCtrl = function (
        _,
        ConstantsSrv,
        ProjectSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-project.css'
 }, $scope);

 vm.project;
 var projectData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.projectIcons = [];
 vm.projectIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomProjectIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.projectIcons.length; j++) {
    var rand = getRand(0, vm.projectIcons.length);
    rowArray.push(vm.projectIcons[rand].name);
   }
   vm.projectIconsArray.push(rowArray);
  }
 };


 vm.projectId = $stateParams.projectId;

 vm.projectSrv = new ProjectSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.projectFormDisplay = false;

 vm.getProject = function (id) {
  vm.projectSrv.getProject(id).then(function (data) {
   vm.project = data;
  });
 };




 vm.defaultProjectData = {
  projectId: $stateParams.projectId,
  privacy: 0
 }
 vm.newProjectData = angular.copy(vm.defaultProjectData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createProject = function (data) {
  vm.projectSrv.createProject(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProjectData = angular.copy(vm.defaultProjectData);
   vm.projectCopy = angular.copy(vm.projectSrv.project);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProject = function (data) {
  vm.projectSrv.editProject(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProjectData = angular.copy(vm.defaultProjectData);
   vm.projectCopy = angular.copy(vm.projectSrv.project);
  }, function (response) {
   console.log(response);
  });
 };



 //--------init------

 vm.getProject(vm.projectId);
 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.projectIcons = data;
  vm.getRandomProjectIcons();
 });
};

projectCtrl.$inject = ['_',
 'ConstantsSrv',
 'ProjectSrv',
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

angular.module("app.project").controller('ProjectCtrl', projectCtrl);