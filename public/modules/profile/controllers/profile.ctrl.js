
var profileCtrl = function (
        _,
        ConstantsSrv,
        ProfileSrv,
        SearchSrv,
        UserProfileSectionSrv,
        ComponentsSrv,
        localStorageService,
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

 vm.logout = function () {
  localStorageService.remove('user');
  $rootScope.authenticated = false;
  $state.go('auth');
 };

 vm.profile = [];
 var profileData = {
 };

 vm.profileId = $stateParams.profileId;
 vm.profileSrv = new ProfileSrv();
 vm.userProfileSectionSrv = new UserProfileSectionSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.componentsSrv = new ComponentsSrv();
 vm.searchSrv = new SearchSrv();
 vm.components = [];

 vm.getSearchSuggestions = function (val) {
  var searchData = {
   query: val
  };
  return vm.searchSrv.simpleSearchSuggestion(searchData)
          .then(function (response) {
           var results = response.data.map(function (item) {
            return item.title;
           });
           vm.suggestions = results;
           return results;
          });
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

 vm.getProfile = function (id, data) {
  vm.profileSrv.getProfile(id, data).success(function (response) {
   vm.profile = response;
  }).error(function (response) {
   console.log(response);
  });
 };

 vm.openComponent = function (componentId) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'component-modal.html',
   controller: 'ComponentCtrl as componentCtrl',
   backdrop: 'static',
   size: 'component-view',
   resolve: {
    componentId: function () {
     return componentId;
    },
    appsConstants: function () {
     return vm.appsConstants;
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
 vm.profileSrv.getProfile(vm.profileId).then(function (data) {
  vm.userProfileSectionSrv.getUserProfileSection(vm.profileId);
 });

 vm.componentsSrv.getUserComponents(vm.profileId).then(function (data) {
  vm.component = data;
 });

 vm.constantsSrv.getConstants().then(function (data) {
  vm.appsConstants = data;
 });

};

profileCtrl.$inject = ['_',
 'ConstantsSrv',
 'ProfileSrv',
 'SearchSrv',
 'UserProfileSectionSrv',
 'ComponentsSrv',
 'localStorageService',
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