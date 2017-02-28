(function ()
{
 'use strict';

 angular
         .module('app.mentorship')
         .controller('MentorshipLinearHomeController', MentorshipLinearHomeController);

 /** @ngInject */
 function MentorshipLinearHomeController(add_component_tabs, MentorshipService, DialogService, $stateParams, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.tabs = add_component_tabs;
  vm.mentorshipId = $stateParams.id;
  ///////////

  //Methods
  vm.openAddComponentDialog = DialogService.openAddComponentDialog;





 }
})();