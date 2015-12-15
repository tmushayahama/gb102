angular.module("app.advices").controller('AdvicesCtrl',
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
          vm.constantsManager = new ConstantsManager();
          vm.adviceLevels;


          vm.createAdvice = function (data) {
           vm.advicesManager.createAdvice(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newAdviceData = angular.copy(vm.defaultAdviceData);
            vm.advicesCopy = angular.copy(vm.advicesManager.advices);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdvice = function (data) {
           vm.advicesManager.editAdvice(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newAdviceData = angular.copy(vm.defaultAdviceData);
            vm.advicesCopy = angular.copy(vm.advicesManager.advices);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceSections = {
           details: function (adviceId, detail) {
            var adviceData = {
             adviceId: adviceId,
             title: detail.title,
             description: detail.description
            };
            vm.editAdvice(adviceData);
           }
          }

          vm.cancelAdvice = function (form) {
           vm.FormDisplay = false;
           vm.newAdviceData = angular.copy(vm.defaultAdviceData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertAdvice = function (advice, adviceCopy) {
           advice = adviceCopy;
           /*
            $filter('filter')
            (vm.advicesManager.advices, {id: adviceId}, true)[0]
            = angular.copy($filter('filter')
            (vm.advicesCopy, {id: adviceId}, true)[0]);
            if (advice.length && adviceCopy.length) {
            // vm.advicesManager.advices angular.copy(vm.advicesCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.advices;
          }), function () {
           //vm.remainingCount = filterFilter(advices, {completed: false}).length;
           vm.doneCount = vm.advicesManager.advices.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //AdviceService.put(vm.advices);
          }, true);
          /*
           $scope.$watch(angular.bind(this, function () {
           return vm.location.path();
           }), function (path) {
           vm.statusFilter = (path === '/active') ?
           {completed: false} : (path === '/completed') ?
           {completed: true} : null;
           });
           */




          vm.edit = function (advice) {
           vm.edited = advice;
           // Clone the original advice to restore it on demand.
           vm.original = angular.copy(advice);
          };


          vm.doneEditing = function (advice) {
           vm.edited = null;
           advice.title = advice.title.trim();

           if (!advice.title) {
            vm.remove(advice);
           }
          };

          vm.openAddAdviceModal = function () {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add-advice-modal.html',
            controller: 'AddAdviceCtrl as addAdviceCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             adviceLevels: function () {
              return vm.adviceLevels;
             }
            }
           });

           modalInstance.result.then(function (advice) {
            vm.advicesManager.createAdvice(advice);
           }, function () {
            $log.info('Modal dismissed at: ' + new Date());
           });
          };



          //--------init------
          vm.constantsManager.getLevel(1).then(function (data) {
           vm.adviceLevels = data;
          });
         }
        ])