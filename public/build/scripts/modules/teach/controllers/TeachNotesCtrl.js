var teachNotesCtrl=function(TeachNotesSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.teachId=$stateParams.teachId,vm.teachNotesCopy,vm.teachNotesSrv=new TeachNotesSrv,vm.noteFormDisplay=!1,vm.defaultTeachNoteData={teachId:$stateParams.teachId,privacy:0},vm.newTeachNoteData=angular.copy(vm.defaultTeachNoteData),vm.showNoteForm=function(){vm.noteFormDisplay=!0},vm.createTeachNote=function(data){vm.teachNotesSrv.createTeachNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newTeachNoteData=angular.copy(vm.defaultTeachNoteData),vm.teachNotesCopy=angular.copy(vm.teachNotesSrv.teachNotes)},function(response){console.log(response)})},vm.editTeachNote=function(data){vm.teachNotesSrv.editTeachNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newTeachNoteData=angular.copy(vm.defaultTeachNoteData),vm.teachNotesCopy=angular.copy(vm.teachNotesSrv.teachNotes)},function(response){console.log(response)})},vm.editTeachNoteSections={details:function(teachNoteId,detail){var teachNoteData={teachNoteId:teachNoteId,title:detail.title,description:detail.description};vm.editTeachNote(teachNoteData)}},vm.cancelTeachNote=function(form){vm.noteFormDisplay=!1,vm.newTeachNoteData=angular.copy(vm.defaultTeachNoteData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertTeachNote=function(teachNote,teachNoteCopy){teachNote=teachNoteCopy},vm.editedNote=null,$scope.$watch(angular.bind(this,function(){return vm.teachNotes}),function(){vm.doneCount=vm.teachNotesSrv.teachNotes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editNote=function(teachNote){vm.editedNote=teachNote,vm.originalNote=angular.copy(teachNote)},vm.doneEditing=function(teachNote){vm.editedNote=null,teachNote.title=teachNote.title.trim(),teachNote.title||vm.removeNote(teachNote)},vm.openTeachNote=function(teachNote){var modalInstance=$uibModal.open({animation:!0,templateUrl:"teach-note-modal.html",controller:"TeachNoteCtrl as teachNoteCtrl",backdrop:"static",size:"xl",resolve:{teachNoteData:function(){return teachNote}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.teachNotesSrv.getTeachNotes(vm.teachId)};teachNotesCtrl.$inject=["TeachNotesSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.teach").controller("TeachNotesCtrl",teachNotesCtrl);