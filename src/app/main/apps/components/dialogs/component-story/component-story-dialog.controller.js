(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentStoryDialogController', ComponentStoryDialogController);

 /** @ngInject */
 function ComponentStoryDialogController(add_component_tabs, level_categories, $state, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, ComponentService, MentorshipService, componentId) {

  var vm = this;

//Data
  vm.storyTabIndex = 0;
  vm.component = [];
  vm.currentComponent = [];
//Method
  vm.closeDialog = closeDialog;
  vm.getComponents = getComponents;
  vm.goUp = goUp;
  vm.goDown = goDown;
  vm.goLeft = goLeft;
  vm.goRight = goRight;

  init();

  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }

  function getComponents(id, listType, depth) {
   ComponentService.getComponent(id, listType, depth).then(function (data) {
    vm.component = data;
    vm.currentComponent = vm.component.components ? vm.component.components[0] : vm.component;
   });
  }

  function goUp() {
   var id = vm.component.parent_component_id;
   if (id) {
    getComponents(id, 6, 1);
   }
   vm.storyTabIndex = 0;
  }

  function goDown() {
   if (vm.component.components.length > 0) {
    var id = vm.component.components[vm.storyTabIndex].id;
    if (id) {
     getComponents(id, 6, 1);
    }
    vm.storyTabIndex = 0;
   }
  }

  function goLeft() {
   if (vm.storyTabIndex !== 0) {
    vm.storyTabIndex--;
    vm.currentComponent = vm.component.components[vm.storyTabIndex];
   }
  }

  function goRight() {
   if (vm.storyTabIndex < vm.component.components.length) {
    vm.storyTabIndex++;
    vm.currentComponent = vm.component.components[vm.storyTabIndex];
   }
  }

  /**
   * Inititialization
   *
   */
  function init() {
   getComponents(componentId, 6, 1);
  }

 }
})();