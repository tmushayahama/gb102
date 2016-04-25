var journalNoteCtrl = function (
        JournalNotesSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalNoteData) {
 var vm = this;
 vm.journalId = journalNoteData.journal_id;
 vm.journalNoteId = journalNoteData.id;
 vm.journalNotesSrv = new JournalNotesSrv();


 vm.noteId = journalNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newJournalNoteData = vm.defaultJournalNoteData;

 vm.getJournalNote = function (journalId, noteId) {
  vm.journalNotesSrv.getJournalNote(journalId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editJournalNote = function (data) {
  vm.journalNotesSrv.editJournalNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalNoteSections = {
  details: function (details) {
   var journalNoteData = {
    journalNoteId: vm.journalNoteId,
    title: details.title,
    description: details.description
   };
   vm.editJournalNote(journalNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getJournalNote(vm.journalId, vm.noteId);
};


journalNoteCtrl.$inject = [
 'JournalNotesSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalNoteData'];

angular.module("app.journal").controller('JournalNoteCtrl', journalNoteCtrl);
