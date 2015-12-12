
angular.module("app.promises").controller('PromiseCtrl',
        ['ConstantsManager',
         'PromiseManager',
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
                 PromiseManager,
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
          vm.promise = [];
          var promiseData = {
          };


          vm.promiseId = $stateParams.promiseId;

          vm.promiseManager = new PromiseManager();
          vm.constantsManager = new ConstantsManager();

          vm.promiseFormDisplay = false;

          vm.getPromise = function (id, data) {
           vm.promiseManager.getPromise(id, data).success(function (response) {
            vm.promise = response;
           }).error(function (response) {
            console.log(response);
           });
          };




          vm.defaultPromiseData = {
           promiseId: $stateParams.promiseId,
           privacy: 0
          }
          vm.newPromiseData = angular.copy(vm.defaultPromiseData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createPromise = function (data) {
           vm.promiseManager.createPromise(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newPromiseData = angular.copy(vm.defaultPromiseData);
            vm.promiseCopy = angular.copy(vm.promiseManager.promise);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromise = function (data) {
           vm.promiseManager.editPromise(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newPromiseData = angular.copy(vm.defaultPromiseData);
            vm.promiseCopy = angular.copy(vm.promiseManager.promise);
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
            (vm.promiseManager.promise, {id: promiseId}, true)[0]
            = angular.copy($filter('filter')
            (vm.promiseCopy, {id: promiseId}, true)[0]);
            if (promise.length && promiseCopy.length) {
            // vm.promiseManager.promise angular.copy(vm.promiseCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.promise;
          }), function () {
           //vm.remainingCount = filterFilter(promise, {completed: false}).length;
           vm.doneCount = vm.promiseManager.promise.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //PromiseService.put(vm.promise);
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





          //--------init------
          vm.promiseManager.getPromise(vm.promiseId);
          vm.constantsManager.getLevel('SK1');
         }
        ])