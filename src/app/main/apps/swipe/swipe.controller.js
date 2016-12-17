(function ()
{
 'use strict';

 angular
         .module('app.swipe')
         .controller('SwipeController', SwipeController);

 /** @ngInject */
 function SwipeController($stateParams, $rootScope, $mdSidenav, BoardService, CardFilters)
 {
  var vm = this;

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Swipe";

  vm.component;
  vm.swipeLevels;

  vm.swipeRight = function ($event, explorerId) {
   vm.createSwipe(explorerId, vm.swipeLevels[2].id);

   var ele = $event.target;
   //var x = Math.floor(Math.random() * 200) + 1,
   $(ele).css({
    'transform': "translate(50%, 30%) rotate(" + 20 + "deg)",
    'opacity': "0.3"

   });
   $timeout(function () {
    $(ele).css({
     'transform': "translate(0%, 0%) rotate(" + 0 + "deg)",
     'opacity': "1"
    });
   }, 1000);
  };

  vm.swipeLeft = function ($event, explorerId) {
   vm.createSwipe(explorerId, vm.swipeLevels[0].id);
   var ele = $event.target;
   //var x = Math.floor(Math.random() * 200) + 1,
   $(ele).css({
    'transform': "translate(-50%, 30%) rotate(" + -20 + "deg)",
    'opacity': "0.3"

   });
   $timeout(function () {
    $(ele).css({
     'transform': "translate(0%, 0%) rotate(" + 0 + "deg)",
     'opacity': "1"
    });
   }, 1000);
  }
  vm.swipeDown = function ($event, explorerId) {
   vm.createSwipe(explorerId, vm.swipeLevels[1].id);
  }

  vm.getSwipe = function () {
   vm.componentsSrv.getRandomComponent().then(function (response) {
    vm.component = response;
   });
  };

  vm.createSwipe = function (explorerId, levelId) {
   var data = {
    explorerId: explorerId,
    levelId: levelId,
    description: ""
   };
   vm.componentsSrv.createSwipe(data).then(function (response) {
    //vm.component = response;
   });
   vm.getSwipe();
  };

  vm.viewSwipe = function () {
   vm.componentsSrv.getSwipes();
  };

  vm.componentsSrv = new ComponentsSrv();
  vm.getSwipe();
  vm.constantsSrv.getLevel(12).then(function (data) {
   vm.swipeLevels = data;
  });






  // Data
  vm.currentView = 'board';
  vm.board = BoardService.data;
  //vm.boardList = BoardList.data;
  vm.boardSelectorVisible = false;

  // Methods
  vm.toggleSidenav = toggleSidenav;
  vm.updateBoardUri = updateBoardUri;
  vm.clearFilters = CardFilters.clear;
  vm.filteringIsOn = CardFilters.isOn;

  //init();

  ////////

  /**
   * Update Board Uri
   *
   * Once you connect your app to your server,
   * you would do this on your API server.
   */
  function updateBoardUri()
  {
   if (vm.boardList.getById(vm.board.id))
   {
    vm.boardList.getById(vm.board.id).name = vm.board.name;
    vm.boardList.getById(vm.board.id).uri = vm.board.uri = encodeURIComponent(vm.board.name).replace(/%20/g, '-').toLowerCase();
   }
  }

  /**
   * Toggle sidenav
   *
   * @param sidenavId
   */
  function toggleSidenav(sidenavId)
  {
   $mdSidenav(sidenavId).toggle();
  }

  /**
   * Array prototype
   *
   * Get by id
   *
   * @param value
   * @returns {T}
   */
  Array.prototype.getById = function (value)
  {
   return this.filter(function (x)
   {
    return x.id === value;
   })[0];
  };

  function init() {
   BoardService.getBoard($stateParams.id, 3).then(function (data) {
    vm.board = data;
   });
  }


 }
})();