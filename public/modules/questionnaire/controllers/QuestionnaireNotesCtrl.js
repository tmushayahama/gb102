var questionnaireNotesCtrl = function (
        QuestionnaireNotesSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.questionnaireId = $stateParams.questionnaireId;
 vm.questionnaireNotesCopy;
 vm.questionnaireNotesSrv = new QuestionnaireNotesSrv();
 vm.noteFormDisplay = false;

 vm.defaultQuestionnaireNoteData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 }
 vm.newQuestionnaireNoteData = angular.copy(vm.defaultQuestionnaireNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createQuestionnaireNote = function (data) {
  vm.questionnaireNotesSrv.createQuestionnaireNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newQuestionnaireNoteData = angular.copy(vm.defaultQuestionnaireNoteData);
   vm.questionnaireNotesCopy = angular.copy(vm.questionnaireNotesSrv.questionnaireNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireNote = function (data) {
  vm.questionnaireNotesSrv.editQuestionnaireNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newQuestionnaireNoteData = angular.copy(vm.defaultQuestionnaireNoteData);
   vm.questionnaireNotesCopy = angular.copy(vm.questionnaireNotesSrv.questionnaireNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireNoteSections = {
  details: function (questionnaireNoteId, detail) {
   var questionnaireNoteData = {
    questionnaireNoteId: questionnaireNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestionnaireNote(questionnaireNoteData);
  }
 }

 vm.cancelQuestionnaireNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newQuestionnaireNoteData = angular.copy(vm.defaultQuestionnaireNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertQuestionnaireNote = function (questionnaireNote, questionnaireNoteCopy) {
  questionnaireNote = questionnaireNoteCopy;
  /*
   $filter('filter')
   (vm.questionnaireNotesSrv.questionnaireNotes, {id: questionnaireNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnaireNotesCopy, {id: questionnaireNoteId}, true)[0]);
   if (questionnaireNote.length && questionnaireNoteCopy.length) {
   // vm.questionnaireNotesSrv.questionnaireNotes angular.copy(vm.questionnaireNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaireNotes;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaireNotes, {completed: false}).length;
  vm.doneCount = vm.questionnaireNotesSrv.questionnaireNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireNoteService.put(vm.questionnaireNotes);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editNote = function (questionnaireNote) {
  vm.editedNote = questionnaireNote;
  // Clone the original questionnaireNote to restore it on demand.
  vm.originalNote = angular.copy(questionnaireNote);
 };


 vm.doneEditing = function (questionnaireNote) {
  vm.editedNote = null;
  questionnaireNote.title = questionnaireNote.title.trim();

  if (!questionnaireNote.title) {
   vm.removeNote(questionnaireNote);
  }
 };

 vm.openQuestionnaireNote = function (questionnaireNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'questionnaire-note-modal.html',
   controller: 'QuestionnaireNoteCtrl as questionnaireNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireNoteData: function () {
     return questionnaireNote;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.questionnaireNotesSrv.getQuestionnaireNotes(vm.questionnaireId);
};


questionnaireNotesCtrl.$inject = [
 'QuestionnaireNotesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireNotesCtrl', questionnaireNotesCtrl);
