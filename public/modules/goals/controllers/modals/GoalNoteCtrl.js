angular.module("app.goals").controller('GoalNoteCtrl',
        ['GoalNoteManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'goalNoteData',
         function (
                 GoalNoteManager,
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
          vm.goalNoteManager = new GoalNoteManager();


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
           vm.goalNoteManager.getGoalNote(goalId, noteId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editGoalNote = function (data) {
           vm.goalNoteManager.editGoalNote(data).then(function (response) {
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
          }



          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };



          //--------init------
          vm.getGoalNote(vm.goalId, vm.noteId);
         }
        ])