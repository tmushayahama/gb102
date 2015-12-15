angular.module("app.hobbys").controller('HobbysMineCtrl',
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
          vm.hobbysManager.getMyHobbys();
         }
        ])