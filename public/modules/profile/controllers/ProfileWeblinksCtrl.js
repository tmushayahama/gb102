var profileWeblinksCtrl = function (
        ProfileWeblinksManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.profileId = $stateParams.profileId;
 vm.profileWeblinksCopy;
 vm.profileWeblinksManager = new ProfileWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultProfileWeblinkData = {
  profileId: $stateParams.profileId,
  privacy: 0
 }
 vm.newProfileWeblinkData = angular.copy(vm.defaultProfileWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createProfileWeblink = function (data) {
  vm.profileWeblinksManager.createProfileWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newProfileWeblinkData = angular.copy(vm.defaultProfileWeblinkData);
   vm.profileWeblinksCopy = angular.copy(vm.profileWeblinksManager.profileWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileWeblink = function (data) {
  vm.profileWeblinksManager.editProfileWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newProfileWeblinkData = angular.copy(vm.defaultProfileWeblinkData);
   vm.profileWeblinksCopy = angular.copy(vm.profileWeblinksManager.profileWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileWeblinkSections = {
  details: function (profileWeblinkId, detail) {
   var profileWeblinkData = {
    profileWeblinkId: profileWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editProfileWeblink(profileWeblinkData);
  }
 }

 vm.cancelProfileWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newProfileWeblinkData = angular.copy(vm.defaultProfileWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProfileWeblink = function (profileWeblink, profileWeblinkCopy) {
  profileWeblink = profileWeblinkCopy;
  /*
   $filter('filter')
   (vm.profileWeblinksManager.profileWeblinks, {id: profileWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.profileWeblinksCopy, {id: profileWeblinkId}, true)[0]);
   if (profileWeblink.length && profileWeblinkCopy.length) {
   // vm.profileWeblinksManager.profileWeblinks angular.copy(vm.profileWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.profileWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(profileWeblinks, {completed: false}).length;
  vm.doneCount = vm.profileWeblinksManager.profileWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileWeblinkService.put(vm.profileWeblinks);
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




 vm.editWeblink = function (profileWeblink) {
  vm.editedWeblink = profileWeblink;
  // Clone the original profileWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(profileWeblink);
 };


 vm.doneEditing = function (profileWeblink) {
  vm.editedWeblink = null;
  profileWeblink.title = profileWeblink.title.trim();

  if (!profileWeblink.title) {
   vm.removeWeblink(profileWeblink);
  }
 };

 vm.openProfileWeblink = function (profileWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'profile-weblink-modal.html',
   controller: 'ProfileWeblinkCtrl as profileWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    profileWeblinkData: function () {
     return profileWeblink;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.profileWeblinksManager.getProfileWeblinks(vm.profileId);
};

profileWeblinksCtrl.$inject = [
 'ProfileWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profiles").controller('ProfileWeblinksCtrl', profileWeblinksCtrl);
