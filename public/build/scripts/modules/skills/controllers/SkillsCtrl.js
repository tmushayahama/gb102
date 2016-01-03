var skillsCtrl=function(ConstantsManager,SkillsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-skill.css"},$scope),vm.skillsManager=new SkillsManager,vm.constantsManager=new ConstantsManager,vm.skillLevels,vm.createSkill=function(data){vm.skillsManager.createSkill(data).then(function(response){vm.FormDisplay=!1,vm.newSkillData=angular.copy(vm.defaultSkillData),vm.skillsCopy=angular.copy(vm.skillsManager.skills)},function(response){console.log(response)})},vm.editSkill=function(data){vm.skillsManager.editSkill(data).then(function(response){vm.FormDisplay=!1,vm.newSkillData=angular.copy(vm.defaultSkillData),vm.skillsCopy=angular.copy(vm.skillsManager.skills)},function(response){console.log(response)})},vm.editSkillSections={details:function(skillId,detail){var skillData={skillId:skillId,title:detail.title,description:detail.description};vm.editSkill(skillData)}},vm.cancelSkill=function(form){vm.FormDisplay=!1,vm.newSkillData=angular.copy(vm.defaultSkillData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertSkill=function(skill,skillCopy){skill=skillCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.skills}),function(){vm.doneCount=vm.skillsManager.skills.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(skill){vm.edited=skill,vm.original=angular.copy(skill)},vm.doneEditing=function(skill){vm.edited=null,skill.title=skill.title.trim(),skill.title||vm.remove(skill)},vm.openAddSkillModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"add-skill-modal.html",controller:"AddSkillCtrl as addSkillCtrl",backdrop:"static",size:"xl",resolve:{skillLevels:function(){return vm.skillLevels}}});modalInstance.result.then(function(skill){vm.skillsManager.createSkill(skill)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getLevel(1).then(function(data){vm.skillLevels=data})};skillsCtrl.$inject=["ConstantsManager","SkillsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.skills").controller("SkillsCtrl",skillsCtrl);