var communityWeblinkCtrl = function (
        CommunityWeblinkManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        communityWeblinkData) {
 var vm = this;
 vm.communityId = communityWeblinkData.community_id;
 vm.communityWeblinkId = communityWeblinkData.id;
 vm.communityWeblinkManager = new CommunityWeblinkManager();


 vm.weblinkId = communityWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCommunityWeblinkData = vm.defaultCommunityWeblinkData;

 vm.getCommunityWeblink = function (communityId, weblinkId) {
  vm.communityWeblinkManager.getCommunityWeblink(communityId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCommunityWeblink = function (data) {
  vm.communityWeblinkManager.editCommunityWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityWeblinkSections = {
  details: function (details) {
   var communityWeblinkData = {
    communityWeblinkId: vm.communityWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editCommunityWeblink(communityWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getCommunityWeblink(vm.communityId, vm.weblinkId);
};


communityWeblinkCtrl.$inject = [
 'CommunityWeblinkManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'communityWeblinkData'];

angular.module("app.communitys").controller('CommunityWeblinkCtrl', communityWeblinkCtrl);
