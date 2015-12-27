angular.module("app.promises").controller('PromisesCtrl',
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
         '$css',
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
                 $filter,
                 $css) {

          var vm = this;

          $css.bind({
           href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-3.css'
          }, $scope);

          vm.promisesManager = new PromisesManager();
          vm.constantsManager = new ConstantsManager();
          vm.promiseLevels;


          vm.createPromise = function (data) {
           vm.promisesManager.createPromise(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newPromiseData = angular.copy(vm.defaultPromiseData);
            vm.promisesCopy = angular.copy(vm.promisesManager.promises);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromise = function (data) {
           vm.promisesManager.editPromise(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newPromiseData = angular.copy(vm.defaultPromiseData);
            vm.promisesCopy = angular.copy(vm.promisesManager.promises);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseSections = {
           details: function (promiseId, detail) {
            var promiseData = {
             promiseId: promiseId,
             title: detail.title,
             description: detail.description
            };
            vm.editPromise(promiseData);
           }
          }

          vm.cancelPromise = function (form) {
           vm.FormDisplay = false;
           vm.newPromiseData = angular.copy(vm.defaultPromiseData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertPromise = function (promise, promiseCopy) {
           promise = promiseCopy;
           /*
            $filter('filter')
            (vm.promisesManager.promises, {id: promiseId}, true)[0]
            = angular.copy($filter('filter')
            (vm.promisesCopy, {id: promiseId}, true)[0]);
            if (promise.length && promiseCopy.length) {
            // vm.promisesManager.promises angular.copy(vm.promisesCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.promises;
          }), function () {
           //vm.remainingCount = filterFilter(promises, {completed: false}).length;
           vm.doneCount = vm.promisesManager.promises.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //PromiseService.put(vm.promises);
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




          vm.edit = function (promise) {
           vm.edited = promise;
           // Clone the original promise to restore it on demand.
           vm.original = angular.copy(promise);
          };


          vm.doneEditing = function (promise) {
           vm.edited = null;
           promise.title = promise.title.trim();

           if (!promise.title) {
            vm.remove(promise);
           }
          };

          vm.openAddPromiseModal = function () {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add-promise-modal.html',
            controller: 'AddPromiseCtrl as addPromiseCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             promiseLevels: function () {
              return vm.promiseLevels;
             }
            }
           });

           modalInstance.result.then(function (promise) {
            vm.promisesManager.createPromise(promise);
           }, function () {
            $log.info('Modal dismissed at: ' + new Date());
           });
          };



          //--------init------
          //vm.promisesManager.getPromises(vm.promiseId);
          vm.constantsManager.getLevel(1).then(function (data) {
           vm.promiseLevels = data;
          });
         }
        ])