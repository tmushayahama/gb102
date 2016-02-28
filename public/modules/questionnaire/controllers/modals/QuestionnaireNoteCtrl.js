var questionnaireNoteCtrl = function (
        QuestionnaireNoteSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        questionnaireNoteData) {
 var vm = this;
 vm.questionnaireId = questionnaireNoteData.questionnaire_id;
 vm.questionnaireNoteId = questionnaireNoteData.id;
 vm.questionnaireNoteSrv = new QuestionnaireNoteSrv();


 vm.noteId = questionnaireNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newQuestionnaireNoteData = vm.defaultQuestionnaireNoteData;

 vm.getQuestionnaireNote = function (questionnaireId, noteId) {
  vm.questionnaireNoteSrv.getQuestionnaireNote(questionnaireId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editQuestionnaireNote = function (data) {
  vm.questionnaireNoteSrv.editQuestionnaireNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireNoteSections = {
  details: function (details) {
   var questionnaireNoteData = {
    questionnaireNoteId: vm.questionnaireNoteId,
    title: details.title,
    description: details.description
   };
   vm.editQuestionnaireNote(questionnaireNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getQuestionnaireNote(vm.questionnaireId, vm.noteId);
};


questionnaireNoteCtrl.$inject = [
 'QuestionnaireNoteSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'questionnaireNoteData'];

angular.module("app.questionnaire").controller('QuestionnaireNoteCtrl', questionnaireNoteCtrl);
