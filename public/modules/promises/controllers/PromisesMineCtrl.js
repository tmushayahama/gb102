angular.module("app.promises").controller('PromisesMineCtrl',
        ['ConstantsManager',
         'PromisesManager',
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
                 PromisesManager,
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
          vm.promisesManager = new PromisesManager();
          vm.promisesManager.getMyPromises();
         }
        ])