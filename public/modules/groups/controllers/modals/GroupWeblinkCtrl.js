var groupWeblinkCtrl = function (
        GroupWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        groupWeblinkData) {
 var vm = this;
 vm.groupId = groupWeblinkData.group_id;
 vm.groupWeblinkId = groupWeblinkData.id;
 vm.groupWeblinkManager = new GroupWeblinkManager();


 vm.weblinkId = groupWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGroupWeblinkData = vm.defaultGroupWeblinkData;

 vm.getGroupWeblink = function (groupId, weblinkId) {
  vm.groupWeblinkManager.getGroupWeblink(groupId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGroupWeblink = function (data) {
  vm.groupWeblinkManager.editGroupWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupWeblinkSections = {
  details: function (details) {
   var groupWeblinkData = {
    groupWeblinkId: vm.groupWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editGroupWeblink(groupWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getGroupWeblink(vm.groupId, vm.weblinkId);
};


groupWeblinkCtrl.$inject = [
 'GroupWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'groupWeblinkData'];

angular.module("app.groups").controller('GroupWeblinkCtrl', groupWeblinkCtrl);
