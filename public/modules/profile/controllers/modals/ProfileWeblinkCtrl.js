var profileWeblinkCtrl = function (
        ProfileWeblinkSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        profileWeblinkData) {
 var vm = this;
 vm.profileId = profileWeblinkData.profile_id;
 vm.profileWeblinkId = profileWeblinkData.id;
 vm.profileWeblinkSrv = new ProfileWeblinkSrv();


 vm.weblinkId = profileWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProfileWeblinkData = vm.defaultProfileWeblinkData;

 vm.getProfileWeblink = function (profileId, weblinkId) {
  vm.profileWeblinkSrv.getProfileWeblink(profileId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProfileWeblink = function (data) {
  vm.profileWeblinkSrv.editProfileWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileWeblinkSections = {
  details: function (details) {
   var profileWeblinkData = {
    profileWeblinkId: vm.profileWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editProfileWeblink(profileWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getProfileWeblink(vm.profileId, vm.weblinkId);
};


profileWeblinkCtrl.$inject = [
 'ProfileWeblinkSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'profileWeblinkData'];

angular.module("app.profile").controller('ProfileWeblinkCtrl', profileWeblinkCtrl);
