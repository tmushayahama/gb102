angular.module("app.advices").controller('AdviceNotesCtrl',
        ['AdviceNotesManager',
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
                 AdviceNotesManager,
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
          vm.adviceId = $stateParams.adviceId;
          vm.adviceNotesCopy;
          vm.adviceNotesManager = new AdviceNotesManager();
          vm.noteFormDisplay = false;

          vm.defaultAdviceNoteData = {
           adviceId: $stateParams.adviceId,
           privacy: 0
          }
          vm.newAdviceNoteData = angular.copy(vm.defaultAdviceNoteData);

          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };

          vm.createAdviceNote = function (data) {
           vm.adviceNotesManager.createAdviceNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newAdviceNoteData = angular.copy(vm.defaultAdviceNoteData);
            vm.adviceNotesCopy = angular.copy(vm.adviceNotesManager.adviceNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceNote = function (data) {
           vm.adviceNotesManager.editAdviceNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newAdviceNoteData = angular.copy(vm.defaultAdviceNoteData);
            vm.adviceNotesCopy = angular.copy(vm.adviceNotesManager.adviceNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceNoteSections = {
           details: function (adviceNoteId, detail) {
            var adviceNoteData = {
             adviceNoteId: adviceNoteId,
             title: detail.title,
             description: detail.description
            };
            vm.editAdviceNote(adviceNoteData);
           }
          }

          vm.cancelAdviceNote = function (form) {
           vm.noteFormDisplay = false;
           vm.newAdviceNoteData = angular.copy(vm.defaultAdviceNoteData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertAdviceNote = function (adviceNote, adviceNoteCopy) {
           adviceNote = adviceNoteCopy;
           /*
            $filter('filter')
            (vm.adviceNotesManager.adviceNotes, {id: adviceNoteId}, true)[0]
            = angular.copy($filter('filter')
            (vm.adviceNotesCopy, {id: adviceNoteId}, true)[0]);
            if (adviceNote.length && adviceNoteCopy.length) {
            // vm.adviceNotesManager.adviceNotes angular.copy(vm.adviceNotesCopy);
            }
            */
          };






          vm.editedNote = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.adviceNotes;
          }), function () {
           //vm.remainingCount = filterFilter(adviceNotes, {completed: false}).length;
           vm.doneCount = vm.adviceNotesManager.adviceNotes.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //AdviceNoteService.put(vm.adviceNotes);
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




          vm.editNote = function (adviceNote) {
           vm.editedNote = adviceNote;
           // Clone the original adviceNote to restore it on demand.
           vm.originalNote = angular.copy(adviceNote);
          };


          vm.doneEditing = function (adviceNote) {
           vm.editedNote = null;
           adviceNote.title = adviceNote.title.trim();

           if (!adviceNote.title) {
            vm.removeNote(adviceNote);
           }
          };

          vm.openAdviceNote = function (adviceNote) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'advice-note-modal.html',
            controller: 'AdviceNoteCtrl as adviceNoteCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             adviceNoteData: function () {
              return adviceNote;
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
          vm.adviceNotesManager.getAdviceNotes(vm.adviceId);
         }
        ])