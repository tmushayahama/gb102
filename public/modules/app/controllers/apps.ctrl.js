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

 function moveBy(scrollId, delta) {

  var selector = scrollId;
  var $scrollable = $(selector);//.find('.gb-horizontal-scrollable');
  var curScroll = $scrollable.scrollLeft();
  var scrollTo = curScroll + delta;

  scrollTo = (delta > 0)
          ? Math.min(scrollTo, $(window).width())
          : Math.max(scrollTo, 0);

  $scrollable.scrollLeft(scrollTo);

 }

 $rootScope.scrollHorizontal = function (sectionId, delta) {
  moveBy(sectionId, delta);
 };


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
 };

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

 vm.getTemplateUrl = function (component, size) {
  if (component.component_picture_url === "default.png") {
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

 $rootScope.apps = [];

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

 $rootScope.generateBackgroundPattern = function () {
  function getRandom(min, max) {
   if (min > max) {
    return -1;
   }

   if (min == max) {
    return min;
   }

   var r;

   do {
    r = Math.random();
   } while (r == 1.0);

   return min + parseInt(r * (max - min + 1));
  }

  function checkBrowserName(name) {
   var agent = navigator.userAgent.toLowerCase();
   if (agent.indexOf(name.toLowerCase()) > -1) {
    return true;
   }
   return false;
  }

  if (checkBrowserName('safari')) {
   var rot = getRandom(0, 255);
   var blau = getRandom(0, 255);
   var gruen = getRandom(0, 255);
   var rot_zwei = getRandom(0, rot);
   var blau_zwei = getRandom(0, blau);
   var gruen_zwei = getRandom(0, gruen);
   var transparent = getRandom(2, 5);
   var backgroundStyle = '-webkit-linear-gradient(rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') 0%, rgba(' + rot_zwei + ',' + blau_zwei + ',' + gruen_zwei + ',.8) 100%)';




   for (var i = 0; i < 6; i++) {

    var rot = getRandom(0, 255);
    var blau = getRandom(0, 255);
    var gruen = getRandom(0, 255);
    var transparent = getRandom(5, 5);
    var grad = getRandom(-45, 45);
    var prozent_eins = getRandom(0, (screen.width / 4) * 3);
    var prozent_zwei = getRandom(prozent_eins, screen.width);
    backgroundStyle = backgroundStyle + ' ,-webkit-linear-gradient(' + grad + 'deg,transparent 0,transparent ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_zwei + 'px,transparent ' + prozent_zwei + 'px,transparent 100%)';
   }

  } else {

   if (checkBrowserName('firefox')) {

    var rot = getRandom(0, 255);
    var blau = getRandom(0, 255);
    var gruen = getRandom(0, 255);
    var rot_zwei = getRandom(0, rot);
    var blau_zwei = getRandom(0, blau);
    var gruen_zwei = getRandom(0, gruen);
    var transparent = getRandom(2, 5);
    var backgroundStyle = '-moz-linear-gradient(rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') 0%, rgba(' + rot_zwei + ',' + blau_zwei + ',' + gruen_zwei + ',.8) 100%)';




    for (var i = 0; i < 6; i++) {

     var rot = getRandom(0, 255);
     var blau = getRandom(0, 255);
     var gruen = getRandom(0, 255);
     var transparent = getRandom(5, 5);
     var grad = getRandom(-45, 45);
     var prozent_eins = getRandom(0, (screen.width / 4) * 3);
     var prozent_zwei = getRandom(prozent_eins, screen.width);
     backgroundStyle = backgroundStyle + ' ,-moz-linear-gradient(' + grad + 'deg,transparent 0,transparent ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_zwei + 'px,transparent ' + prozent_zwei + 'px,transparent 100%)';
    }


   } else {
    var rot = getRandom(0, 255);
    var blau = getRandom(0, 255);
    var gruen = getRandom(0, 255);
    var rot_zwei = getRandom(0, rot);
    var blau_zwei = getRandom(0, blau);
    var gruen_zwei = getRandom(0, gruen);
    var transparent = getRandom(2, 5);
    var backgroundStyle = 'linear-gradient(rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') 0%, rgba(' + rot_zwei + ',' + blau_zwei + ',' + gruen_zwei + ',.8) 100%)';




    for (var i = 0; i < 6; i++) {

     var rot = getRandom(0, 255);
     var blau = getRandom(0, 255);
     var gruen = getRandom(0, 255);
     var transparent = getRandom(5, 5);
     var grad = getRandom(-45, 45);
     var prozent_eins = getRandom(0, (screen.width / 4) * 3);
     var prozent_zwei = getRandom(prozent_eins, screen.width);
     backgroundStyle = backgroundStyle + ' ,linear-gradient(' + grad + 'deg,transparent 0,transparent ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_eins + 'px, rgba(' + rot + ',' + blau + ',' + gruen + ',.' + transparent + ') ' + prozent_zwei + 'px,transparent ' + prozent_zwei + 'px,transparent 100%)';
    }

   }
  }
  return backgroundStyle;
 };

 //Init
 vm.constantsSrv.getLevel(level_categories.apps).then(function (data) {
  $rootScope.apps = data;
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
