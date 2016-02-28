var teachWeblinkCtrl = function (
        TeachWeblinkSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        teachWeblinkData) {
 var vm = this;
 vm.teachId = teachWeblinkData.teach_id;
 vm.teachWeblinkId = teachWeblinkData.id;
 vm.teachWeblinkSrv = new TeachWeblinkSrv();


 vm.weblinkId = teachWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newTeachWeblinkData = vm.defaultTeachWeblinkData;

 vm.getTeachWeblink = function (teachId, weblinkId) {
  vm.teachWeblinkSrv.getTeachWeblink(teachId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editTeachWeblink = function (data) {
  vm.teachWeblinkSrv.editTeachWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachWeblinkSections = {
  details: function (details) {
   var teachWeblinkData = {
    teachWeblinkId: vm.teachWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editTeachWeblink(teachWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getTeachWeblink(vm.teachId, vm.weblinkId);
};


teachWeblinkCtrl.$inject = [
 'TeachWeblinkSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'teachWeblinkData'];

angular.module("app.teach").controller('TeachWeblinkCtrl', teachWeblinkCtrl);
