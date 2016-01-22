
var profileCtrl = function (
        _,
        ConstantsManager,
        ProfileManager,
        UserProfileSectionManager,
        $uibModal,
        $aside,
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


 vm.searchParams;


 vm.availableSearchParams = [
  {key: "skill",
   name: "skill",
   placeholder: "skill...",
   restrictToSuggestedValues: true,
   suggestedValues: ['soccer', 'art', 'sushi making']
  },
  {key: "goal", name: "goal", placeholder: "goal..."},
  {key: "hobby", name: "hobby", placeholder: "hobby..."},
  {key: "promise", name: "promise", placeholder: "promise..."},
  {key: "mentorship", name: "mentorship", placeholder: "mentorship..."}
 ];

 vm.search = function () {
  $rootScope.searchParams = vm.searchParams;
  $state.go('apps.search.all', null, {reload: 'apps.search.all'});
  //vm.searchManager.simpleSearch(vm.searchParams);
 }

 $scope.addPredefinedNameSearchParam = function () {
  vm.searchParams.name = 'Max Mustermann';
 };

 $scope.loadPredefinedSearchParamSet = function () {
  vm.searchParams = {
   name: "Max M.",
   job: "Boss"
  };
 };


 vm.range = function (min, max) {
  return _.range(min, max);
 };


 vm.openProfileMenuModal = function (position) {
  var modalInstance = $aside.open({
   placement: position,
   templateUrl: 'profile-menu-modal.html',
   controller: 'ProfileMenuModalCtrl as menuProfileModalCtrl',
   // backdrop: 'static',
   size: 'menu',
   scope: $scope,
  });

  modalInstance.result.then(function () {
  }, function () {
  });
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
 vm.userProfileSectionManager = new UserProfileSectionManager();
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
 vm.profileManager.getProfile(vm.profileId).then(function (data) {
  vm.userProfileSectionManager.getUserProfileSection(vm.profileId)
 });

 vm.constantsManager.getIcons(1).then(function (data) {
  vm.profileIcons = data;
  vm.getRandomProfileIcons();
 });
};

profileCtrl.$inject = ['_',
 'ConstantsManager',
 'ProfileManager',
 'UserProfileSectionManager',
 '$uibModal',
 '$aside',
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