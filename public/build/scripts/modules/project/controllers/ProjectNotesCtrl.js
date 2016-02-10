var projectNotesCtrl=function(ProjectNotesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.projectId=$stateParams.projectId,vm.projectNotesCopy,vm.projectNotesManager=new ProjectNotesManager,vm.noteFormDisplay=!1,vm.defaultProjectNoteData={projectId:$stateParams.projectId,privacy:0},vm.newProjectNoteData=angular.copy(vm.defaultProjectNoteData),vm.showNoteForm=function(){vm.noteFormDisplay=!0},vm.createProjectNote=function(data){vm.projectNotesManager.createProjectNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newProjectNoteData=angular.copy(vm.defaultProjectNoteData),vm.projectNotesCopy=angular.copy(vm.projectNotesManager.projectNotes)},function(response){console.log(response)})},vm.editProjectNote=function(data){vm.projectNotesManager.editProjectNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newProjectNoteData=angular.copy(vm.defaultProjectNoteData),vm.projectNotesCopy=angular.copy(vm.projectNotesManager.projectNotes)},function(response){console.log(response)})},vm.editProjectNoteSections={details:function(projectNoteId,detail){var projectNoteData={projectNoteId:projectNoteId,title:detail.title,description:detail.description};vm.editProjectNote(projectNoteData)}},vm.cancelProjectNote=function(form){vm.noteFormDisplay=!1,vm.newProjectNoteData=angular.copy(vm.defaultProjectNoteData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertProjectNote=function(projectNote,projectNoteCopy){projectNote=projectNoteCopy},vm.editedNote=null,$scope.$watch(angular.bind(this,function(){return vm.projectNotes}),function(){vm.doneCount=vm.projectNotesManager.projectNotes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editNote=function(projectNote){vm.editedNote=projectNote,vm.originalNote=angular.copy(projectNote)},vm.doneEditing=function(projectNote){vm.editedNote=null,projectNote.title=projectNote.title.trim(),projectNote.title||vm.removeNote(projectNote)},vm.openProjectNote=function(projectNote){var modalInstance=$uibModal.open({animation:!0,templateUrl:"project-note-modal.html",controller:"ProjectNoteCtrl as projectNoteCtrl",backdrop:"static",size:"xl",resolve:{projectNoteData:function(){return projectNote}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.projectNotesManager.getProjectNotes(vm.projectId)};projectNotesCtrl.$inject=["ProjectNotesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.project").controller("ProjectNotesCtrl",projectNotesCtrl);