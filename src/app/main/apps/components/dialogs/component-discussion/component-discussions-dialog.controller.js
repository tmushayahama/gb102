(function ()
{
 'use strict';

 angular
         .module('app.components')
         .controller('ComponentDiscussionsDialogController', ComponentDiscussionsDialogController);

 /** @ngInject */
 function ComponentDiscussionsDialogController(ComponentService, level_categories, $rootScope, $stateParams, $document, $timeout, $scope, $mdSidenav, $mdDialog, componentId) {

  var vm = this;

  // Data
  //vm.componentId = $stateParams.id;
  vm.posts = [];
  vm.privacy = {
   value: level_categories.privacy,
   selected: {
    id: level_categories.privacy.public
   }
  };

  // Methods
  vm.closeDialog = closeDialog;
  vm.createPost = createPost;

  //////////

  init();

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
   * Add a new component
   *
   */
  function createPost() {
   if (vm.post.title) {
    vm.post.description = "";
    vm.post.parentComponentId = componentId;
    vm.post.typeId = level_categories.post.discussion;
    vm.post.privacyId = vm.privacy.selected.id;
    ComponentService.createComponent(vm.post).then(function (data) {
     vm.posts.unshift(data);
     vm.post = {};
    });
   }
  }


  function init() {
   ComponentService.getComponentsByType(componentId, level_categories.post.discussion).then(function (data) {
    vm.posts = data;
   });
  }
  //////////

 }
})();