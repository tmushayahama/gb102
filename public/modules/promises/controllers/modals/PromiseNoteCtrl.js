angular.module("app.promises").controller('PromiseNoteCtrl',
        ['PromiseNoteManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'promiseNoteData',
         function (
                 PromiseNoteManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 promiseNoteData) {
          var vm = this;
          vm.promiseId = promiseNoteData.promise_id;
          vm.promiseNoteId = promiseNoteData.id;
          vm.promiseNoteManager = new PromiseNoteManager();


          vm.noteId = promiseNoteData.note_id;

          vm.noteFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newPromiseNoteData = vm.defaultPromiseNoteData;

          vm.getPromiseNote = function (promiseId, noteId) {
           vm.promiseNoteManager.getPromiseNote(promiseId, noteId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editPromiseNote = function (data) {
           vm.promiseNoteManager.editPromiseNote(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseNoteSections = {
           details: function (details) {
            var promiseNoteData = {
             promiseNoteId: vm.promiseNoteId,
             title: details.title,
             description: details.description
            };
            vm.editPromiseNote(promiseNoteData);
           }
          }



          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };



          //--------init------
          vm.getPromiseNote(vm.promiseId, vm.noteId);
         }
        ])