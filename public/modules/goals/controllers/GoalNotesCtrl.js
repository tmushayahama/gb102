angular.module("app.goals").controller('GoalNotesCtrl',
        ['GoalNotesManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         function (
                 GoalNotesManager,
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
          vm.goalId = $stateParams.goalId;
          vm.goalNotesCopy;
          vm.goalNotesManager = new GoalNotesManager();
          vm.noteFormDisplay = false;

          vm.defaultGoalNoteData = {
           goalId: $stateParams.goalId,
           privacy: 0
          }
          vm.newGoalNoteData = angular.copy(vm.defaultGoalNoteData);

          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };

          vm.createGoalNote = function (data) {
           vm.goalNotesManager.createGoalNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newGoalNoteData = angular.copy(vm.defaultGoalNoteData);
            vm.goalNotesCopy = angular.copy(vm.goalNotesManager.goalNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalNote = function (data) {
           vm.goalNotesManager.editGoalNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newGoalNoteData = angular.copy(vm.defaultGoalNoteData);
            vm.goalNotesCopy = angular.copy(vm.goalNotesManager.goalNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalNoteSections = {
           details: function (goalNoteId, detail) {
            var goalNoteData = {
             goalNoteId: goalNoteId,
             title: detail.title,
             description: detail.description
            };
            vm.editGoalNote(goalNoteData);
           }
          }

          vm.cancelGoalNote = function (form) {
           vm.noteFormDisplay = false;
           vm.newGoalNoteData = angular.copy(vm.defaultGoalNoteData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertGoalNote = function (goalNote, goalNoteCopy) {
           goalNote = goalNoteCopy;
           /*
            $filter('filter')
            (vm.goalNotesManager.goalNotes, {id: goalNoteId}, true)[0]
            = angular.copy($filter('filter')
            (vm.goalNotesCopy, {id: goalNoteId}, true)[0]);
            if (goalNote.length && goalNoteCopy.length) {
            // vm.goalNotesManager.goalNotes angular.copy(vm.goalNotesCopy);
            }
            */
          };






          vm.editedNote = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.goalNotes;
          }), function () {
           //vm.remainingCount = filterFilter(goalNotes, {completed: false}).length;
           vm.doneCount = vm.goalNotesManager.goalNotes.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //GoalNoteService.put(vm.goalNotes);
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




          vm.editNote = function (goalNote) {
           vm.editedNote = goalNote;
           // Clone the original goalNote to restore it on demand.
           vm.originalNote = angular.copy(goalNote);
          };


          vm.doneEditing = function (goalNote) {
           vm.editedNote = null;
           goalNote.title = goalNote.title.trim();

           if (!goalNote.title) {
            vm.removeNote(goalNote);
           }
          };

          vm.openGoalNote = function (goalNote) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'goal-note-modal.html',
            controller: 'GoalNoteCtrl as goalNoteCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             goalNoteData: function () {
              return goalNote;
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
          vm.goalNotesManager.getGoalNotes(vm.goalId);
         }
        ])