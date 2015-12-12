angular.module("app.advices").controller('AdviceWeblinkCtrl',
        ['AdviceWeblinkManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'adviceWeblinkData',
         function (
                 AdviceWeblinkManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 adviceWeblinkData) {
          var vm = this;
          vm.adviceId = adviceWeblinkData.advice_id;
          vm.adviceWeblinkId = adviceWeblinkData.id;
          vm.adviceWeblinkManager = new AdviceWeblinkManager();


          vm.weblinkId = adviceWeblinkData.weblink_id;

          vm.weblinkFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newAdviceWeblinkData = vm.defaultAdviceWeblinkData;

          vm.getAdviceWeblink = function (adviceId, weblinkId) {
           vm.adviceWeblinkManager.getAdviceWeblink(adviceId, weblinkId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editAdviceWeblink = function (data) {
           vm.adviceWeblinkManager.editAdviceWeblink(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceWeblinkSections = {
           details: function (details) {
            var adviceWeblinkData = {
             adviceWeblinkId: vm.adviceWeblinkId,
             title: details.title,
             description: details.description
            };
            vm.editAdviceWeblink(adviceWeblinkData);
           }
          }



          vm.showWeblinkForm = function () {
           vm.weblinkFormDisplay = true;
          };



          //--------init------
          vm.getAdviceWeblink(vm.adviceId, vm.weblinkId);
         }
        ])