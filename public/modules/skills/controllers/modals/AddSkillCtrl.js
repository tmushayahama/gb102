angular.module("app.skills").controller('AddSkillCtrl',
        ['$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'skillLevels',
         function (
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 skillLevels) {
          var vm = this;

          vm.skill = "";
          vm.skillLevels = skillLevels;

          vm.ok = function () {
           $uibModalInstance.close(vm.skill);
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };
         }
        ])