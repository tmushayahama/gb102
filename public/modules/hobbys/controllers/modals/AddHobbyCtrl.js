angular.module("app.hobbys").controller('AddHobbyCtrl',
        ['$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'hobbyLevels',
         function (
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 hobbyLevels) {
          var vm = this;

          vm.hobby = "";
          vm.hobbyLevels = hobbyLevels;

          vm.ok = function () {
           $uibModalInstance.close(vm.hobby);
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };
         }
        ])