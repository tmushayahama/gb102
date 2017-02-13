(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentStoryDialogController', ComponentStoryDialogController);

 /** @ngInject */
 function ComponentStoryDialogController(add_component_tabs, level_categories, $state, $scope, $document, $mdDialog, $interval, fuseTheming, fuseGenerator, msUtils, ComponentService, MentorshipService, componentId) {

  var vm = this;

//Data
  vm.storyTabIndex = 0;
  vm.startIndices = [];
  vm.component = [];
  vm.currentComponent = [];
  vm.downDisabled = false;
//Method
  vm.closeDialog = closeDialog;
  vm.getComponents = getComponents;
  vm.goUp = goUp;
  vm.goDown = goDown;
  vm.goLeft = goLeft;
  vm.goRight = goRight;

  init();





  $scope.startTour = function () {
   var start;

   if (angular.isDefined(start))
    return;

   start = $interval(function () {
    if (true) {
     navigate();
    } else {
     $scope.stopTour();
    }
   }, 500);
  };

  $scope.stopTour = function () {
   if (angular.isDefined(stop)) {
    $interval.cancel(start);
    start = undefined;
   }
  };

  var navigate = function () {
   if (!goDown()) {
    if (!goRight()) {

    } else {
     while (true) {
      goUp();
     }
    }
   }
  }

  $scope.$on('$destroy', function () {
   // Make sure that the interval is destroyed too
   $scope.stopTour();
  });
  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }

  function getComponents(id, listType, depth, up) {
   ComponentService.getComponent(id, listType, depth).then(function (data) {
    if (data.components.length > 0) {
     vm.component = data;
     if (up) {
      vm.storyTabIndex = vm.startIndices.length > 0 ? vm.startIndices.pop() : 0;
     } else {
      vm.startIndices.push(vm.storyTabIndex);
      vm.storyTabIndex = 0;
     }
     vm.currentComponent = vm.component.components[vm.storyTabIndex];
     vm.downDisabled = false;
    } else {
     vm.downDisabled = true;
    }
   });
  }

  function goUp() {
   var id = vm.component.parent_component_id;
   if (id) {
    getComponents(id, 6, 1, true);
    return false;
   } else {
    return true;
   }
  }

  function goDown() {
   if (vm.component.components.length > 0) {
    var id = vm.component.components[vm.storyTabIndex].id;
    if (id) {
     getComponents(id, 6, 1);
    }
    // vm.storyTabIndex = 0;
    return false;
   } else {
    return true;
   }
  }

  function goLeft() {
   if (vm.storyTabIndex !== 0) {
    vm.storyTabIndex--;
    vm.currentComponent = vm.component.components[vm.storyTabIndex];
    vm.downDisabled = false;
    return false;
   } else {
    return true;
   }
  }

  function goRight() {
   if (vm.storyTabIndex < vm.component.components.length) {
    vm.storyTabIndex++;
    vm.currentComponent = vm.component.components[vm.storyTabIndex];
    vm.downDisabled = false;
    return false;
   } else {
    return true;
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