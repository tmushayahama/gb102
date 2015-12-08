angular.module("app.skills").controller('AddSkillCtrl',
        ['ConstantManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         function (
                 ConstantManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log) {
          var vm = this;

          vm.skill = "";
          vm.constantManager = new ConstantManager();
          vm.ok = function () {
           $uibModalInstance.close(vm.skill);
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };
         }
        ])