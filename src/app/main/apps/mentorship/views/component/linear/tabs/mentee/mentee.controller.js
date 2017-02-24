(function ()
{
 'use strict';

 angular
         .module('app.mentorship')
         .controller('MentorshipLinearMenteeController', MentorshipLinearMenteeController);

 /** @ngInject */
 function MentorshipLinearMenteeController(add_component_tabs, MentorshipService, DialogService, $stateParams, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.tabs = add_component_tabs;
  vm.mentorshipId = $stateParams.id;
  ///////////

  //Methods
  vm.openAddMentorshipDialog = DialogService.openAddMentorshipDialog;





 }
})();