var swipeNoteCtrl = function (
        SwipeNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        swipeNoteData) {
 var vm = this;
 vm.swipeId = swipeNoteData.swipe_id;
 vm.swipeNoteId = swipeNoteData.id;
 vm.swipeNoteManager = new SwipeNoteManager();


 vm.noteId = swipeNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSwipeNoteData = vm.defaultSwipeNoteData;

 vm.getSwipeNote = function (swipeId, noteId) {
  vm.swipeNoteManager.getSwipeNote(swipeId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSwipeNote = function (data) {
  vm.swipeNoteManager.editSwipeNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeNoteSections = {
  details: function (details) {
   var swipeNoteData = {
    swipeNoteId: vm.swipeNoteId,
    title: details.title,
    description: details.description
   };
   vm.editSwipeNote(swipeNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getSwipeNote(vm.swipeId, vm.noteId);
};


swipeNoteCtrl.$inject = [
 'SwipeNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'swipeNoteData'];

angular.module("app.swipes").controller('SwipeNoteCtrl', swipeNoteCtrl);
