angular.module("app.goals").controller('GoalsMineCtrl',
        ['ConstantsManager',
         'GoalsManager',
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
                 GoalsManager,
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
          vm.goalsManager = new GoalsManager();
          vm.goalsManager.getMyGoals();
         }
        ])