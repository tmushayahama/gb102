angular.module("app.skills").controller('SkillNotesCtrl',
        ['SkillNotesManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         function (
                 SkillNotesManager,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $uibModal,
                 $log) {

          var vm = this;
          vm.skillId = $stateParams.skillId;
          vm.skillNotesManager = new SkillNotesManager();
          vm.noteFormDisplay = false;

          vm.defaultSkillNoteData = {
           skillId: $stateParams.skillId,
           privacy: 0
          }
          vm.newSkillNoteData = angular.copy(vm.defaultSkillNoteData);

          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };

          vm.createSkillNote = function (data) {
           vm.skillNotesManager.createSkillNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newSkillNoteData = angular.copy(vm.defaultSkillNoteData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillNote = function (data) {
           vm.skillNotesManager.editSkillNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newSkillNoteData = angular.copy(vm.defaultSkillNoteData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillNoteSections = {
           title: function (skillNoteId, title) {
            var skillNoteData = {
             skillNoteId: skillNoteId,
             title: title
            };
            vm.editSkillNote(skillNoteData);
           }
          }

          vm.cancelSkillNote = function (form) {
           vm.noteFormDisplay = false;
           vm.newSkillNoteData = angular.copy(vm.defaultSkillNoteData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };






          vm.editedNote = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.skillNotes;
          }), function () {
           //vm.remainingCount = filterFilter(skillNotes, {completed: false}).length;
           vm.doneCount = vm.skillNotesManager.skillNotes.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //SkillNoteService.put(vm.skillNotes);
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




          vm.editNote = function (skillNote) {
           vm.editedNote = skillNote;
           // Clone the original skillNote to restore it on demand.
           vm.originalNote = angular.copy(skillNote);
          };


          vm.doneEditing = function (skillNote) {
           vm.editedNote = null;
           skillNote.title = skillNote.title.trim();

           if (!skillNote.title) {
            vm.removeNote(skillNote);
           }
          };

          vm.openSkillNote = function (skillNote) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'skill-note-modal.html',
            controller: 'SkillNoteCtrl as skillNoteCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             skillNoteData: function () {
              return skillNote;
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
          vm.skillNotesManager.getSkillNotes(vm.skillId);
         }
        ])