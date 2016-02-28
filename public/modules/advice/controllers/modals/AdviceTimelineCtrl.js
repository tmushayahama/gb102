var adviceProgressCtrl = function (
        AdviceProgressSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        adviceProgressData) {
 var vm = this;
 vm.adviceId = adviceProgressData.advice_id;
 vm.adviceProgressId = adviceProgressData.id;
 vm.adviceProgressSrv = new AdviceProgressSrv();


 vm.progressId = adviceProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newAdviceProgressData = vm.defaultAdviceProgressData;

 vm.getAdviceProgress = function (adviceId, progressId) {
  vm.adviceProgressSrv.getAdviceProgress(adviceId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editAdviceProgress = function (data) {
  vm.adviceProgressSrv.editAdviceProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceProgressSections = {
  details: function (details) {
   var adviceProgressData = {
    adviceProgressId: vm.adviceProgressId,
    title: details.title,
    description: details.description
   };
   vm.editAdviceProgress(adviceProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getAdviceProgress(vm.adviceId, vm.progressId);
};


adviceProgressCtrl.$inject = [
 'AdviceProgressSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'adviceProgressData'];

angular.module("app.advice").controller('AdviceProgressCtrl', adviceProgressCtrl);
