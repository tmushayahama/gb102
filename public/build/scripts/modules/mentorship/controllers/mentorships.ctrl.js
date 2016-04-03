var mentorshipsCtrl=function(level_categories,ConstantsSrv,SearchSrv,MentorshipsSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-mentorship.css"},$scope),vm.mentorshipsSrv=new MentorshipsSrv,vm.constantsSrv=new ConstantsSrv,$rootScope.appName="MENTORSHIP APP",vm.mentorshipLevels,vm.appTypes,vm.createMentorship=function(data){vm.mentorshipsSrv.createMentorship(data).then(function(response){vm.FormDisplay=!1,vm.newMentorshipData=angular.copy(vm.defaultMentorshipData),vm.mentorshipsCopy=angular.copy(vm.mentorshipsSrv.mentorships)},function(response){console.log(response)})},vm.editMentorship=function(data){vm.mentorshipsSrv.editMentorship(data).then(function(response){vm.FormDisplay=!1,vm.newMentorshipData=angular.copy(vm.defaultMentorshipData),vm.mentorshipsCopy=angular.copy(vm.mentorshipsSrv.mentorships)},function(response){console.log(response)})},vm.editMentorshipSections={details:function(mentorshipId,detail){var mentorshipData={mentorshipId:mentorshipId,title:detail.title,description:detail.description};vm.editMentorship(mentorshipData)}},vm.cancelMentorship=function(form){vm.FormDisplay=!1,vm.newMentorshipData=angular.copy(vm.defaultMentorshipData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertMentorship=function(mentorship,mentorshipCopy){mentorship=mentorshipCopy},$scope.$watch(angular.bind(this,function(){return vm.mentorships}),function(){vm.doneCount=vm.mentorshipsSrv.mentorships.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(mentorship){vm.edited=mentorship,vm.original=angular.copy(mentorship)},vm.doneEditing=function(mentorship){vm.edited=null,mentorship.title=mentorship.title.trim(),mentorship.title||vm.remove(mentorship)},$rootScope.openAddMentorshipModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-mentorship-modal.html",controller:"AddMentorshipCtrl as addMentorshipCtrl",backdrop:"static",size:"xl",resolve:{appTypes:function(){return vm.appTypes}}});modalInstance.result.then(function(mentorship){vm.mentorshipsSrv.createMentorship(mentorship)},function(){$log.info("Modal dismissed at: "+new Date)})},$rootScope.openCreateRequestMentorshipModal=function(mentorshipId){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-request-mentorship-modal.html",controller:"CreateRequestMentorshipCtrl as createRequestMentorshipCtrl",backdrop:"static",size:"xl",resolve:{requestOptions:function(){return vm.mentorshipsSrv.getMentorshipRequestOptions(mentorshipId)}}});modalInstance.result.then(function(mentorship){vm.mentorshipsSrv.createMentorship(mentorship)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsSrv.getAppTypes().then(function(data){vm.appTypes=data}),vm.constantsSrv.getLevel(level_categories.mentorship).then(function(data){vm.mentorshipLevels=data})};mentorshipsCtrl.$inject=["level_categories","ConstantsSrv","SearchSrv","MentorshipsSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.mentorship").controller("MentorshipsCtrl",mentorshipsCtrl);