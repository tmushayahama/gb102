var skillNotesCtrl=function(SkillNotesSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.skillId=$stateParams.skillId,vm.skillNotesCopy,vm.skillNotesSrv=new SkillNotesSrv,vm.noteFormDisplay=!1,vm.defaultSkillNoteData={skillId:$stateParams.skillId,privacy:0},vm.newSkillNoteData=angular.copy(vm.defaultSkillNoteData),vm.showNoteForm=function(){vm.noteFormDisplay=!0},vm.createSkillNote=function(data){vm.skillNotesSrv.createSkillNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newSkillNoteData=angular.copy(vm.defaultSkillNoteData),vm.skillNotesCopy=angular.copy(vm.skillNotesSrv.skillNotes)},function(response){console.log(response)})},vm.editSkillNote=function(data){vm.skillNotesSrv.editSkillNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newSkillNoteData=angular.copy(vm.defaultSkillNoteData),vm.skillNotesCopy=angular.copy(vm.skillNotesSrv.skillNotes)},function(response){console.log(response)})},vm.editSkillNoteSections={details:function(skillNoteId,detail){var skillNoteData={skillNoteId:skillNoteId,title:detail.title,description:detail.description};vm.editSkillNote(skillNoteData)}},vm.cancelSkillNote=function(form){vm.noteFormDisplay=!1,vm.newSkillNoteData=angular.copy(vm.defaultSkillNoteData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertSkillNote=function(skillNote,skillNoteCopy){skillNote=skillNoteCopy},vm.editedNote=null,$scope.$watch(angular.bind(this,function(){return vm.skillNotes}),function(){vm.doneCount=vm.skillNotesSrv.skillNotes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editNote=function(skillNote){vm.editedNote=skillNote,vm.originalNote=angular.copy(skillNote)},vm.doneEditing=function(skillNote){vm.editedNote=null,skillNote.title=skillNote.title.trim(),skillNote.title||vm.removeNote(skillNote)},vm.openSkillNote=function(skillNote){var modalInstance=$uibModal.open({animation:!0,templateUrl:"skill-note-modal.html",controller:"SkillNoteCtrl as skillNoteCtrl",backdrop:"static",size:"xl",resolve:{skillNoteData:function(){return skillNote}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.skillNotesSrv.getSkillNotes(vm.skillId)};skillNotesCtrl.$inject=["SkillNotesSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.skills").controller("SkillNotesCtrl",skillNotesCtrl);