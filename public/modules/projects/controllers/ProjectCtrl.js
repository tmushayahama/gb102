
var projectCtrl = function (
        _,
        ConstantsManager,
        ProjectManager,
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

 vm.project = [];
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

 vm.projectManager = new ProjectManager();
 vm.constantsManager = new ConstantsManager();

 vm.projectFormDisplay = false;

 vm.getProject = function (id, data) {
  vm.projectManager.getProject(id, data).success(function (response) {
   vm.project = response;
  }).error(function (response) {
   console.log(response);
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
  vm.projectManager.createProject(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProjectData = angular.copy(vm.defaultProjectData);
   vm.projectCopy = angular.copy(vm.projectManager.project);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProject = function (data) {
  vm.projectManager.editProject(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProjectData = angular.copy(vm.defaultProjectData);
   vm.projectCopy = angular.copy(vm.projectManager.project);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectSections = {
  details: function (projectId, detail) {
   var projectData = {
    projectId: projectId,
    title: detail.title,
    description: detail.description
   };
   vm.editProject(projectData);
  }
 }

 vm.cancelProject = function (form) {
  vm.FormDisplay = false;
  vm.newProjectData = angular.copy(vm.defaultProjectData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProject = function (project, projectCopy) {
  project = projectCopy;
  /*
   $filter('filter')
   (vm.projectManager.project, {id: projectId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectCopy, {id: projectId}, true)[0]);
   if (project.length && projectCopy.length) {
   // vm.projectManager.project angular.copy(vm.projectCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.project;
 }), function () {
  //vm.remainingCount = filterFilter(project, {completed: false}).length;
  vm.doneCount = vm.projectManager.project.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectService.put(vm.project);
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




 vm.edit = function (project) {
  vm.edited = project;
  // Clone the original project to restore it on demand.
  vm.original = angular.copy(project);
 };


 vm.doneEditing = function (project) {
  vm.edited = null;
  project.title = project.title.trim();

  if (!project.title) {
   vm.remove(project);
  }
 };

 //--------init------
 vm.projectManager.getProject(vm.projectId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.projectIcons = data;
  vm.getRandomProjectIcons();
 });
};

projectCtrl.$inject = ['_',
 'ConstantsManager',
 'ProjectManager',
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

angular.module("app.projects").controller('ProjectCtrl', projectCtrl);