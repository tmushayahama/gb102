
var profileCtrl = function (
        level_categories,
        ConstantsSrv,
        ProfileSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-profile.css'
 }, $scope);

 vm.profileSrv = new ProfileSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.profileLevels;


 vm.createProfile = function (data) {
  vm.profileSrv.createProfile(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProfileData = angular.copy(vm.defaultProfileData);
   vm.profileCopy = angular.copy(vm.profileSrv.profile);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfile = function (data) {
  vm.profileSrv.editProfile(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProfileData = angular.copy(vm.defaultProfileData);
   vm.profileCopy = angular.copy(vm.profileSrv.profile);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileSections = {
  details: function (profileId, detail) {
   var profileData = {
    profileId: profileId,
    title: detail.title,
    description: detail.description
   };
   vm.editProfile(profileData);
  }
 }

 vm.cancelProfile = function (form) {
  vm.FormDisplay = false;
  vm.newProfileData = angular.copy(vm.defaultProfileData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProfile = function (profile, profileCopy) {
  profile = profileCopy;
  /*
   $filter('filter')
   (vm.profileSrv.profile, {id: profileId}, true)[0]
   = angular.copy($filter('filter')
   (vm.profileCopy, {id: profileId}, true)[0]);
   if (profile.length && profileCopy.length) {
   // vm.profileSrv.profile angular.copy(vm.profileCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.profile;
 }), function () {
  //vm.remainingCount = filterFilter(profile, {completed: false}).length;
  vm.doneCount = vm.profileSrv.profile.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileService.put(vm.profile);
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




 vm.edit = function (profile) {
  vm.edited = profile;
  // Clone the original profile to restore it on demand.
  vm.original = angular.copy(profile);
 };


 vm.doneEditing = function (profile) {
  vm.edited = null;
  profile.title = profile.title.trim();

  if (!profile.title) {
   vm.remove(profile);
  }
 };

 vm.openAddProfileModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-profile-modal.html',
   controller: 'AddProfileCtrl as addProfileCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    profileLevels: function () {
     return vm.profileLevels;
    }
   }
  });

  modalInstance.result.then(function (profile) {
   vm.profileSrv.createProfile(profile);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.profileSrv.getProfile(vm.profileId);
 vm.constantsSrv.getLevel(level_categories.profile).then(function (data) {
  vm.profileLevels = data;
 });
};

profileCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'ProfileSrv',
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

angular.module("app.profile").controller('ProfileCtrl', profileCtrl);