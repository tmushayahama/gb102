angular.module("app.goals").controller('GoalsAllCtrl',
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
          vm.goalsManager.getAllGoals();
         }
        ])