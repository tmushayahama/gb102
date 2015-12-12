angular.module("app.promises").controller('PromiseWeblinkCtrl',
        ['PromiseWeblinkManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'promiseWeblinkData',
         function (
                 PromiseWeblinkManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 promiseWeblinkData) {
          var vm = this;
          vm.promiseId = promiseWeblinkData.promise_id;
          vm.promiseWeblinkId = promiseWeblinkData.id;
          vm.promiseWeblinkManager = new PromiseWeblinkManager();


          vm.weblinkId = promiseWeblinkData.weblink_id;

          vm.weblinkFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newPromiseWeblinkData = vm.defaultPromiseWeblinkData;

          vm.getPromiseWeblink = function (promiseId, weblinkId) {
           vm.promiseWeblinkManager.getPromiseWeblink(promiseId, weblinkId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editPromiseWeblink = function (data) {
           vm.promiseWeblinkManager.editPromiseWeblink(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseWeblinkSections = {
           details: function (details) {
            var promiseWeblinkData = {
             promiseWeblinkId: vm.promiseWeblinkId,
             title: details.title,
             description: details.description
            };
            vm.editPromiseWeblink(promiseWeblinkData);
           }
          }



          vm.showWeblinkForm = function () {
           vm.weblinkFormDisplay = true;
          };



          //--------init------
          vm.getPromiseWeblink(vm.promiseId, vm.weblinkId);
         }
        ])