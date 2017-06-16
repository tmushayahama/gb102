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
  vm.componentHistory = [];
  vm.newLabelColor = 'red';
  vm.members = vm.board.members;
  vm.labels = vm.board.labels;
  //////////

  // Methods
  vm.getComponent = getComponent;
  vm.goBack = goBack;
  vm.createComponent = createComponent;
  vm.updateComponentDescription = updateComponentDescription;
  vm.updateComponentBackground = updateComponentBackground;
  vm.palettes = fuseTheming.getRegisteredPalettes();
  vm.rgba = fuseGenerator.rgba;
  vm.toggleInArray = msUtils.toggleInArray;
  vm.exists = msUtils.exists;
  vm.closeDialog = closeDialog;
  //////////

  init();

  /**
   * Initialize
   */
  function init() {
   getComponent(componentId, defaultComponentFormatId);
  }

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
   if (vm.componentHistory.length > 0) {
    vm.componentHistory.pop();
    var id = vm.componentHistory[vm.componentHistory.length - 1];
    getComponent(id, vm.componentFormat.types, true);
   }
  }

  function getComponent(id, componentFormat, back) {
   switch (componentFormat) {
    case vm.componentFormat.none:
     getComponentByNone(id, componentFormat, back);
     break;
    case vm.componentFormat.types:
     getComponentByTypw(id, componentFormat, back);
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
   ComponentService.getComponent(id, componentFormatId).then(function (data) {
    vm.component = data;
    if (!back) {
     vm.componentHistory.push(id);
    }
   });
  }


 }
})();