'use strict';
var appsCtrl = function (
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

 vm.apps = [
  {
   "title": "Mentorship",
   "description": "Mentor someone or find a mentor. Whether it's peer/friendly, formal or supervisory",
   "icon": "icon-gb-mentorships",
   "url": "apps.app({'app_name': 'mentorships'})",
   "class": "gb-background-color-mentorship",
   "gridMap": {
    "sizeX": 8,
    "sizeY": 8,
    "row": 0,
    "col": 0
   }
  },
  {
   "title": "Promise",
   "description": "Are you good at giving an advice? Are you seeking advice?",
   "icon": "icon-gb-promises",
   "url": "apps.app({'app_name': 'promises'})",
   "class": "gb-background-color-promise",
   "gridMap": {
    "sizeX": 4,
    "sizeY": 6,
    "col": 8,
    "row": 0
   }
  },
  {
   "title": "Hobbies",
   "description": "Make your skills into your hobbies. Connect with others and see how others are doing with their hobbies",
   "icon": "icon-gb-hobbies",
   "url": "apps.app({'app_name': 'hobbies'})",
   "class": "gb-background-color-hobby",
   "gridMap": {
    "sizeX": 4,
    "sizeY": 8,
    "row": 6,
    "col": 8
   }
  },
  {
   "title": "Skill Practice",
   "description": "Do something with skills you have gained. Improve your current skills or just learn a new skill",
   "icon": "icon-gb-skills",
   "url": "apps.app({'app_name': 'skills'})",
   "class": "gb-background-color-skill",
   "gridMap": {
    "sizeX": 5,
    "sizeY": 6,
    "row": 8,
    "col": 0
   }
  },
  {
   "title": "Goal Setting",
   "description": "Set your goals, Encourage someone to achieve their goals or get encouraged to keep track of your goals",
   "icon": "icon-gb-goals",
   "url": "apps.app({'app_name': 'goals'})",
   "class": "gb-background-color-goal",
   "gridMap": {
    "sizeX": 4,
    "sizeY": 7,
    "row": 14,
    "col": 0
   }
  },
  {
   "title": "Advice",
   "description": "",
   "icon": "icon-gb-advices",
   "url": "apps.app({'app_name': 'advices'})",
   "class": "gb-background-color-advice",
   "gridMap": {
    "sizeX": 8,
    "sizeY": 6,
    "row": 14,
    "col": 4
   }
  },
  {
   "title": "Classes",
   "description": "",
   "icon": "icon-gb-teach",
   "url": "apps.app({'app_name': 'teach'})",
   "class": "gb-background-color-teach",
   "gridMap": {
    "sizeX": 4,
    "sizeY": 7,
    "row": 21,
    "col": 0
   }
  },
  {
   "title": "Collaborations",
   "description": "",
   "icon": "icon-gb-collaborations",
   "url": "apps.app({'app_name': 'collaborations'})",
   "class": "gb-background-color-collaboration",
   "gridMap": {
    "sizeX": 4,
    "sizeY": 8,
    "row": 20,
    "col": 4
   }
  },
  {
   "title": "Journals",
   "description": "",
   "icon": "icon-gb-journals",
   "url": "apps.app({'app_name': 'journalss'})",
   "class": "gb-background-color-journal",
   "gridMap": {
    "sizeX": 4,
    "sizeY": 8,
    "row": 20,
    "col": 8
   }
  },
  {
   "title": "Community",
   "description": "Join us now to get your own personalized profile and portfolio of work",
   "icon": "icon-gb-community",
   "url": "apps.community.users",
   "class": "gb-background-color-community",
   "gridMap": {
    "sizeX": 3,
    "sizeY": 6,
    "row": 8,
    "col": 5
   }
  }
 ]


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
};

appsCtrl.$inject = [
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
