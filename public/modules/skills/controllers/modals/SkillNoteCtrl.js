angular.module("app.skills").controller('SkillNoteCtrl',
        ['SkillNoteManager',
         'SkillNoteChecklistManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'skillNoteData',
         function (
                 SkillNoteManager,
                 SkillNoteChecklistManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 skillNoteData) {
          var vm = this;
          vm.skillId = skillNoteData.skill_id;
          vm.skillNoteId = skillNoteData.id;
          vm.skillNoteManager = new SkillNoteManager();
          vm.skillNoteChecklistManager = new SkillNoteChecklistManager();


          vm.noteId = skillNoteData.note_id;
          vm.checklistFormVisible = false;

          vm.noteFormDisplay = false;


          vm.defaultNoteChecklistData = {
           noteId: vm.noteId,
           privacy: 0
          }
          vm.newSkillNoteChecklistData = angular.copy(vm.defaultNoteChecklistData);


          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newSkillNoteData = vm.defaultSkillNoteData;

          vm.getSkillNote = function (skillId, noteId) {
           vm.skillNoteManager.getSkillNote(skillId, noteId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editSkillNote = function (data) {
           vm.skillNoteManager.editSkillNote(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillNoteSections = {
           details: function (details) {
            var skillNoteData = {
             skillNoteId: vm.skillNoteId,
             title: details.title,
             description: details.description
            };
            vm.editSkillNote(skillNoteData);
           }
          }

          vm.getSkillNoteChecklist = function (noteId) {
           vm.skillNoteChecklistManager.getSkillNoteChecklist(noteId).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };

          vm.createSkillNoteChecklistItem = function (data) {
           vm.skillNoteChecklistManager.createSkillNoteChecklistItem(data).then(function (response) {
            vm.checklistFormVisible = false;
            vm.newSkillNoteChecklistData = angular.copy(vm.defaultNoteChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillNoteChecklistItem = function (data) {
           vm.skillNoteChecklistManager.editSkillNoteChecklistItem(data).then(function (response) {
            vm.newSkillNoteChecklistData = angular.copy(vm.defaultNoteChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillNoteChecklistItemSections = {
           title: function (checklistId, title) {
            var skillNoteChecklistItemData = {
             checklistId: checklistId,
             title: title
            };
            vm.editSkillNoteChecklistItem(skillNoteChecklistItemData);
           }
          }



          vm.cancelChecklistForm = function (form) {
           vm.checklistFormVisible = false;
           vm.newSkillNoteChecklistData = angular.copy(vm.defaultNoteChecklistData);
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
           //$scope.user = angular.copy($scope.master);
          };

          $scope.$watch(angular.bind(this, function () {
           return vm.skillNoteChecklistManager.skillNoteChecklist;
          }), function () {
           //vm.remainingCount = filterFilter(noteChecklist, {completed: false}).length;
           vm.doneCount = vm.skillNoteChecklistManager.skillNoteChecklist.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //NoteChecklistService.put(vm.noteChecklist);
          }, true);

          //--------init------
          vm.getSkillNote(vm.skillId, vm.noteId);
          vm.getSkillNoteChecklist(vm.noteId);
         }
        ])