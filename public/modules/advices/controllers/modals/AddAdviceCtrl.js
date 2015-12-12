angular.module("app.advices").controller('AddAdviceCtrl',
        ['$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'adviceLevels',
         function (
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 adviceLevels) {
          var vm = this;

          vm.advice = "";
          vm.adviceLevels = adviceLevels;

          vm.ok = function () {
           $uibModalInstance.close(vm.advice);
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };
         }
        ])