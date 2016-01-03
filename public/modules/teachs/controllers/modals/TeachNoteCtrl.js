var teachNoteCtrl = function (
        TeachNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        teachNoteData) {
 var vm = this;
 vm.teachId = teachNoteData.teach_id;
 vm.teachNoteId = teachNoteData.id;
 vm.teachNoteManager = new TeachNoteManager();


 vm.noteId = teachNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newTeachNoteData = vm.defaultTeachNoteData;

 vm.getTeachNote = function (teachId, noteId) {
  vm.teachNoteManager.getTeachNote(teachId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editTeachNote = function (data) {
  vm.teachNoteManager.editTeachNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachNoteSections = {
  details: function (details) {
   var teachNoteData = {
    teachNoteId: vm.teachNoteId,
    title: details.title,
    description: details.description
   };
   vm.editTeachNote(teachNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getTeachNote(vm.teachId, vm.noteId);
};


teachNoteCtrl.$inject = [
 'TeachNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'teachNoteData'];

angular.module("app.teachs").controller('TeachNoteCtrl', teachNoteCtrl);
