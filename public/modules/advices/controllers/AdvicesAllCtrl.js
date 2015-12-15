angular.module("app.skills").controller('SkillsAllCtrl',
        ['ConstantsManager',
         'SkillsManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         function (
                 ConstantsManager,
                 SkillsManager,
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

          vm.skillsManager = new SkillsManager();
          vm.skillsManager.getAllSkills();
         }
        ])