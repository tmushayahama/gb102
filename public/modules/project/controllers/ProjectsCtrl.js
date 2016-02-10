
var projectsCtrl = function (
        level_categories,
        ConstantsManager,
        SearchManager,
        ProjectsManager,
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

 vm.projectsManager = new ProjectsManager();
 vm.constantsManager = new ConstantsManager();
 $rootScope.appName = 'PROJECTR';
 vm.projectLevels;
 vm.projectTypes;


 $scope.superhero = {
  selected: 'Batman'
 };

 $scope.$watch('superhero.selected', function (newVal, oldVal) {
  /*      if (newVal !== oldVal) {
   if ($scope.superheroes.indexOf(newVal) === -1) {
   $scope.superheroes.unshift(newVal);
   }
   }*/
 });

 vm.createProject = function (data) {
  vm.projectsManager.createProject(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProjectData = angular.copy(vm.defaultProjectData);
   vm.projectsCopy = angular.copy(vm.projectsManager.projects);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProject = function (data) {
  vm.projectsManager.editProject(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProjectData = angular.copy(vm.defaultProjectData);
   vm.projectsCopy = angular.copy(vm.projectsManager.projects);
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
   (vm.projectsManager.projects, {id: projectId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectsCopy, {id: projectId}, true)[0]);
   if (project.length && projectCopy.length) {
   // vm.projectsManager.projects angular.copy(vm.projectsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.projects;
 }), function () {
  //vm.remainingCount = filterFilter(projects, {completed: false}).length;
  vm.doneCount = vm.projectsManager.projects.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectService.put(vm.projects);
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

 $rootScope.openAddExploreModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-project-modal.html',
   controller: 'CreateProjectCtrl as createProjectCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectTypes: function () {
     return vm.projectTypes;
    }
   }
  });

  modalInstance.result.then(function (project) {
   vm.projectsManager.createProject(project);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsManager.getLevel(level_categories.project).then(function (data) {
  vm.projectTypes = data;
 });
 vm.constantsManager.getLevel(level_categories.project).then(function (data) {
  vm.projectLevels = data;
 });
};

projectsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SearchManager',
 'ProjectsManager',
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

angular.module("app.project").controller('ProjectsCtrl', projectsCtrl);