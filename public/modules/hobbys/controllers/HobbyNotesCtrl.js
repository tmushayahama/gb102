angular.module("app.hobbys").controller('HobbyNotesCtrl',
        ['HobbyNotesManager',
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
                 HobbyNotesManager,
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
          vm.hobbyId = $stateParams.hobbyId;
          vm.hobbyNotesCopy;
          vm.hobbyNotesManager = new HobbyNotesManager();
          vm.noteFormDisplay = false;

          vm.defaultHobbyNoteData = {
           hobbyId: $stateParams.hobbyId,
           privacy: 0
          }
          vm.newHobbyNoteData = angular.copy(vm.defaultHobbyNoteData);

          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };

          vm.createHobbyNote = function (data) {
           vm.hobbyNotesManager.createHobbyNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newHobbyNoteData = angular.copy(vm.defaultHobbyNoteData);
            vm.hobbyNotesCopy = angular.copy(vm.hobbyNotesManager.hobbyNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyNote = function (data) {
           vm.hobbyNotesManager.editHobbyNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newHobbyNoteData = angular.copy(vm.defaultHobbyNoteData);
            vm.hobbyNotesCopy = angular.copy(vm.hobbyNotesManager.hobbyNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyNoteSections = {
           details: function (hobbyNoteId, detail) {
            var hobbyNoteData = {
             hobbyNoteId: hobbyNoteId,
             title: detail.title,
             description: detail.description
            };
            vm.editHobbyNote(hobbyNoteData);
           }
          }

          vm.cancelHobbyNote = function (form) {
           vm.noteFormDisplay = false;
           vm.newHobbyNoteData = angular.copy(vm.defaultHobbyNoteData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertHobbyNote = function (hobbyNote, hobbyNoteCopy) {
           hobbyNote = hobbyNoteCopy;
           /*
            $filter('filter')
            (vm.hobbyNotesManager.hobbyNotes, {id: hobbyNoteId}, true)[0]
            = angular.copy($filter('filter')
            (vm.hobbyNotesCopy, {id: hobbyNoteId}, true)[0]);
            if (hobbyNote.length && hobbyNoteCopy.length) {
            // vm.hobbyNotesManager.hobbyNotes angular.copy(vm.hobbyNotesCopy);
            }
            */
          };






          vm.editedNote = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.hobbyNotes;
          }), function () {
           //vm.remainingCount = filterFilter(hobbyNotes, {completed: false}).length;
           vm.doneCount = vm.hobbyNotesManager.hobbyNotes.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //HobbyNoteService.put(vm.hobbyNotes);
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




          vm.editNote = function (hobbyNote) {
           vm.editedNote = hobbyNote;
           // Clone the original hobbyNote to restore it on demand.
           vm.originalNote = angular.copy(hobbyNote);
          };


          vm.doneEditing = function (hobbyNote) {
           vm.editedNote = null;
           hobbyNote.title = hobbyNote.title.trim();

           if (!hobbyNote.title) {
            vm.removeNote(hobbyNote);
           }
          };

          vm.openHobbyNote = function (hobbyNote) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'hobby-note-modal.html',
            controller: 'HobbyNoteCtrl as hobbyNoteCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             hobbyNoteData: function () {
              return hobbyNote;
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
          vm.hobbyNotesManager.getHobbyNotes(vm.hobbyId);
         }
        ])