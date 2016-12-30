(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearHomeController', ComponentLinearHomeController);

 /** @ngInject */
 function ComponentLinearHomeController(BoardService, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.collapseMoreSections = true;

  ///////////
  //
  //
  //Methods
  vm.toggleMoreSections = toggleMoreSections;

  /**
   * Toggle the More Sections Section
   *
   */
  function toggleMoreSections() {
   vm.collapseMoreSections = !vm.collapseMoreSections;
  }
 }
})();