'use strict';
var appsCtrl = function (
        ConstantsSrv,
        SearchSrv,
        level_categories,
        $scope,
        $auth,
        $state,
        $http,
        $rootScope,
        $uibModal,
        $aside,
        localStorageService) {

 var vm = this;
 vm.constantsSrv = new ConstantsSrv();

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

 vm.getTemplateUrl = function (explorer, size) {
  if (explorer.explorer_picture_url === "default.png") {
   return "public/modules/explorer/views/templates/explorer-box-1" + size + ".tpl.html";
  }
  return "public/modules/explorer/views/templates/explorer-box" + size + ".tpl.html";
 }

 vm.getSubTemplateUrl = function (explorer) {
  if (explorer.explorer_picture_url === "default.png") {
   return "public/modules/explorer/views/templates/sub-explorer/sub-explorer-box-1.tpl.html";
  }
  return "public/modules/explorer/views/templates/sub-explorer/sub-explorer-box.tpl.html";
 }

 vm.getComponentTemplateUrl = function (conponentId) {
  switch (conponentId) {
   case level_categories.component.note:
    return "public/modules/explorer/views/templates/note/component-note-box.tpl.html";
   case level_categories.component.activity:
    return "public/modules/explorer/views/templates/activity/component-activity-box.tpl.html";
   case level_categories.component.guideline:
    return "public/modules/explorer/views/templates/guideline/component-guideline-box.tpl.html";
  }
 }


 vm.appsGridSettings = {
  columns: 12,
  margins: [15, 15],
  mobileBreakPoint: 600,
  mobileModeEnabled: true,
  rowHeight: 50,
  defaultSizeX: 12,
  defaultSizeY: 10,
  resizable: {
   enabled: false,
  },
  draggable: {
   enabled: false,
  }
 };

 vm.apps = [];

 vm.myInterval = 5000;
 vm.noWrapSlides = false;
 vm.active = 0;
 vm.slides = [
  {
   image: 'public/img/landing-page/background-surfing.png',
   text: "surfing",
   id: 0
  },
  {
   image: 'public/img/landing-page/background-grilling.png',
   text: "grilling",
   id: 1
  },
  {
   image: 'public/img/landing-page/background-chess.png',
   text: "chess",
   id: 2
  },
  {
   image: 'public/img/landing-page/background-piano.png',
   text: "piano",
   id: 3
  },
  {
   image: 'public/img/landing-page/background-soccer.png',
   text: "soccer",
   id: 4
  },
 ];
 var currIndex = 0;



 vm.randomize = function () {
  var indexes = generateIndexesArray();
  assignNewIndexesToSlides(indexes);
 };


 // Randomize logic below

 function assignNewIndexesToSlides(indexes) {
  for (var i = 0, l = vm.slides.length; i < l; i++) {
   vm.slides[i].id = indexes.pop();
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

 //Init
 vm.constantsSrv.getLevel(level_categories.apps).then(function (data) {
  vm.apps = data;
 });
};

appsCtrl.$inject = [
 'ConstantsSrv',
 'SearchSrv',
 'level_categories',
 '$scope',
 '$auth',
 '$state',
 '$http',
 '$rootScope',
 '$uibModal',
 '$aside',
 'localStorageService'];

angular.module("app").controller('AppsCtrl', appsCtrl);
