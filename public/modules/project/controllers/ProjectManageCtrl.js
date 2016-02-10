var projectManageCtrl = function (
        ProjectManager,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.projectId = $stateParams.projectId;
 vm.projects;
 vm.projectManager = new ProjectManager();

 vm.getProject = function (id) {
  vm.projectManager.getProject(id).then(function (data) {
   vm.project = data;
   vm.getSubProjects(vm.project.explore_id);
  });
 };

 vm.getSubProjects = function (exploreId) {
  vm.projectManager.getSubProjects(exploreId).then(function (data) {
   vm.projects = data;
  });
 }

 vm.getProject(vm.projectId);

};

projectManageCtrl.$inject = [
 'ProjectManager',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.project").controller('ProjectManageCtrl', projectManageCtrl);
