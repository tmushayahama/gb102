var mentorshipNotesCtrl=function(MentorshipNotesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.mentorshipId=$stateParams.mentorshipId,vm.mentorshipNotesCopy,vm.mentorshipNotesManager=new MentorshipNotesManager,vm.noteFormDisplay=!1,vm.defaultMentorshipNoteData={mentorshipId:$stateParams.mentorshipId,privacy:0},vm.newMentorshipNoteData=angular.copy(vm.defaultMentorshipNoteData),vm.showNoteForm=function(){vm.noteFormDisplay=!0},vm.createMentorshipNote=function(data){vm.mentorshipNotesManager.createMentorshipNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newMentorshipNoteData=angular.copy(vm.defaultMentorshipNoteData),vm.mentorshipNotesCopy=angular.copy(vm.mentorshipNotesManager.mentorshipNotes)},function(response){console.log(response)})},vm.editMentorshipNote=function(data){vm.mentorshipNotesManager.editMentorshipNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newMentorshipNoteData=angular.copy(vm.defaultMentorshipNoteData),vm.mentorshipNotesCopy=angular.copy(vm.mentorshipNotesManager.mentorshipNotes)},function(response){console.log(response)})},vm.editMentorshipNoteSections={details:function(mentorshipNoteId,detail){var mentorshipNoteData={mentorshipNoteId:mentorshipNoteId,title:detail.title,description:detail.description};vm.editMentorshipNote(mentorshipNoteData)}},vm.cancelMentorshipNote=function(form){vm.noteFormDisplay=!1,vm.newMentorshipNoteData=angular.copy(vm.defaultMentorshipNoteData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertMentorshipNote=function(mentorshipNote,mentorshipNoteCopy){mentorshipNote=mentorshipNoteCopy},vm.editedNote=null,$scope.$watch(angular.bind(this,function(){return vm.mentorshipNotes}),function(){vm.doneCount=vm.mentorshipNotesManager.mentorshipNotes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editNote=function(mentorshipNote){vm.editedNote=mentorshipNote,vm.originalNote=angular.copy(mentorshipNote)},vm.doneEditing=function(mentorshipNote){vm.editedNote=null,mentorshipNote.title=mentorshipNote.title.trim(),mentorshipNote.title||vm.removeNote(mentorshipNote)},vm.openMentorshipNote=function(mentorshipNote){var modalInstance=$uibModal.open({animation:!0,templateUrl:"mentorship-note-modal.html",controller:"MentorshipNoteCtrl as mentorshipNoteCtrl",backdrop:"static",size:"xl",resolve:{mentorshipNoteData:function(){return mentorshipNote}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.mentorshipNotesManager.getMentorshipNotes(vm.mentorshipId)};mentorshipNotesCtrl.$inject=["MentorshipNotesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.mentorships").controller("MentorshipNotesCtrl",mentorshipNotesCtrl);