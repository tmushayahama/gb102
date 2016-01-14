
var profileCtrl = function (
        _,
        ConstantsManager,
        ProfileManager,
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

 vm.profile = [];
 var profileData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.profileIcons = [];
 vm.profileIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomProfileIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.profileIcons.length; j++) {
    var rand = getRand(0, vm.profileIcons.length);
    rowArray.push(vm.profileIcons[rand].name);
   }
   vm.profileIconsArray.push(rowArray);
  }
 };


 vm.profileId = $stateParams.profileId;

 vm.profileManager = new ProfileManager();
 vm.constantsManager = new ConstantsManager();

 vm.profileFormDisplay = false;

 vm.getProfile = function (id, data) {
  vm.profileManager.getProfile(id, data).success(function (response) {
   vm.profile = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultProfileData = {
  profileId: $stateParams.profileId,
  privacy: 0
 }
 vm.newProfileData = angular.copy(vm.defaultProfileData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createProfile = function (data) {
  vm.profileManager.createProfile(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProfileData = angular.copy(vm.defaultProfileData);
   vm.profileCopy = angular.copy(vm.profileManager.profile);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfile = function (data) {
  vm.profileManager.editProfile(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newProfileData = angular.copy(vm.defaultProfileData);
   vm.profileCopy = angular.copy(vm.profileManager.profile);
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

 //--------init------
 vm.profileManager.getProfile(vm.profileId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.profileIcons = data;
  vm.getRandomProfileIcons();
 });
};

profileCtrl.$inject = ['_',
 'ConstantsManager',
 'ProfileManager',
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