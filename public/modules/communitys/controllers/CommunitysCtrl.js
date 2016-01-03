
var communitysCtrl = function (
        level_categories,
        ConstantsManager,
        CommunitysManager,
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

 vm.communitysManager = new CommunitysManager();
 vm.constantsManager = new ConstantsManager();
 vm.communityLevels;


 vm.createCommunity = function (data) {
  vm.communitysManager.createCommunity(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCommunityData = angular.copy(vm.defaultCommunityData);
   vm.communitysCopy = angular.copy(vm.communitysManager.communitys);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunity = function (data) {
  vm.communitysManager.editCommunity(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newCommunityData = angular.copy(vm.defaultCommunityData);
   vm.communitysCopy = angular.copy(vm.communitysManager.communitys);
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
   (vm.communitysManager.communitys, {id: communityId}, true)[0]
   = angular.copy($filter('filter')
   (vm.communitysCopy, {id: communityId}, true)[0]);
   if (community.length && communityCopy.length) {
   // vm.communitysManager.communitys angular.copy(vm.communitysCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.communitys;
 }), function () {
  //vm.remainingCount = filterFilter(communitys, {completed: false}).length;
  vm.doneCount = vm.communitysManager.communitys.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityService.put(vm.communitys);
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

 vm.openAddCommunityModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-community-modal.html',
   controller: 'AddCommunityCtrl as addCommunityCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communityLevels: function () {
     return vm.communityLevels;
    }
   }
  });

  modalInstance.result.then(function (community) {
   vm.communitysManager.createCommunity(community);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.communitysManager.getCommunitys(vm.communityId);
 vm.constantsManager.getLevel(level_categories.community).then(function (data) {
  vm.communityLevels = data;
 });
};

communitysCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'CommunitysManager',
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

angular.module("app.communitys").controller('CommunitysCtrl', communitysCtrl);