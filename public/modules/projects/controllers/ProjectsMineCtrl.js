var projectsMineCtrl = function (
        ConstantsManager,
        ProjectsManager,
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
 vm.projectsManager = new ProjectsManager();
 vm.projectsManager.getMyProjects();
};


projectsMineCtrl.$inject = [
 'ConstantsManager',
 'ProjectsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.projects").controller('ProjectsMineCtrl', projectsMineCtrl);
