var collaborationsCtrl=function(level_categories,ConstantsManager,SearchManager,CollaborationsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter,$css){var vm=this;$css.bind({href:"public/build/css/gb-sass/stylesheets/gb-themes/app-theme-collaboration.css"},$scope),vm.collaborationsManager=new CollaborationsManager,vm.constantsManager=new ConstantsManager,$rootScope.appName="COLLABORATIONR",vm.collaborationLevels,vm.collaborationTypes,$scope.superhero={selected:"Batman"},$scope.$watch("superhero.selected",function(newVal,oldVal){}),vm.createCollaboration=function(data){vm.collaborationsManager.createCollaboration(data).then(function(response){vm.FormDisplay=!1,vm.newCollaborationData=angular.copy(vm.defaultCollaborationData),vm.collaborationsCopy=angular.copy(vm.collaborationsManager.collaborations)},function(response){console.log(response)})},vm.editCollaboration=function(data){vm.collaborationsManager.editCollaboration(data).then(function(response){vm.FormDisplay=!1,vm.newCollaborationData=angular.copy(vm.defaultCollaborationData),vm.collaborationsCopy=angular.copy(vm.collaborationsManager.collaborations)},function(response){console.log(response)})},vm.editCollaborationSections={details:function(collaborationId,detail){var collaborationData={collaborationId:collaborationId,title:detail.title,description:detail.description};vm.editCollaboration(collaborationData)}},vm.cancelCollaboration=function(form){vm.FormDisplay=!1,vm.newCollaborationData=angular.copy(vm.defaultCollaborationData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertCollaboration=function(collaboration,collaborationCopy){collaboration=collaborationCopy},vm.edited=null,$scope.$watch(angular.bind(this,function(){return vm.collaborations}),function(){vm.doneCount=vm.collaborationsManager.collaborations.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.edit=function(collaboration){vm.edited=collaboration,vm.original=angular.copy(collaboration)},vm.doneEditing=function(collaboration){vm.edited=null,collaboration.title=collaboration.title.trim(),collaboration.title||vm.remove(collaboration)},$rootScope.openAddExplorerModal=function(){var modalInstance=$uibModal.open({animation:!0,templateUrl:"create-collaboration-modal.html",controller:"CreateCollaborationCtrl as createCollaborationCtrl",backdrop:"static",size:"xl",resolve:{collaborationTypes:function(){return vm.collaborationTypes}}});modalInstance.result.then(function(collaboration){vm.collaborationsManager.createCollaboration(collaboration)},function(){$log.info("Modal dismissed at: "+new Date)})},vm.constantsManager.getLevel(level_categories.collaboration).then(function(data){vm.collaborationTypes=data}),vm.constantsManager.getLevel(level_categories.collaboration).then(function(data){vm.collaborationLevels=data})};collaborationsCtrl.$inject=["level_categories","ConstantsManager","SearchManager","CollaborationsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter","$css"],angular.module("app.collaboration").controller("CollaborationsCtrl",collaborationsCtrl);