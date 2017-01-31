(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ExplorerAddComponentsDialogController', ExplorerAddComponentsDialogController);

 /** @ngInject */
 function ExplorerAddComponentsDialogController(add_component_tabs, level_categories, $state, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, ComponentService, MentorshipService, componentId, contents) {

  var vm = this;

  // Data
  vm.contentsList = [];
  vm.formTabIndex = 0;
  vm.tabs = add_component_tabs;

  vm.selectedTabHistory = [];
  vm.selectedApp = [];

  vm.privacy = {
   value: level_categories.privacy,
   selected: {}
  };

  // Methods
  vm.selectTab = selectTab;
  vm.tabBack = tabBack;
  vm.selectPrivacy = selectPrivacy;
  vm.createComponent = createComponent;
  vm.closeDialog = closeDialog;

  //init
  init();

  //////////

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }

  /**
   * Select a tab
   *
   * @param {type} index a tab index
   */
  function selectTab(index) {
   vm.formTabIndex = index;
   vm.selectedTabHistory.push(index);
  }

  /**
   * Back a tab
   */
  function tabBack() {
   vm.selectedTabHistory.pop();
   vm.formTabIndex = vm.selectedTabHistory[vm.selectedTabHistory.length - 1];
  }

  /**
   * Select the privacy
   *
   * @param {type} id  theid of the privacy constant
   * @param {type} title thge label of the privacy
   */
  function selectPrivacy(id, title) {
   vm.privacy.selected.id = id;
   vm.privacy.selected.title = title;
  }

  /**
   * Add a new component
   *
   */
  function createComponent() {
   vm.component.parentComponentId = componentId;
   vm.component.typeId = vm.selectedApp.id;
   vm.component.privacyId = vm.privacy.selected.id;
   ComponentService.createComponent(vm.component).then(function (data) {
    vm.closeDialog();
    $state.go('app.componentLinearView.home', {id: data.id});
   });
  }


  /**
   * Inititialization
   *
   */
  function init() {
   vm.contentsList = contents.split('\n');
   vm.currentIndex = 0;


   selectPrivacy(level_categories.privacy.public, "Public");

  }

 }
})();