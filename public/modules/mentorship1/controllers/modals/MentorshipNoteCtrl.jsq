var mentorshipNoteCtrl = function (
        MentorshipNoteSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        mentorshipNoteData) {
 var vm = this;
 vm.mentorshipId = mentorshipNoteData.mentorship_id;
 vm.mentorshipNoteId = mentorshipNoteData.id;
 vm.mentorshipNoteSrv = new MentorshipNoteSrv();


 vm.noteId = mentorshipNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newMentorshipNoteData = vm.defaultMentorshipNoteData;

 vm.getMentorshipNote = function (mentorshipId, noteId) {
  vm.mentorshipNoteSrv.getMentorshipNote(mentorshipId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editMentorshipNote = function (data) {
  vm.mentorshipNoteSrv.editMentorshipNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipNoteSections = {
  details: function (details) {
   var mentorshipNoteData = {
    mentorshipNoteId: vm.mentorshipNoteId,
    title: details.title,
    description: details.description
   };
   vm.editMentorshipNote(mentorshipNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getMentorshipNote(vm.mentorshipId, vm.noteId);
};


mentorshipNoteCtrl.$inject = [
 'MentorshipNoteSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'mentorshipNoteData'];

angular.module("app.mentorship").controller('MentorshipNoteCtrl', mentorshipNoteCtrl);
