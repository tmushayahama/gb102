'use strict';
var appsCtrl = function (
        SearchSrv,
        $scope,
        $auth,
        $state,
        $http,
        $rootScope,
        $uibModal,
        $aside,
        localStorageService) {

 var vm = this;

 vm.logout = function () {
  $auth.logout();
  localStorageService.remove('user');
  $rootScope.authenticated = false;
  $state.go('apps.home');
 };

 vm.searchParams;

 var _selected;

 $scope.selected = undefined;

 vm.searchSrv = new SearchSrv();

 $rootScope.getSearchSuggestions = function (val) {
  var searchData = {
   query: val
  };
  return vm.searchSrv.simpleSearchSuggestion(searchData)
          .then(function (response) {
           //vm.suggestions = response.data;
           return response.data;
          });
 };

 $scope.modelOptions = {
  debounce: {
   default: 500,
   blur: 250
  },
  getterSetter: true
 };

 vm.clearSearch = function ($event, $select) {

 }

 $rootScope.search = function () {
  //$rootScope.searchParams = vm.searchParams;
  $state.go('apps.search.all', null, {reload: 'apps.search.all'});
  //vm.searchSrv.simpleSearch(vm.searchParams);
 }

 $rootScope.openSearchModal = function () {
  var modalInstance = $aside.open({
   animation: true,
   placement: 'top',
   templateUrl: 'search-modal.html',
   size: 'gb-search',
   controller: function ($scope, $uibModalInstance) {
    $scope.close = function () {
     $uibModalInstance.close();
    };
   }
  });

  modalInstance.result.then(function (explorer) {
  });
 };

 $rootScope.openMenuModal = function (position) {
  var modalInstance = $aside.open({
   placement: position,
   templateUrl: 'menu-modal.html',
   size: 'menu',
   controller: function ($scope, $uibModalInstance) {
    $scope.close = function () {
     $uibModalInstance.close();
    };
   }
  });

  modalInstance.result.then(function () {
  }, function () {
  });
 };

 vm.loginError = false;
 vm.loginErrorText;

 vm.openLoginModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'login-modal.html',
   controller: 'LoginModalCtrl as loginModalCtrl',
   backdrop: 'static',
   size: 'login',
   resolve: {
   }
  });

  modalInstance.result.then(function (skill) {
   //vm.skillsSrv.createSkill(skill);
  }, function () {
   console.log('Modal dismissed at: ' + new Date());
  });
 };

 vm.openRegistrationModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'registration-modal.html',
   controller: 'RegistrationModalCtrl as registrationModalCtrl',
   backdrop: 'static',
   size: 'registration',
   resolve: {
   }
  });

  modalInstance.result.then(function (skill) {
   //vm.skillsSrv.createSkill(skill);
  }, function () {
   console.log('Modal dismissed at: ' + new Date());
  });
 };

 vm.myInterval = 5000;
 vm.noWrapSlides = false;
 vm.active = 0;
 var slides = vm.slides = [];
 var currIndex = 0;

 vm.addSlide = function () {
  var newWidth = 600 + slides.length + 1;
  slides.push({
   image: '//unsplash.it/' + newWidth + '/300',
   text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
   id: currIndex++
  });
 };

 vm.randomize = function () {
  var indexes = generateIndexesArray();
  assignNewIndexesToSlides(indexes);
 };

 for (var i = 0; i < 4; i++) {
  vm.addSlide();
 }

 // Randomize logic below

 function assignNewIndexesToSlides(indexes) {
  for (var i = 0, l = slides.length; i < l; i++) {
   slides[i].id = indexes.pop();
  }
 }

 function generateIndexesArray() {
  var indexes = [];
  for (var i = 0; i < currIndex; ++i) {
   indexes[i] = i;
  }
  return shuffle(indexes);
 }

 function shuffle(array) {
  var tmp, current, top = array.length;

  if (top) {
   while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
   }
  }

  return array;
 }
};

appsCtrl.$inject = [
 'SearchSrv',
 '$scope',
 '$auth',
 '$state',
 '$http',
 '$rootScope',
 '$uibModal',
 '$aside',
 'localStorageService'];

angular.module("app").controller('AppsCtrl', appsCtrl);
