(function ()
{
 'use strict';

 angular
         .module('app.components')
         .controller('ComponentEditorDialogController', ComponentEditorDialogController);

 /** @ngInject */
 function ComponentEditorDialogController(add_component_tabs, level_categories, $scope, $document, $mdDialog, fuseTheming, fuseGenerator, msUtils, DialogService, ComponentService, componentId, defaultComponentFormatId) {

  var vm = this;
  // Data
  vm.tabs = add_component_tabs;
  vm.privacy = level_categories.privacy;
  vm.componentFormat = level_categories.componentFormat;
  vm.board = [];
  vm.component = [];
  vm.newLabelColor = 'red';
  vm.members = vm.board.members;
  vm.labels = vm.board.labels;

  // Methods
  vm.createComponent = createComponent;
  vm.openComponentDialog = DialogService.openComponentDialog;
  vm.updateComponentDescription = updateComponentDescription;
  vm.updateComponentBackground = updateComponentBackground;
  vm.openComponent = openComponent;
  vm.goBack = goBack;
  vm.palettes = fuseTheming.getRegisteredPalettes();
  vm.rgba = fuseGenerator.rgba;
  vm.toggleInArray = msUtils.toggleInArray;
  vm.exists = msUtils.exists;
  vm.closeDialog = closeDialog;
  // vm.getCardList = getCardList;


  init();

  //////////


  /**
   * Create a new component
   *
   * @param {type} component a parent component
   */
  function createComponent(component) {
   if (!component.newComponent.title) {
    return;
   }
   var data = {
    title: component.newComponent.title,
    description: "",
    parentComponentId: componentId, //parent component
    typeId: component.id,
    privacyId: vm.privacy.public
   };
   ComponentService.createComponent(data).then(function (response) {
    component.components.push(response);
    component.newComponent.title = "";
   });
  }

  /**
   * Update a component title and background
   *
   * @param {type} component to ve updated
   */
  function updateComponentDescription(component) {
   if (!component.title) {
    return;
   }
   var data = {
    componentId: component.id,
    title: component.title,
    description: component.description
   };
   ComponentService.updateComponentDescription(data).then(function (response) {
    // component.components.push(response);
   });
  }

  /**
   * Update a component background
   *
   * @param {type} component to ve updated
   */
  function updateComponentBackground(component) {
   var data = {
    componentId: component.id,
    backgroundColor: component.background_color
   };
   ComponentService.updateComponentBackground(data).then(function (response) {
    // component.components.push(response);
   });
  }

  /**
   * Close Dialog
   */
  function closeDialog() {
   $mdDialog.hide();
  }

  function openComponent(id) {
   getComponent(id);
  }

  function goBack() {
   if (vm.componentHistory.length <= 1) {
    closeDialog();
   } else {
    vm.componentHistory.pop();
    var id = vm.componentHistory[vm.componentHistory.length - 1];
    getComponent(id, true);
   }
  }

  function getComponent(id, componentFormat, back) {
   switch (componentFormat) {
    case vm.componentFormat.none:
     getComponentByNone(id, back);
     break;
    case vm.componentFormat.types:
     getComponentByTypw(id, back);
     break;
   }
  }

  function getComponentByNone(id, back) {
   ComponentService.getComponent(id, vm.componentFormat.none).then(function (data) {
    vm.component = data;
    vm.component.newComponentData = angular.copy(vm.defaultComponentData);

    if (!back) {
     vm.componentHistory.push(id);
    }
   });
  }

  function getComponentByTypw(id, componentFormatId, back) {
   ComponentService.getComponentsByType(componentId, componentFormatId).then(function (data) {
    vm.component.components = data;
    if (!back) {
     vm.componentHistory.push(id);
    }
   });
  }

  /**
   * Initialize
   */
  function init() {
   getComponent(componentId, defaultComponentFormatId);
  }
 }
})();