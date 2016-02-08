var mentorshipsCtrl=function(level_categories,ConstantsManager,SearchManager,MentorshipsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-mentorship.css"},$scope),vm.mentorshipsManager=new MentorshipsManager,vm.constantsManager=new ConstantsManager,$rootScope.appName="MENTORSHIPR",vm.mentorshipLevels,vm.mentorshipTypes,$scope.superhero={selected:"Batman"},$scope.$watch("superhero.selected",function(newVal,oldVal){}),vm.createMentorship=function(data){vm.mentorshipsManager.createMentorship(data).then(function(response){vm.FormDisplay=!1,vm.newMentorshipData=angular.copy(vm.defaultMentorshipData),vm.mentorshipsCopy=angular.copy(vm.mentorshipsManager.mentorships)},function(response){console.log(response)})},vm.editMentorship=function(data){vm.mentorshipsManager.editMentorship(data).then(function(response){vm.FormDisplay=!1,vm.newMentorshipData=angular.copy(vm.defaultMentorshipData),vm.mentorshipsCopy=angular.copy(vm.mentorshipsManager.mentorships)},function(response){console.log(response)})},vm.editMentorshipSections={details:function(mentorshipId,detail){var mentorshipData={mentorshipId:mentorshipId,title:detail.title,description:detail.description};vm.editMentorship(mentorshipData)}},vm.cancelMentorship=function(form){vm.FormDisplay=!1,vm.newMentorshipData=angular.copy(vm.defaultMentorshipData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertMentorship=function(mentorship,mentorshipCopy){mentorship=mentorshipCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.mentorships}),function(){vm.doneCount=vm.mentorshipsManager.mentorships.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(mentorship){vm.edited=mentorship,vm.original=angular.copy(mentorship)},vm.doneEditing=function(mentorship){vm.edited=null,mentorship.title=mentorship.title.trim(),mentorship.title||vm.remove(mentorship)},$rootScope.openAddExploreModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"create-mentorship-modal.html",controller:"CreateMentorshipCtrl as createMentorshipCtrl",backdrop:"static",size:"xl",resolve:{mentorshipTypes:function(){return vm.mentorshipTypes}}});modalInstance.result.then(function(mentorship){vm.mentorshipsManager.createMentorship(mentorship)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getLevel(level_categories.mentorship).then(function(data){vm.mentorshipTypes=data}),vm.constantsManager.getLevel(level_categories.mentorship).then(function(data){vm.mentorshipLevels=data})};mentorshipsCtrl.$inject=["level_categories","ConstantsManager","SearchManager","MentorshipsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.mentorship").controller("MentorshipsCtrl",mentorshipsCtrl);