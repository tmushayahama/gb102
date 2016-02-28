var projectManageCtrl = function (
        ProjectSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.projectId = $stateParams.projectId;
 vm.projects;
 vm.projectSrv = new ProjectSrv();

 vm.getProject = function (id) {
  vm.projectSrv.getProject(id).then(function (data) {
   vm.project = data;
   vm.getSubProjects(vm.project.explorer_id);
  });
 };

 vm.getSubProjects = function (explorerId) {
  vm.projectSrv.getSubProjects(explorerId).then(function (data) {
   vm.projects = data;
  });
 }

 vm.getProject(vm.projectId);

};

projectManageCtrl.$inject = [
 'ProjectSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.project").controller('ProjectManageCtrl', projectManageCtrl);
