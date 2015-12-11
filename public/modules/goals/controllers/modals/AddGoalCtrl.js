angular.module("app.goals").controller('AddGoalCtrl',
        ['$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'goalLevels',
         function (
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 goalLevels) {
          var vm = this;

          vm.goal = "";
          vm.goalLevels = goalLevels;

          vm.ok = function () {
           $uibModalInstance.close(vm.goal);
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };
         }
        ])