angular.module("app.hobbys").controller('HobbysAllCtrl',
        ['ConstantsManager',
         'HobbysManager',
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
                 HobbysManager,
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

          vm.hobbysManager = new HobbysManager();
          vm.hobbysManager.getAllHobbys();
         }
        ])