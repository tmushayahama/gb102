var explorerNoteCtrl = function (
        ExplorerNotesSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerNoteData) {
 var vm = this;
 vm.explorerId = explorerNoteData.explorer_id;
 vm.explorerNoteId = explorerNoteData.id;
 vm.explorerNotesSrv = new ExplorerNotesSrv();
 vm.explorerNote = explorerNoteData;

 vm.noteId = explorerNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerNoteData = vm.defaultExplorerNoteData;

 vm.getExplorerNote = function (explorerId, noteId) {
  vm.explorerNotesSrv.getExplorerNote(explorerId, noteId).then(function (response) {
   vm.explorerNote = response;
  }, function (error) {
   console.log(error);
  });
 };

 vm.getSubNotes = function (noteId) {
  vm.explorerNotesSrv.getSubNotes(noteId).then(function (response) {
   var subs = response;
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerNote = function (data) {
  vm.explorerNotesSrv.editExplorerNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerNoteSections = {
  details: function (details) {
   var explorerNoteData = {
    explorerNoteId: vm.explorerNoteId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerNote(explorerNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 //vm.getExplorerNote(vm.explorerId, vm.noteId);
 //vm.getSubNotes(vm.noteId);
};


explorerNoteCtrl.$inject = [
 'ExplorerNotesSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerNoteData'];

angular.module("app.explorer").controller('ExplorerNoteCtrl', explorerNoteCtrl);
