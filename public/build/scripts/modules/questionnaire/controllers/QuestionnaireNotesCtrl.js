var questionnaireNotesCtrl=function(QuestionnaireNotesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.questionnaireId=$stateParams.questionnaireId,vm.questionnaireNotesCopy,vm.questionnaireNotesManager=new QuestionnaireNotesManager,vm.noteFormDisplay=!1,vm.defaultQuestionnaireNoteData={questionnaireId:$stateParams.questionnaireId,privacy:0},vm.newQuestionnaireNoteData=angular.copy(vm.defaultQuestionnaireNoteData),vm.showNoteForm=function(){vm.noteFormDisplay=!0},vm.createQuestionnaireNote=function(data){vm.questionnaireNotesManager.createQuestionnaireNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newQuestionnaireNoteData=angular.copy(vm.defaultQuestionnaireNoteData),vm.questionnaireNotesCopy=angular.copy(vm.questionnaireNotesManager.questionnaireNotes)},function(response){console.log(response)})},vm.editQuestionnaireNote=function(data){vm.questionnaireNotesManager.editQuestionnaireNote(data).then(function(response){vm.noteFormDisplay=!1,vm.newQuestionnaireNoteData=angular.copy(vm.defaultQuestionnaireNoteData),vm.questionnaireNotesCopy=angular.copy(vm.questionnaireNotesManager.questionnaireNotes)},function(response){console.log(response)})},vm.editQuestionnaireNoteSections={details:function(questionnaireNoteId,detail){var questionnaireNoteData={questionnaireNoteId:questionnaireNoteId,title:detail.title,description:detail.description};vm.editQuestionnaireNote(questionnaireNoteData)}},vm.cancelQuestionnaireNote=function(form){vm.noteFormDisplay=!1,vm.newQuestionnaireNoteData=angular.copy(vm.defaultQuestionnaireNoteData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertQuestionnaireNote=function(questionnaireNote,questionnaireNoteCopy){questionnaireNote=questionnaireNoteCopy},vm.editedNote=null,$scope.$watch(angular.bind(this,function(){return vm.questionnaireNotes}),function(){vm.doneCount=vm.questionnaireNotesManager.questionnaireNotes.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editNote=function(questionnaireNote){vm.editedNote=questionnaireNote,vm.originalNote=angular.copy(questionnaireNote)},vm.doneEditing=function(questionnaireNote){vm.editedNote=null,questionnaireNote.title=questionnaireNote.title.trim(),questionnaireNote.title||vm.removeNote(questionnaireNote)},vm.openQuestionnaireNote=function(questionnaireNote){var modalInstance=$uibModal.open({animation:!0,templateUrl:"questionnaire-note-modal.html",controller:"QuestionnaireNoteCtrl as questionnaireNoteCtrl",backdrop:"static",size:"xl",resolve:{questionnaireNoteData:function(){return questionnaireNote}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.questionnaireNotesManager.getQuestionnaireNotes(vm.questionnaireId)};questionnaireNotesCtrl.$inject=["QuestionnaireNotesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.questionnaire").controller("QuestionnaireNotesCtrl",questionnaireNotesCtrl);