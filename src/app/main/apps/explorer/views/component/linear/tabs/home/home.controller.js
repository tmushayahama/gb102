(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearHomeController', ComponentLinearHomeController);

 /** @ngInject */
 function ComponentLinearHomeController(add_component_tabs, BoardService, DialogService, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.tabs = add_component_tabs;
  ///////////

  //Methods
  vm.openAddComponentDialog = DialogService.openAddComponentDialog;


 }
})();