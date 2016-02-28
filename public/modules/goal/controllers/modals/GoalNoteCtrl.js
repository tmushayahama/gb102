var goalNoteCtrl = function (
        GoalNoteSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalNoteData) {
 var vm = this;
 vm.goalId = goalNoteData.goal_id;
 vm.goalNoteId = goalNoteData.id;
 vm.goalNoteSrv = new GoalNoteSrv();


 vm.noteId = goalNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGoalNoteData = vm.defaultGoalNoteData;

 vm.getGoalNote = function (goalId, noteId) {
  vm.goalNoteSrv.getGoalNote(goalId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGoalNote = function (data) {
  vm.goalNoteSrv.editGoalNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalNoteSections = {
  details: function (details) {
   var goalNoteData = {
    goalNoteId: vm.goalNoteId,
    title: details.title,
    description: details.description
   };
   vm.editGoalNote(goalNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getGoalNote(vm.goalId, vm.noteId);
};


goalNoteCtrl.$inject = [
 'GoalNoteSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalNoteData'];

angular.module("app.goal").controller('GoalNoteCtrl', goalNoteCtrl);
