(function ()
{
 'use strict';

 angular
         .module('app.mentorship')
         .controller('MentorshipLinearHomeController', MentorshipLinearHomeController);

 /** @ngInject */
 function MentorshipLinearHomeController(add_mentorship_tabs, MentorshipService, DialogService, $stateParams, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.tabs = add_mentorship_tabs;
  vm.mentorshipId = $stateParams.id;
  ///////////

  //Methods
  vm.openAddMentorshipDialog = DialogService.openAddMentorshipDialog;





 }
})();