var collaborationManageCtrl=function(CollaborationManager,$state,$stateParams,$http,$q,$rootScope){var vm=this;vm.collaborationId=$stateParams.collaborationId,vm.collaborations,vm.collaborationManager=new CollaborationManager,vm.getCollaboration=function(id){vm.collaborationManager.getCollaboration(id).then(function(data){vm.collaboration=data,vm.getSubCollaborations(vm.collaboration.explorer_id)})},vm.getSubCollaborations=function(explorerId){vm.collaborationManager.getSubCollaborations(explorerId).then(function(data){vm.collaborations=data})},vm.getCollaboration(vm.collaborationId)};collaborationManageCtrl.$inject=["CollaborationManager","$state","$stateParams","$http","$q","$rootScope"],angular.module("app.collaboration").controller("CollaborationManageCtrl",collaborationManageCtrl);