
var communityCtrl = function (
        _,
        ConstantsSrv,
        CommunitySrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-community.css'
 }, $scope);

 vm.community = [];
 var communityData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.communityIcons = [];
 vm.communityIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomCommunityIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.communityIcons.length; j++) {
    var rand = getRand(0, vm.communityIcons.length);
    rowArray.push(vm.communityIcons[rand].name);
   }
   vm.communityIconsArray.push(rowArray);
  }
 };


 vm.communityId = $stateParams.communityId;

 vm.communitySrv = new CommunitySrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.communityFormDisplay = false;

 vm.getCommunity = function (id, data) {
  vm.communitySrv.getCommunity(id, data).success(function (response) {
   vm.community = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultCommunityData = {
  communityId: $stateParams.communityId,
  privacy: 0
 }
 vm.newCommunityData = angular.copy(vm.defaultCommunityData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createCommunity = function (data) {
  vm.communitySrv.createCommunity(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCommunityData = angular.copy(vm.defaultCommunityData);
   vm.communityCopy = angular.copy(vm.communitySrv.community);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunity = function (data) {
  vm.communitySrv.editCommunity(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCommunityData = angular.copy(vm.defaultCommunityData);
   vm.communityCopy = angular.copy(vm.communitySrv.community);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunitySections = {
  details: function (communityId, detail) {
   var communityData = {
    communityId: communityId,
    title: detail.title,
    description: detail.description
   };
   vm.editCommunity(communityData);
  }
 }

 vm.cancelCommunity = function (form) {
  vm.FormDisplay = false;
  vm.newCommunityData = angular.copy(vm.defaultCommunityData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCommunity = function (community, communityCopy) {
  community = communityCopy;
  /*
   $filter('filter')
   (vm.communitySrv.community, {id: communityId}, true)[0]
   = angular.copy($filter('filter')
   (vm.communityCopy, {id: communityId}, true)[0]);
   if (community.length && communityCopy.length) {
   // vm.communitySrv.community angular.copy(vm.communityCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.community;
 }), function () {
  //vm.remainingCount = filterFilter(community, {completed: false}).length;
  vm.doneCount = vm.communitySrv.community.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityService.put(vm.community);
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




 vm.edit = function (community) {
  vm.edited = community;
  // Clone the original community to restore it on demand.
  vm.original = angular.copy(community);
 };


 vm.doneEditing = function (community) {
  vm.edited = null;
  community.title = community.title.trim();

  if (!community.title) {
   vm.remove(community);
  }
 };

 //--------init------
 vm.communitySrv.getCommunity(vm.communityId);
 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.communityIcons = data;
  vm.getRandomCommunityIcons();
 });
};

communityCtrl.$inject = ['_',
 'ConstantsSrv',
 'CommunitySrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.communitys").controller('CommunityCtrl', communityCtrl);