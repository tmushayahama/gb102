(function ()
{
 'use strict';

 angular
         .module('app.profile')
         .controller('ProfileController', ProfileController);

 /** @ngInject */
 function ProfileController(ProfileService, $stateParams, $rootScope)
 {
  var vm = this;
  vm.profile = {};
  vm.components = [];

  init();

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};


  // Data
  //vm.posts = Timeline.posts;
  //vm.activities = Timeline.activities;
  //vm.about = About.data;
  //vm.photosVideos = PhotosVideos.data;

  // Methods
  function init() {
   ProfileService.getProfile($stateParams.user_id).then(function (data) {
    vm.profile = data.profile;
    vm.components = data.components;
   });

   //////////
  }
 }

})();
