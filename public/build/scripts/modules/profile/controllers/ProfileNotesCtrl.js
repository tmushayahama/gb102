var profileNotesCtrl=function(ProfileNotesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.profileId=$stateParams.profileId,vm.profileNotesCopy,vm.profileNotesManager=new ProfileNotesManager,vm.noteFormDisplay=!1,vm.defaultProfileNoteData={profileId:$stateParams.profileId,privacy:0},vm.newProfileNoteData=angular.copy(vm.defaultProfileNoteData),vm.showNoteForm=function(){vm.noteFormDisplay=!0},vm.createProfileNote=function(data){vm.profileNotesManager.createProfileNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newProfileNoteData=angular.copy(vm.defaultProfileNoteData),vm.profileNotesCopy=angular.copy(vm.profileNotesManager.profileNotes)},function(response){console.log(response)})},vm.editProfileNote=function(data){vm.profileNotesManager.editProfileNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newProfileNoteData=angular.copy(vm.defaultProfileNoteData),vm.profileNotesCopy=angular.copy(vm.profileNotesManager.profileNotes)},function(response){console.log(response)})},vm.editProfileNoteSections={details:function(profileNoteId,detail){var profileNoteData={profileNoteId:profileNoteId,title:detail.title,description:detail.description};vm.editProfileNote(profileNoteData)}},vm.cancelProfileNote=function(form){vm.noteFormDisplay=!1,vm.newProfileNoteData=angular.copy(vm.defaultProfileNoteData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertProfileNote=function(profileNote,profileNoteCopy){profileNote=profileNoteCopy},vm.editedNote=null,$scope.$watch(angular.bind(this,function(){return vm.profileNotes}),function(){vm.doneCount=vm.profileNotesManager.profileNotes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editNote=function(profileNote){vm.editedNote=profileNote,vm.originalNote=angular.copy(profileNote)},vm.doneEditing=function(profileNote){vm.editedNote=null,profileNote.title=profileNote.title.trim(),profileNote.title||vm.removeNote(profileNote)},vm.openProfileNote=function(profileNote){var modalInstance=$uibModal.open({animation:!0,templateUrl:"profile-note-modal.html",controller:"ProfileNoteCtrl as profileNoteCtrl",backdrop:"static",size:"xl",resolve:{profileNoteData:function(){return profileNote}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.profileNotesManager.getProfileNotes(vm.profileId)};profileNotesCtrl.$inject=["ProfileNotesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.profile").controller("ProfileNotesCtrl",profileNotesCtrl);