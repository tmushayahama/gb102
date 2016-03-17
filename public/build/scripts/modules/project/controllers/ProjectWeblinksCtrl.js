var projectWeblinksCtrl=function(ProjectWeblinksSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.projectId=$stateParams.projectId,vm.projectWeblinksCopy,vm.projectWeblinksSrv=new ProjectWeblinksSrv,vm.weblinkFormDisplay=!1,vm.defaultProjectWeblinkData={projectId:$stateParams.projectId,privacy:0},vm.newProjectWeblinkData=angular.copy(vm.defaultProjectWeblinkData),vm.showWeblinkForm=function(){vm.weblinkFormDisplay=!0},vm.createProjectWeblink=function(data){vm.projectWeblinksSrv.createProjectWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newProjectWeblinkData=angular.copy(vm.defaultProjectWeblinkData),vm.projectWeblinksCopy=angular.copy(vm.projectWeblinksSrv.projectWeblinks)},function(response){console.log(response)})},vm.editProjectWeblink=function(data){vm.projectWeblinksSrv.editProjectWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newProjectWeblinkData=angular.copy(vm.defaultProjectWeblinkData),vm.projectWeblinksCopy=angular.copy(vm.projectWeblinksSrv.projectWeblinks)},function(response){console.log(response)})},vm.editProjectWeblinkSections={details:function(projectWeblinkId,detail){var projectWeblinkData={projectWeblinkId:projectWeblinkId,title:detail.title,description:detail.description};vm.editProjectWeblink(projectWeblinkData)}},vm.cancelProjectWeblink=function(form){vm.weblinkFormDisplay=!1,vm.newProjectWeblinkData=angular.copy(vm.defaultProjectWeblinkData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertProjectWeblink=function(projectWeblink,projectWeblinkCopy){projectWeblink=projectWeblinkCopy},vm.editedWeblink=null,$scope.$watch(angular.bind(this,function(){return vm.projectWeblinks}),function(){vm.doneCount=vm.projectWeblinksSrv.projectWeblinks.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editWeblink=function(projectWeblink){vm.editedWeblink=projectWeblink,vm.originalWeblink=angular.copy(projectWeblink)},vm.doneEditing=function(projectWeblink){vm.editedWeblink=null,projectWeblink.title=projectWeblink.title.trim(),projectWeblink.title||vm.removeWeblink(projectWeblink)},vm.openProjectWeblink=function(projectWeblink){var modalInstance=$uibModal.open({animation:!0,templateUrl:"project-weblink-modal.html",controller:"ProjectWeblinkCtrl as projectWeblinkCtrl",backdrop:"static",size:"xl",resolve:{projectWeblinkData:function(){return projectWeblink}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.projectWeblinksSrv.getProjectWeblinks(vm.projectId)};projectWeblinksCtrl.$inject=["ProjectWeblinksSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.project").controller("ProjectWeblinksCtrl",projectWeblinksCtrl);