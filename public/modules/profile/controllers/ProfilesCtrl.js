
var profilesCtrl = function (
        level_categories,
        ConstantsManager,
        ProfilesManager,
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

 vm.profilesManager = new ProfilesManager();
 vm.constantsManager = new ConstantsManager();
 vm.profileLevels;


 vm.createProfile = function (data) {
  vm.profilesManager.createProfile(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProfileData = angular.copy(vm.defaultProfileData);
   vm.profilesCopy = angular.copy(vm.profilesManager.profiles);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfile = function (data) {
  vm.profilesManager.editProfile(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProfileData = angular.copy(vm.defaultProfileData);
   vm.profilesCopy = angular.copy(vm.profilesManager.profiles);
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
   (vm.profilesManager.profiles, {id: profileId}, true)[0]
   = angular.copy($filter('filter')
   (vm.profilesCopy, {id: profileId}, true)[0]);
   if (profile.length && profileCopy.length) {
   // vm.profilesManager.profiles angular.copy(vm.profilesCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.profiles;
 }), function () {
  //vm.remainingCount = filterFilter(profiles, {completed: false}).length;
  vm.doneCount = vm.profilesManager.profiles.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileService.put(vm.profiles);
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
   vm.profilesManager.createProfile(profile);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.profilesManager.getProfiles(vm.profileId);
 vm.constantsManager.getLevel(level_categories.profile).then(function (data) {
  vm.profileLevels = data;
 });
};

profilesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'ProfilesManager',
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

angular.module("app.profiles").controller('ProfilesCtrl', profilesCtrl);