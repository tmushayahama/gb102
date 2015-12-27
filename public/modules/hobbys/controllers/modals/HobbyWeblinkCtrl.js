var hobbyWeblinkCtrl = function (
        HobbyWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        hobbyWeblinkData) {
 var vm = this;
 vm.hobbyId = hobbyWeblinkData.hobby_id;
 vm.hobbyWeblinkId = hobbyWeblinkData.id;
 vm.hobbyWeblinkManager = new HobbyWeblinkManager();


 vm.weblinkId = hobbyWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newHobbyWeblinkData = vm.defaultHobbyWeblinkData;

 vm.getHobbyWeblink = function (hobbyId, weblinkId) {
  vm.hobbyWeblinkManager.getHobbyWeblink(hobbyId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editHobbyWeblink = function (data) {
  vm.hobbyWeblinkManager.editHobbyWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyWeblinkSections = {
  details: function (details) {
   var hobbyWeblinkData = {
    hobbyWeblinkId: vm.hobbyWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editHobbyWeblink(hobbyWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getHobbyWeblink(vm.hobbyId, vm.weblinkId);
};


hobbyWeblinkCtrl.$inject = [
 'HobbyWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'hobbyWeblinkData'];

angular.module("app.hobbys").controller('HobbyWeblinkCtrl', hobbyWeblinkCtrl);
