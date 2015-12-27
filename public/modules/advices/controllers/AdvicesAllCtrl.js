angular.module("app.advices").controller('AdvicesAllCtrl',
        ['ConstantsManager',
         'AdvicesManager',
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
                 AdvicesManager,
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

          vm.advicesManager = new AdvicesManager();
          vm.advicesManager.getAllAdvices();
         }
        ])