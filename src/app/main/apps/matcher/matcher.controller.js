(function ()
{
 'use strict';

 angular
         .module('app.matcher')
         .controller('MatcherController', MatcherController);

 /** @ngInject */
 function MatcherController($stateParams, $rootScope, $mdSidenav, BoardService, CardFilters)
 {
  var vm = this;

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Matcher";

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