angular.module("app.promises").controller('PromiseNotesCtrl',
        ['PromiseNotesManager',
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
                 PromiseNotesManager,
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
          vm.promiseId = $stateParams.promiseId;
          vm.promiseNotesCopy;
          vm.promiseNotesManager = new PromiseNotesManager();
          vm.noteFormDisplay = false;

          vm.defaultPromiseNoteData = {
           promiseId: $stateParams.promiseId,
           privacy: 0
          }
          vm.newPromiseNoteData = angular.copy(vm.defaultPromiseNoteData);

          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };

          vm.createPromiseNote = function (data) {
           vm.promiseNotesManager.createPromiseNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newPromiseNoteData = angular.copy(vm.defaultPromiseNoteData);
            vm.promiseNotesCopy = angular.copy(vm.promiseNotesManager.promiseNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseNote = function (data) {
           vm.promiseNotesManager.editPromiseNote(data).then(function (response) {
            vm.noteFormDisplay = false;
            vm.newPromiseNoteData = angular.copy(vm.defaultPromiseNoteData);
            vm.promiseNotesCopy = angular.copy(vm.promiseNotesManager.promiseNotes);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseNoteSections = {
           details: function (promiseNoteId, detail) {
            var promiseNoteData = {
             promiseNoteId: promiseNoteId,
             title: detail.title,
             description: detail.description
            };
            vm.editPromiseNote(promiseNoteData);
           }
          }

          vm.cancelPromiseNote = function (form) {
           vm.noteFormDisplay = false;
           vm.newPromiseNoteData = angular.copy(vm.defaultPromiseNoteData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertPromiseNote = function (promiseNote, promiseNoteCopy) {
           promiseNote = promiseNoteCopy;
           /*
            $filter('filter')
            (vm.promiseNotesManager.promiseNotes, {id: promiseNoteId}, true)[0]
            = angular.copy($filter('filter')
            (vm.promiseNotesCopy, {id: promiseNoteId}, true)[0]);
            if (promiseNote.length && promiseNoteCopy.length) {
            // vm.promiseNotesManager.promiseNotes angular.copy(vm.promiseNotesCopy);
            }
            */
          };






          vm.editedNote = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.promiseNotes;
          }), function () {
           //vm.remainingCount = filterFilter(promiseNotes, {completed: false}).length;
           vm.doneCount = vm.promiseNotesManager.promiseNotes.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //PromiseNoteService.put(vm.promiseNotes);
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




          vm.editNote = function (promiseNote) {
           vm.editedNote = promiseNote;
           // Clone the original promiseNote to restore it on demand.
           vm.originalNote = angular.copy(promiseNote);
          };


          vm.doneEditing = function (promiseNote) {
           vm.editedNote = null;
           promiseNote.title = promiseNote.title.trim();

           if (!promiseNote.title) {
            vm.removeNote(promiseNote);
           }
          };

          vm.openPromiseNote = function (promiseNote) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'promise-note-modal.html',
            controller: 'PromiseNoteCtrl as promiseNoteCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             promiseNoteData: function () {
              return promiseNote;
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
          vm.promiseNotesManager.getPromiseNotes(vm.promiseId);
         }
        ])