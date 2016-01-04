var exploreNoteCtrl = function (
        ExploreNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreNoteData) {
 var vm = this;
 vm.exploreId = exploreNoteData.explore_id;
 vm.exploreNoteId = exploreNoteData.id;
 vm.exploreNoteManager = new ExploreNoteManager();


 vm.noteId = exploreNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreNoteData = vm.defaultExploreNoteData;

 vm.getExploreNote = function (exploreId, noteId) {
  vm.exploreNoteManager.getExploreNote(exploreId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreNote = function (data) {
  vm.exploreNoteManager.editExploreNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreNoteSections = {
  details: function (details) {
   var exploreNoteData = {
    exploreNoteId: vm.exploreNoteId,
    title: details.title,
    description: details.description
   };
   vm.editExploreNote(exploreNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getExploreNote(vm.exploreId, vm.noteId);
};


exploreNoteCtrl.$inject = [
 'ExploreNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreNoteData'];

angular.module("app.explores").controller('ExploreNoteCtrl', exploreNoteCtrl);
