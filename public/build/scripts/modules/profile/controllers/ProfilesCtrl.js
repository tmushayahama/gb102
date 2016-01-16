var profilesCtrl=function(level_categories,ConstantsManager,ProfilesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-profile.css"},$scope),vm.profilesManager=new ProfilesManager,vm.constantsManager=new ConstantsManager,vm.profileLevels,vm.createProfile=function(data){vm.profilesManager.createProfile(data).then(function(response){vm.FormDisplay=!1,vm.newProfileData=angular.copy(vm.defaultProfileData),vm.profilesCopy=angular.copy(vm.profilesManager.profiles)},function(response){console.log(response)})},vm.editProfile=function(data){vm.profilesManager.editProfile(data).then(function(response){vm.FormDisplay=!1,vm.newProfileData=angular.copy(vm.defaultProfileData),vm.profilesCopy=angular.copy(vm.profilesManager.profiles)},function(response){console.log(response)})},vm.editProfileSections={details:function(profileId,detail){var profileData={profileId:profileId,title:detail.title,description:detail.description};vm.editProfile(profileData)}},vm.cancelProfile=function(form){vm.FormDisplay=!1,vm.newProfileData=angular.copy(vm.defaultProfileData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertProfile=function(profile,profileCopy){profile=profileCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.profiles}),function(){vm.doneCount=vm.profilesManager.profiles.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(profile){vm.edited=profile,vm.original=angular.copy(profile)},vm.doneEditing=function(profile){vm.edited=null,profile.title=profile.title.trim(),profile.title||vm.remove(profile)},vm.openAddProfileModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-profile-modal.html",controller:"AddProfileCtrl as addProfileCtrl",backdrop:"static",size:"xl",resolve:{profileLevels:function(){return vm.profileLevels}}});modalInstance.result.then(function(profile){vm.profilesManager.createProfile(profile)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getLevel(level_categories.profile).then(function(data){vm.profileLevels=data})};profilesCtrl.$inject=["level_categories","ConstantsManager","ProfilesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.profiles").controller("ProfilesCtrl",profilesCtrl);